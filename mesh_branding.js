/**
 * Mesh Branding v4.0.8
 * Intercepta /loginlogo.png e /logo.png no backend e ajusta <title> da tela de login via middleware HTML.
 * Custom logos: meshcentral-data/plugins/mesh_branding.
 * Default logo: meshcentral-data/Aplicado_Logo.png.
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
    function rootFromName(name) {
        name = String(name || '').toLowerCase();
        if (name === 'data') return dataDir;
        return pluginDir;
    }
    function selectLogoFile(req) {
        var cfg = readConfig();
        var customRoot = rootFromName(cfg.customLogoBaseDir || 'plugin');
        var defaultRoot = rootFromName(cfg.defaultLogoBaseDir || 'data');
        var host = getHost(req);
        var brand = brandForHost(cfg, host);
        if (brand && brand.logoFile) {
            var customFile = safeJoin(customRoot, brand.logoFile);
            if (customFile && fs.existsSync(customFile) && fs.statSync(customFile).isFile()) return { file: customFile, host: host, selected: brand.logoFile, root: customRoot, mode: 'custom' };
        }
        if (cfg.defaultLogoFile) {
            var defaultFile = safeJoin(defaultRoot, cfg.defaultLogoFile);
            if (defaultFile && fs.existsSync(defaultFile) && fs.statSync(defaultFile).isFile()) return { file: defaultFile, host: host, selected: cfg.defaultLogoFile, root: defaultRoot, mode: 'default' };
        }
        return { file: null, host: host, selected: null, root: customRoot + ' | ' + defaultRoot, mode: 'missing' };
    }
    function titleForReq(req) {
        var cfg = readConfig();
        var host = getHost(req);
        var brand = brandForHost(cfg, host);
        return (brand && brand.documentTitle) || null;
    }
    function sendLogo(req, res) {
        var selected = selectLogoFile(req);
        if (!selected.file) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Mesh-Branding-Root': selected.root || '', 'X-Mesh-Branding-Mode': selected.mode || '' });
            res.end('Mesh Branding: no logo found');
            return;
        }
        res.writeHead(200, {
            'Content-Type': getMime(selected.file),
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'X-Mesh-Branding-Host': selected.host || '',
            'X-Mesh-Branding-File': selected.selected || '',
            'X-Mesh-Branding-Root': selected.root || '',
            'X-Mesh-Branding-Mode': selected.mode || ''
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
    function shouldPatchHtml(req) {
        if (!req || String(req.method || 'GET').toUpperCase() !== 'GET') return false;
        var u = String(req.url || '/');
        var pathOnly = u.split('?')[0].toLowerCase();
        if (pathOnly.match(/\.(png|jpg|jpeg|gif|webp|ico|css|js|map|svg|woff|woff2|ttf|eot|ashx)$/)) return false;
        var accept = String((req.headers && req.headers.accept) || '').toLowerCase();
        return (accept.indexOf('text/html') >= 0 || accept.indexOf('*/*') >= 0 || pathOnly === '/' || pathOnly === '/login');
    }
    function patchTitleHtml(html, title) {
        if (!title) return html;
        var safeTitle = String(title).replace(/[&<>]/g, function(c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]; });
        if (/<title>[\s\S]*?<\/title>/i.test(html)) return html.replace(/<title>[\s\S]*?<\/title>/i, '<title>' + safeTitle + '</title>');
        if (/<head[^>]*>/i.test(html)) return html.replace(/<head[^>]*>/i, function(m) { return m + '<title>' + safeTitle + '</title>'; });
        return html;
    }
    function htmlTitleMiddleware(req, res, next) {
        if (!shouldPatchHtml(req)) { return next(); }
        var title = titleForReq(req);
        if (!title) { return next(); }
        var chunks = [];
        var oldWrite = res.write;
        var oldEnd = res.end;
        var oldWriteHead = res.writeHead;
        var statusCode = 200;
        var headersObj = null;
        res.writeHead = function(code, headers) {
            statusCode = code || statusCode;
            headersObj = headers || headersObj;
            return res;
        };
        res.write = function(chunk, encoding, cb) {
            if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
            if (typeof cb === 'function') cb();
            return true;
        };
        res.end = function(chunk, encoding, cb) {
            if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
            var body = Buffer.concat(chunks).toString('utf8');
            if (body.indexOf('<html') >= 0 || body.indexOf('<title') >= 0 || body.indexOf('<head') >= 0) {
                body = patchTitleHtml(body, title);
                try { res.setHeader('Content-Length', Buffer.byteLength(body)); } catch(e) {}
                try { res.setHeader('X-Mesh-Branding-Title', title); } catch(e) {}
            }
            if (oldWriteHead && !res.headersSent) {
                try { oldWriteHead.call(res, statusCode, headersObj || undefined); } catch(e) {}
            }
            return oldEnd.call(res, body, 'utf8', cb);
        };
        next();
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
        if (a.__mesh_branding_v408_registered) return;
        a.__mesh_branding_v408_registered = true;

        // Middleware de titulo HTML deve ficar na frente para atuar antes das rotas nativas.
        a.use(htmlTitleMiddleware);
        moveLastLayerToFront(a);

        // Rota diagnostica e de uso geral.
        a.use(route, brandingHandler);

        // Interceptacao das rotas nativas usadas pelo MeshCentral.
        a.use('/loginlogo.png', logoHandler);
        moveLastLayerToFront(a);
        a.use('/logo.png', logoHandler);
        var front = moveLastLayerToFront(a);

        log('registered route ' + route + ' -> custom:' + pluginDir + ', default:' + dataDir);
        log('intercepted /loginlogo.png and /logo.png -> custom:' + pluginDir + ', default:' + dataDir + (front ? ' (front)' : ''));
        log('registered HTML title middleware for login/public pages');
    };

    obj.server_startup = function() { log('loaded, pluginDir=' + pluginDir + ', dataDir=' + dataDir); };
    obj.onWebUIStartupEnd = function() {
    (function() {
        'use strict';
        var CONFIG = {"defaultLogoFile": "Aplicado_Logo.png", "customLogoBaseDir": "plugin", "defaultLogoBaseDir": "data", "route": "/mesh_branding", "logoEndpoint": "/mesh_branding/logo.png", "intercept": {"enabled": true, "paths": ["/loginlogo.png", "/logo.png"]}, "options": {"applyDocumentTitle": true, "replaceBrandingImagesAfterLogin": false, "replaceMainMeshImage": false, "replaceBackgrounds": false, "preserveInternalTitles": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo.png"}, "mesh.fastcopy.net.br": {"documentTitle": "Acesso Remoto - FastCopy", "logoFile": "FastCopy_Logo.png"}, "mesh.crsbrands.com.br": {"documentTitle": "Acesso Remoto - CRS Brands", "logoFile": "CRSBrands_Logo.png"}, "mesh.mhs.tec.br": {"documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo.png"}}};
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
        var CONFIG = {"defaultLogoFile": "Aplicado_Logo.png", "customLogoBaseDir": "plugin", "defaultLogoBaseDir": "data", "route": "/mesh_branding", "logoEndpoint": "/mesh_branding/logo.png", "intercept": {"enabled": true, "paths": ["/loginlogo.png", "/logo.png"]}, "options": {"applyDocumentTitle": true, "replaceBrandingImagesAfterLogin": false, "replaceMainMeshImage": false, "replaceBackgrounds": false, "preserveInternalTitles": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo.png"}, "mesh.fastcopy.net.br": {"documentTitle": "Acesso Remoto - FastCopy", "logoFile": "FastCopy_Logo.png"}, "mesh.crsbrands.com.br": {"documentTitle": "Acesso Remoto - CRS Brands", "logoFile": "CRSBrands_Logo.png"}, "mesh.mhs.tec.br": {"documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo.png"}}};
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
