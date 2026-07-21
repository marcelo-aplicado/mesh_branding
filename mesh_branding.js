/**
 * MeshCentral Mesh Branding v4.0.6
 * Intercepta /loginlogo.png e /logo.png no backend, antes das rotas nativas quando possível.
 * Usa arquivos dentro da pasta do plugin: meshcentral-data/plugins/mesh_branding.
 * Fallback: Aplicado_Logo.png também dentro da pasta do plugin.
 * Não altera MainMeshImage/Meu Servidor, background ou cores.
 */
module.exports.mesh_branding = function(parent) {

    var fs = require('fs');
    var path = require('path');
    var obj = {};
    obj.parent = parent;
    obj.meshServer = parent.parent;
    obj.debug = obj.meshServer && obj.meshServer.debug;

    function log(m) {
        try { obj.debug('PLUGIN', 'Mesh Branding', m); } catch (e) {}
        try { console.log('PLUGIN: Mesh Branding: ' + m); } catch (e) {}
    }

    var pluginDir = __dirname;
    var dataDir = path.resolve(__dirname, '..', '..');
    var localConfigPath = path.join(__dirname, 'brand-config.json');

    function readConfig() {
        try { return JSON.parse(fs.readFileSync(localConfigPath, 'utf8')); } catch (e) { return {}; }
    }
    function normalizeHost(host) { return String(host || '').trim().toLowerCase().split(':')[0]; }
    function getHost(req) {
        return normalizeHost((req && req.headers && (req.headers['x-forwarded-host'] || req.headers.host)) || '');
    }
    function getMime(file) {
        var ext = path.extname(file).toLowerCase();
        if (ext === '.png') return 'image/png';
        if (ext === '.svg') return 'image/svg+xml; charset=utf-8';
        if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
        if (ext === '.webp') return 'image/webp';
        if (ext === '.ico') return 'image/x-icon';
        return 'application/octet-stream';
    }
    function safeJoin(base, rel) {
        rel = String(rel || '').replace(/\\/g, '/').replace(/^\/+/, '');
        var full = path.resolve(base, rel);
        if (full.indexOf(path.resolve(base)) !== 0) return null;
        return full;
    }
    function brandForHost(cfg, host) {
        var domains = cfg.domains || {};
        host = normalizeHost(host);
        return domains[host] || domains[host.replace(/^www\./, '')] || null;
    }
    function logoRootForConfig(cfg) {
        // v4.0.6 default: file lookup is inside the plugin folder itself.
        // Supported values:
        // - plugin: meshcentral-data/plugins/mesh_branding
        // - data: meshcentral-data
        if (cfg && String(cfg.logoBaseDir || '').toLowerCase() === 'data') return dataDir;
        return pluginDir;
    }
    function selectLogoFile(req) {
        var cfg = readConfig();
        var logoRoot = logoRootForConfig(cfg);
        var host = getHost(req);
        var brand = brandForHost(cfg, host);
        var candidates = [];
        if (brand && brand.logoFile) candidates.push(brand.logoFile);
        if (cfg.defaultLogoFile) candidates.push(cfg.defaultLogoFile);
        for (var i = 0; i < candidates.length; i++) {
            var full = safeJoin(logoRoot, candidates[i]);
            if (full && fs.existsSync(full) && fs.statSync(full).isFile()) return { file: full, host: host, selected: candidates[i], root: logoRoot };
        }
        return { file: null, host: host, selected: null, root: logoRoot };
    }
    function sendLogo(req, res) {
        var selected = selectLogoFile(req);
        if (!selected.file) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Mesh-Branding-Root': selected.root || '' }); res.end('Mesh Branding: no logo found'); return; }
        res.writeHead(200, {
            'Content-Type': getMime(selected.file),
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'X-Mesh-Branding-Host': selected.host || '',
            'X-Mesh-Branding-File': selected.selected || '',
            'X-Mesh-Branding-Root': selected.root || ''
        });
        fs.createReadStream(selected.file).pipe(res);
    }
    function getApp() {
        var c = [
            obj.meshServer && obj.meshServer.webserver && obj.meshServer.webserver.app,
            obj.meshServer && obj.meshServer.app,
            parent && parent.app,
            parent && parent.webserver && parent.webserver.app
        ];
        for (var i = 0; i < c.length; i++) if (c[i] && typeof c[i].use === 'function') return c[i];
        return null;
    }
    function moveLastLayerToFront(app) {
        try {
            var stack = app && app._router && app._router.stack;
            if (Array.isArray(stack) && stack.length > 1) {
                var layer = stack.pop();
                stack.unshift(layer);
                return true;
            }
        } catch (e) {}
        return false;
    }

    obj.exports = [ 'onWebUIStartupEnd', 'goPageEnd' ];
    var cfg = readConfig();
    var route = cfg.route || '/mesh_branding';

    function brandingHandler(req, res) {
        var u = req.url || '/';
        var q = u.indexOf('?');
        if (q >= 0) u = u.substring(0, q);
        if (u === '/' || u === '/logo' || u === '/logo.png') { sendLogo(req, res); return; }
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Mesh Branding route not found');
    }

    function logoHandler(req, res) { sendLogo(req, res); }

    obj.hook_setupHttpHandlers = function() {
        var a = getApp();
        if (!a) { log('Express app not found'); return; }
        if (a.__mesh_branding_v406_registered) return;
        a.__mesh_branding_v406_registered = true;

        a.use(route, brandingHandler);
        a.use('/loginlogo.png', logoHandler);
        moveLastLayerToFront(a);
        a.use('/logo.png', logoHandler);
        var front = moveLastLayerToFront(a);

        log('registered route ' + route + ' -> ' + pluginDir + '/<logoFile>');
        log('intercepted /loginlogo.png and /logo.png -> ' + pluginDir + '/<logoFile>' + (front ? ' (front)' : ''));
    };

    obj.server_startup = function() { log('loaded, pluginDir=' + pluginDir + ', dataDir=' + dataDir); };
    obj.onWebUIStartupEnd = function() {
    (function() {
        'use strict';
        var CONFIG = {"defaultLogoFile": "Aplicado_Logo.png", "logoBaseDir": "plugin", "route": "/mesh_branding", "logoEndpoint": "/mesh_branding/logo.png", "intercept": {"enabled": true, "paths": ["/loginlogo.png", "/logo.png"]}, "options": {"applyDocumentTitle": true, "replaceBrandingImagesAfterLogin": false, "replaceMainMeshImage": false, "replaceBackgrounds": false, "preserveInternalTitles": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo_Custom.png"}, "mesh.fastcopy.net.br": {"documentTitle": "Acesso Remoto - FastCopy", "logoFile": "FastCopy_Logo_Custom.png"}, "mesh.crsbrands.com.br": {"documentTitle": "Acesso Remoto - CRS Brands", "logoFile": "CRSBrands_Logo_Custom.png"}, "mesh.mhs.tec.br": {"documentTitle": "Acesso Remoto - MHS TEC", "logoFile": "MHS_Logo_Custom.png"}}};
        function normalizeHost(host) { return String(host || '').trim().toLowerCase().split(':')[0]; }
        function resolveBrand() {
            var host = normalizeHost(window.location.hostname);
            var domains = CONFIG.domains || {};
            var brand = domains[host] || domains[host.replace(/^www\./, '')] || {};
            return { host: host, brand: brand };
        }
        function removeInjectedMastheadLogo() {
            var old = document.getElementById('meshbranding-masthead-logo');
            if (old && old.parentNode) old.parentNode.removeChild(old);
        }
        function apply() {
            var r = resolveBrand();
            window.__meshBrandingResolved = r;
            if ((CONFIG.options || {}).applyDocumentTitle !== false && r.brand.documentTitle) document.title = r.brand.documentTitle;
            removeInjectedMastheadLogo();
            // Intencionalmente nao altera MainMeshImage, fundo, cores ou textos internos.
        }
        window.meshBrandingApply = apply;
        apply();
    })();
};
    obj.goPageEnd = function() {
    (function() {
        'use strict';
        var CONFIG = {"defaultLogoFile": "Aplicado_Logo.png", "logoBaseDir": "plugin", "route": "/mesh_branding", "logoEndpoint": "/mesh_branding/logo.png", "intercept": {"enabled": true, "paths": ["/loginlogo.png", "/logo.png"]}, "options": {"applyDocumentTitle": true, "replaceBrandingImagesAfterLogin": false, "replaceMainMeshImage": false, "replaceBackgrounds": false, "preserveInternalTitles": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo_Custom.png"}, "mesh.fastcopy.net.br": {"documentTitle": "Acesso Remoto - FastCopy", "logoFile": "FastCopy_Logo_Custom.png"}, "mesh.crsbrands.com.br": {"documentTitle": "Acesso Remoto - CRS Brands", "logoFile": "CRSBrands_Logo_Custom.png"}, "mesh.mhs.tec.br": {"documentTitle": "Acesso Remoto - MHS TEC", "logoFile": "MHS_Logo_Custom.png"}}};
        function normalizeHost(host) { return String(host || '').trim().toLowerCase().split(':')[0]; }
        function resolveBrand() {
            var host = normalizeHost(window.location.hostname);
            var domains = CONFIG.domains || {};
            var brand = domains[host] || domains[host.replace(/^www\./, '')] || {};
            return { host: host, brand: brand };
        }
        function removeInjectedMastheadLogo() {
            var old = document.getElementById('meshbranding-masthead-logo');
            if (old && old.parentNode) old.parentNode.removeChild(old);
        }
        function apply() {
            var r = resolveBrand();
            window.__meshBrandingResolved = r;
            if ((CONFIG.options || {}).applyDocumentTitle !== false && r.brand.documentTitle) document.title = r.brand.documentTitle;
            removeInjectedMastheadLogo();
            // Intencionalmente nao altera MainMeshImage, fundo, cores ou textos internos.
        }
        window.meshBrandingApply = apply;
        apply();
    })();
};
    return obj;
};
