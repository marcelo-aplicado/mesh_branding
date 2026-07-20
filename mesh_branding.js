/**
 * MeshCentral Mesh Branding v3.0.1
 * Usa /meshcentral-data/mesh_branding/<logoFile> como origem do logo.
 * Se o arquivo não existir, preserva o logo padrão do MeshCentral.
 */
module.exports.mesh_branding = function(parent) {
    var obj = {};
    obj.parent = parent;
    obj.exports = [ 'onWebUIStartupEnd', 'goPageEnd' ];

    var fs = require('fs');
    var path = require('path');
    var dataDir = path.resolve(__dirname, '..', '..');
    var localConfigPath = path.join(__dirname, 'brand-config.json');
    var localConfig = null;
    try { localConfig = JSON.parse(fs.readFileSync(localConfigPath, 'utf8')); } catch (e) { localConfig = null; }
    function normalizeHost(host) { return String(host || '').trim().toLowerCase().split(':')[0]; }
    function getMime(file) {
        var ext = path.extname(file).toLowerCase();
        if (ext === '.svg') return 'image/svg+xml; charset=utf-8';
        if (ext === '.png') return 'image/png';
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
    function resolveBrandFromReq(req) {
        var cfg = localConfig || {};
        var domains = cfg.domains || {};
        var host = normalizeHost((req.query && req.query.host) || (req.headers && req.headers.host) || '');
        var brand = domains[host];
        if (!brand) { var clean = host.replace(/^www\./, ''); brand = domains[clean]; host = clean; }
        if (!brand && cfg.defaultBrand) { host = cfg.defaultBrand; brand = domains[cfg.defaultBrand]; }
        return { host: host, brand: brand || {} };
    }
    function logoFileFor(req) {
        var cfg = localConfig || {};
        var baseDir = ((cfg.paths || {}).baseDir || 'mesh_branding');
        var resolved = resolveBrandFromReq(req);
        var lf = resolved.brand.logoFile;
        if (!lf) return null;
        return safeJoin(dataDir, path.join(baseDir, lf));
    }
    function sendLogo(req, res) {
        var file = logoFileFor(req);
        if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.statusCode = 404; res.end('Logo not found'); return; }
        res.setHeader('Content-Type', getMime(file));
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        fs.createReadStream(file).pipe(res);
    }
    function findApp(root) {
        var seen = [];
        var queue = [root];
        var depth = 0;
        while (queue.length && depth < 200) {
            var x = queue.shift(); depth++;
            if (!x || typeof x !== 'object') continue;
            if (seen.indexOf(x) >= 0) continue;
            seen.push(x);
            if (typeof x.get === 'function' && typeof x.use === 'function') return x;
            var keys = Object.keys(x).slice(0, 50);
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                if (k === 'parent' || k === 'webserver' || k === 'app' || k === 'expressApp' || k === 'server') {
                    try { queue.push(x[k]); } catch(e) {}
                }
            }
        }
        return null;
    }

    function registerRoutes() {
        var app = findApp(parent);
        if (!app || app.__mesh_branding_routes_registered) return false;
        app.__mesh_branding_routes_registered = true;
        app.get('/mesh_branding/logo', function(req, res) { sendLogo(req, res); });
        console.log('PLUGIN: Mesh Branding: registered /mesh_branding/logo, dataDir=' + dataDir);
        return true;
    }
    obj.server_startup = function() { registerRoutes(); setTimeout(registerRoutes, 1000); setTimeout(registerRoutes, 5000); };
    obj.hook_setupHttpHandlers = function() { registerRoutes(); };
    obj.onWebUIStartupEnd = function() {
    (function() {
        'use strict';
        var CONFIG = {"defaultBrand": "mesh.aplicado.com.br", "options": {"applyDocumentTitle": true, "replaceBrandingImages": true, "applyMastheadLogo": true, "preserveBackgrounds": true, "preserveInternalTitles": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"brandKey": "aplicado", "documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo.png"}, "mesh.fastcopy.net.br": {"brandKey": "fastcopy", "documentTitle": "Acesso Remoto - FastCopy", "logoFile": "FastCopy_Logo.png"}, "mesh.crsbrands.com.br": {"brandKey": "crsbrands", "documentTitle": "Acesso Remoto - CRS Brands", "logoFile": "CRSBrands_Logo.png"}, "mesh.mhs.tec.br": {"brandKey": "mhs", "documentTitle": "Acesso Remoto - MHS TEC", "logoFile": "MHS_Logo.png"}}, "paths": {"baseDir": "mesh_branding"}};
        var state = window.__meshBrandingState || { logoStatus: null, logoUrl: null, pending: false };
        window.__meshBrandingState = state;
        function normalizeHost(host) { return String(host || '').trim().toLowerCase().split(':')[0]; }
        function resolveBrand() {
            var host = normalizeHost(window.location.hostname);
            var domains = CONFIG.domains || {};
            var brand = domains[host];
            var resolvedHost = host;
            if (!brand) { var clean = host.replace(/^www\./, ''); brand = domains[clean]; resolvedHost = clean; }
            if (!brand && CONFIG.defaultBrand) { resolvedHost = CONFIG.defaultBrand; brand = domains[CONFIG.defaultBrand]; }
            return { host: resolvedHost, brand: brand || {} };
        }
        function logoRoute() {
            var r = resolveBrand();
            return '/mesh_branding/logo?host=' + encodeURIComponent(r.host) + '&v=' + encodeURIComponent(Date.now());
        }
        function testLogoOnce(callback) {
            if (state.logoStatus === 'ok') { callback(state.logoUrl); return; }
            if (state.logoStatus === 'missing') { return; }
            if (state.pending) return;
            state.pending = true;
            var url = logoRoute();
            var img = new Image();
            img.onload = function() {
                state.pending = false;
                if (img.width > 0 || img.height > 0) {
                    state.logoStatus = 'ok';
                    state.logoUrl = url;
                    callback(url);
                } else {
                    state.logoStatus = 'missing';
                }
            };
            img.onerror = function() {
                state.pending = false;
                state.logoStatus = 'missing';
            };
            img.src = url;
        }
        function isIgnorable(text) {
            return text.indexOf('icon-') >= 0 || text.indexOf('x16') >= 0 || text.indexOf('plugin24') >= 0 || text.indexOf('link4') >= 0 || text.indexOf('link6') >= 0 || text.indexOf('userimage.ashx') >= 0 || text.indexOf('user-256') >= 0 || text.indexOf('group-256') >= 0 || text.indexOf('mesh-256') >= 0 || text.indexOf('details/') >= 0;
        }
        function looksLikeBrandingImage(img) {
            if (!img || img.id === 'meshbranding-masthead-logo') return false;
            var id = String(img.id || '').toLowerCase();
            var cls = String(img.className || '').toLowerCase();
            var alt = String(img.alt || '').toLowerCase();
            var srcAttr = String(img.getAttribute('src') || '').toLowerCase();
            var src = String(img.src || '').toLowerCase();
            var text = id + ' ' + cls + ' ' + alt + ' ' + srcAttr + ' ' + src;
            if (img.getAttribute('data-meshbranding-preserve') === '1') return false;
            if (isIgnorable(text)) return false;
            if (text.indexOf('serverpic.ashx') >= 0) return true;
            if (text.indexOf('loginpic.ashx') >= 0) return true;
            if (text.indexOf('titlepic.ashx') >= 0) return true;
            if (text.indexOf('mainmeshimage') >= 0) return true;
            if (text.indexOf('loginlogo') >= 0 || text.indexOf('login-logo') >= 0) return true;
            if (text.indexOf('titlelogo') >= 0 || text.indexOf('title-logo') >= 0) return true;
            if (text.indexOf('/logo') >= 0 || text.indexOf('logo.') >= 0 || text.indexOf('-logo') >= 0 || text.indexOf('_logo') >= 0) return true;
            return false;
        }
        function replaceImages(url) {
            var imgs = document.querySelectorAll('img');
            for (var i = 0; i < imgs.length; i++) {
                var img = imgs[i];
                if (!looksLikeBrandingImage(img)) continue;
                if (!img.getAttribute('data-meshbranding-original-src')) img.setAttribute('data-meshbranding-original-src', img.getAttribute('src') || '');
                img.src = url;
                img.setAttribute('data-meshbranding-replaced', '1');
            }
        }
        function addMastheadLogo(url) {
            var masthead = document.getElementById('masthead');
            if (!masthead) return;
            var logo = document.getElementById('meshbranding-masthead-logo');
            if (!logo) {
                logo = document.createElement('img');
                logo.id = 'meshbranding-masthead-logo';
                logo.style.position = 'absolute';
                logo.style.left = '10px';
                logo.style.top = '4px';
                logo.style.height = '54px';
                logo.style.width = 'auto';
                logo.style.maxWidth = '240px';
                logo.style.zIndex = '99999';
                logo.style.objectFit = 'contain';
                logo.style.pointerEvents = 'none';
                masthead.style.position = masthead.style.position || 'relative';
                masthead.insertBefore(logo, masthead.firstChild);
            }
            logo.src = url;
        }
        function apply() {
            var r = resolveBrand();
            window.__meshBrandingResolved = r;
            if ((CONFIG.options || {}).applyDocumentTitle !== false && r.brand.documentTitle) document.title = r.brand.documentTitle;
            testLogoOnce(function(url) {
                if ((CONFIG.options || {}).replaceBrandingImages !== false) replaceImages(url);
                if ((CONFIG.options || {}).applyMastheadLogo !== false) addMastheadLogo(url);
            });
            // Não altera backgrounds, cores ou textos internos.
        }
        window.meshBrandingApply = apply;
        apply();
        if (!window.__meshBrandingObserverStarted) {
            window.__meshBrandingObserverStarted = true;
            var pending = false;
            var observer = new MutationObserver(function() {
                if (pending || state.logoStatus === 'missing') return;
                pending = true;
                setTimeout(function() { pending = false; apply(); }, 250);
            });
            observer.observe(document.documentElement, { childList: true, subtree: true });
        }
    })();
};
    obj.goPageEnd = function() {
    (function() {
        'use strict';
        var CONFIG = {"defaultBrand": "mesh.aplicado.com.br", "options": {"applyDocumentTitle": true, "replaceBrandingImages": true, "applyMastheadLogo": true, "preserveBackgrounds": true, "preserveInternalTitles": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"brandKey": "aplicado", "documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo.png"}, "mesh.fastcopy.net.br": {"brandKey": "fastcopy", "documentTitle": "Acesso Remoto - FastCopy", "logoFile": "FastCopy_Logo.png"}, "mesh.crsbrands.com.br": {"brandKey": "crsbrands", "documentTitle": "Acesso Remoto - CRS Brands", "logoFile": "CRSBrands_Logo.png"}, "mesh.mhs.tec.br": {"brandKey": "mhs", "documentTitle": "Acesso Remoto - MHS TEC", "logoFile": "MHS_Logo.png"}}, "paths": {"baseDir": "mesh_branding"}};
        var state = window.__meshBrandingState || { logoStatus: null, logoUrl: null, pending: false };
        window.__meshBrandingState = state;
        function normalizeHost(host) { return String(host || '').trim().toLowerCase().split(':')[0]; }
        function resolveBrand() {
            var host = normalizeHost(window.location.hostname);
            var domains = CONFIG.domains || {};
            var brand = domains[host];
            var resolvedHost = host;
            if (!brand) { var clean = host.replace(/^www\./, ''); brand = domains[clean]; resolvedHost = clean; }
            if (!brand && CONFIG.defaultBrand) { resolvedHost = CONFIG.defaultBrand; brand = domains[CONFIG.defaultBrand]; }
            return { host: resolvedHost, brand: brand || {} };
        }
        function logoRoute() {
            var r = resolveBrand();
            return '/mesh_branding/logo?host=' + encodeURIComponent(r.host) + '&v=' + encodeURIComponent(Date.now());
        }
        function testLogoOnce(callback) {
            if (state.logoStatus === 'ok') { callback(state.logoUrl); return; }
            if (state.logoStatus === 'missing') { return; }
            if (state.pending) return;
            state.pending = true;
            var url = logoRoute();
            var img = new Image();
            img.onload = function() {
                state.pending = false;
                if (img.width > 0 || img.height > 0) {
                    state.logoStatus = 'ok';
                    state.logoUrl = url;
                    callback(url);
                } else {
                    state.logoStatus = 'missing';
                }
            };
            img.onerror = function() {
                state.pending = false;
                state.logoStatus = 'missing';
            };
            img.src = url;
        }
        function isIgnorable(text) {
            return text.indexOf('icon-') >= 0 || text.indexOf('x16') >= 0 || text.indexOf('plugin24') >= 0 || text.indexOf('link4') >= 0 || text.indexOf('link6') >= 0 || text.indexOf('userimage.ashx') >= 0 || text.indexOf('user-256') >= 0 || text.indexOf('group-256') >= 0 || text.indexOf('mesh-256') >= 0 || text.indexOf('details/') >= 0;
        }
        function looksLikeBrandingImage(img) {
            if (!img || img.id === 'meshbranding-masthead-logo') return false;
            var id = String(img.id || '').toLowerCase();
            var cls = String(img.className || '').toLowerCase();
            var alt = String(img.alt || '').toLowerCase();
            var srcAttr = String(img.getAttribute('src') || '').toLowerCase();
            var src = String(img.src || '').toLowerCase();
            var text = id + ' ' + cls + ' ' + alt + ' ' + srcAttr + ' ' + src;
            if (img.getAttribute('data-meshbranding-preserve') === '1') return false;
            if (isIgnorable(text)) return false;
            if (text.indexOf('serverpic.ashx') >= 0) return true;
            if (text.indexOf('loginpic.ashx') >= 0) return true;
            if (text.indexOf('titlepic.ashx') >= 0) return true;
            if (text.indexOf('mainmeshimage') >= 0) return true;
            if (text.indexOf('loginlogo') >= 0 || text.indexOf('login-logo') >= 0) return true;
            if (text.indexOf('titlelogo') >= 0 || text.indexOf('title-logo') >= 0) return true;
            if (text.indexOf('/logo') >= 0 || text.indexOf('logo.') >= 0 || text.indexOf('-logo') >= 0 || text.indexOf('_logo') >= 0) return true;
            return false;
        }
        function replaceImages(url) {
            var imgs = document.querySelectorAll('img');
            for (var i = 0; i < imgs.length; i++) {
                var img = imgs[i];
                if (!looksLikeBrandingImage(img)) continue;
                if (!img.getAttribute('data-meshbranding-original-src')) img.setAttribute('data-meshbranding-original-src', img.getAttribute('src') || '');
                img.src = url;
                img.setAttribute('data-meshbranding-replaced', '1');
            }
        }
        function addMastheadLogo(url) {
            var masthead = document.getElementById('masthead');
            if (!masthead) return;
            var logo = document.getElementById('meshbranding-masthead-logo');
            if (!logo) {
                logo = document.createElement('img');
                logo.id = 'meshbranding-masthead-logo';
                logo.style.position = 'absolute';
                logo.style.left = '10px';
                logo.style.top = '4px';
                logo.style.height = '54px';
                logo.style.width = 'auto';
                logo.style.maxWidth = '240px';
                logo.style.zIndex = '99999';
                logo.style.objectFit = 'contain';
                logo.style.pointerEvents = 'none';
                masthead.style.position = masthead.style.position || 'relative';
                masthead.insertBefore(logo, masthead.firstChild);
            }
            logo.src = url;
        }
        function apply() {
            var r = resolveBrand();
            window.__meshBrandingResolved = r;
            if ((CONFIG.options || {}).applyDocumentTitle !== false && r.brand.documentTitle) document.title = r.brand.documentTitle;
            testLogoOnce(function(url) {
                if ((CONFIG.options || {}).replaceBrandingImages !== false) replaceImages(url);
                if ((CONFIG.options || {}).applyMastheadLogo !== false) addMastheadLogo(url);
            });
            // Não altera backgrounds, cores ou textos internos.
        }
        window.meshBrandingApply = apply;
        apply();
        if (!window.__meshBrandingObserverStarted) {
            window.__meshBrandingObserverStarted = true;
            var pending = false;
            var observer = new MutationObserver(function() {
                if (pending || state.logoStatus === 'missing') return;
                pending = true;
                setTimeout(function() { pending = false; apply(); }, 250);
            });
            observer.observe(document.documentElement, { childList: true, subtree: true });
        }
    })();
};
    setTimeout(registerRoutes, 1000);
    return obj;
};
