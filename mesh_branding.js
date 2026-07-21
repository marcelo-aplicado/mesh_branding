/**
 * MeshCentral Mesh Branding v4.0.4
 * Intercepta /loginlogo.png no backend, antes da rota nativa quando possível.
 * Usa arquivos em meshcentral-data: custom por host e fallback Aplicado_Logo.png.
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
    function selectLogoFile(req) {
        var cfg = readConfig();
        var host = getHost(req);
        var brand = brandForHost(cfg, host);
        var candidates = [];
        if (brand && brand.logoFile) candidates.push(brand.logoFile);
        if (cfg.defaultLogoFile) candidates.push(cfg.defaultLogoFile);
        for (var i = 0; i < candidates.length; i++) {
            var full = safeJoin(dataDir, candidates[i]);
            if (full && fs.existsSync(full) && fs.statSync(full).isFile()) return { file: full, host: host, selected: candidates[i] };
        }
        return { file: null, host: host, selected: null };
    }
    function sendLogo(req, res) {
        var selected = selectLogoFile(req);
        if (!selected.file) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Mesh Branding: no logo found'); return; }
        res.writeHead(200, {
            'Content-Type': getMime(selected.file),
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'X-Mesh-Branding-Host': selected.host || '',
            'X-Mesh-Branding-File': selected.selected || ''
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

    function loginLogoHandler(req, res) {
        sendLogo(req, res);
    }

    obj.hook_setupHttpHandlers = function() {
        var a = getApp();
        if (!a) { log('Express app not found'); return; }
        if (a.__mesh_branding_v404_registered) return;
        a.__mesh_branding_v404_registered = true;

        // Rota diagnóstica e de uso geral.
        a.use(route, brandingHandler);

        // Interceptação direta da rota nativa usada na tela de login do MeshCentral.
        a.use('/loginlogo.png', loginLogoHandler);
        var front = moveLastLayerToFront(a);

        log('registered route ' + route + ' -> ' + dataDir + '/<logoFile>');
        log('intercepted /loginlogo.png -> ' + dataDir + '/<logoFile>' + (front ? ' (front)' : ''));
    };

    obj.server_startup = function() { log('loaded, dataDir=' + dataDir); };
    obj.onWebUIStartupEnd = function() {
    (function() {
        'use strict';
        var CONFIG = {"defaultLogoFile": "Aplicado_Logo.png", "route": "/mesh_branding", "logoEndpoint": "/mesh_branding/logo.png", "intercept": {"enabled": true, "paths": ["/loginlogo.png"]}, "options": {"applyDocumentTitle": true, "replaceBrandingImagesAfterLogin": false, "replaceMainMeshImage": false, "replaceBackgrounds": false, "preserveInternalTitles": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo_Custom.png"}, "mesh.fastcopy.net.br": {"documentTitle": "Acesso Remoto - FastCopy", "logoFile": "FastCopy_Logo_Custom.png"}, "mesh.crsbrands.com.br": {"documentTitle": "Acesso Remoto - CRS Brands", "logoFile": "CRSBrands_Logo_Custom.png"}, "mesh.mhs.tec.br": {"documentTitle": "Acesso Remoto - MHS TEC", "logoFile": "MHS_Logo_Custom.png"}}};
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
        var CONFIG = {"defaultLogoFile": "Aplicado_Logo.png", "route": "/mesh_branding", "logoEndpoint": "/mesh_branding/logo.png", "intercept": {"enabled": true, "paths": ["/loginlogo.png"]}, "options": {"applyDocumentTitle": true, "replaceBrandingImagesAfterLogin": false, "replaceMainMeshImage": false, "replaceBackgrounds": false, "preserveInternalTitles": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo_Custom.png"}, "mesh.fastcopy.net.br": {"documentTitle": "Acesso Remoto - FastCopy", "logoFile": "FastCopy_Logo_Custom.png"}, "mesh.crsbrands.com.br": {"documentTitle": "Acesso Remoto - CRS Brands", "logoFile": "CRSBrands_Logo_Custom.png"}, "mesh.mhs.tec.br": {"documentTitle": "Acesso Remoto - MHS TEC", "logoFile": "MHS_Logo_Custom.png"}}};
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
