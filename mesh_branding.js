/**
 * MeshCentral Mesh Branding v4.0.0
 * Rota HTTP interna no MeshCentral: /mesh_branding/logo.png
 * Usa arquivos diretamente em meshcentral-data.
 * Custom: Aplicado_Logo_Custom.png para mesh.aplicado.com.br.
 * Fallback: Aplicado_Logo.png para hosts sem logo customizado.
 */
module.exports.mesh_branding = function(parent) {
    var obj = {};
    obj.parent = parent;
    obj.exports = [ 'onWebUIStartupEnd', 'goPageEnd' ];

    var fs = require('fs');
    var path = require('path');
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
        if (!selected.file) {
            res.statusCode = 404;
            res.end('Mesh Branding: no logo found');
            return;
        }
        res.setHeader('Content-Type', getMime(selected.file));
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('X-Mesh-Branding-Host', selected.host || '');
        res.setHeader('X-Mesh-Branding-File', selected.selected || '');
        fs.createReadStream(selected.file).pipe(res);
    }

    function tryRegisterOnApp(app) {
        if (!app || typeof app.get !== 'function') return false;
        if (app.__mesh_branding_v400_registered) return true;
        app.__mesh_branding_v400_registered = true;
        app.get('/mesh_branding/logo.png', function(req, res) { sendLogo(req, res); });
        app.get('/mesh_branding/logo', function(req, res) { sendLogo(req, res); });
        console.log('PLUGIN: Mesh Branding v4.0.0: registered /mesh_branding/logo.png and /mesh_branding/logo, dataDir=' + dataDir);
        return true;
    }

    function findAndRegister(root) {
        var seen = [];
        var queue = [];
        for (var a = 0; a < arguments.length; a++) queue.push(arguments[a]);
        queue.push(parent);
        var depth = 0;
        while (queue.length && depth < 500) {
            var x = queue.shift(); depth++;
            if (!x || typeof x !== 'object') continue;
            if (seen.indexOf(x) >= 0) continue;
            seen.push(x);
            if (tryRegisterOnApp(x)) return true;
            var keys;
            try { keys = Object.keys(x).slice(0, 120); } catch(e) { keys = []; }
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                if (k === 'app' || k === 'expressApp' || k === 'webserver' || k === 'parent' || k === 'server' || k === 'meshserver' || k === 'obj') {
                    try { queue.push(x[k]); } catch(e) {}
                }
            }
        }
        return false;
    }


    function registerRoutes() {
        var ok = findAndRegister.apply(null, arguments);
        if (!ok) { console.log('PLUGIN: Mesh Branding v4.0.0: express app not found yet.'); }
        return ok;
    }

    obj.server_startup = function() {
        registerRoutes.apply(null, arguments);
        setTimeout(function() { registerRoutes(); }, 1000);
        setTimeout(function() { registerRoutes(); }, 5000);
    };

    obj.hook_setupHttpHandlers = function() {
        registerRoutes.apply(null, arguments);
    };

    obj.onWebUIStartupEnd = function() {
    (function() {
        'use strict';
        var CONFIG = {"defaultLogoFile": "Aplicado_Logo.png", "routes": {"logo": "/mesh_branding/logo.png"}, "options": {"applyDocumentTitle": true, "replaceLoginLogo": true, "replaceTitleLogo": true, "replaceMainMeshImage": true, "replaceMastheadLogo": true, "preserveBackgrounds": true, "preserveInternalTitles": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo_Custom.png"}, "mesh.fastcopy.net.br": {"documentTitle": "Acesso Remoto - FastCopy", "logoFile": "FastCopy_Logo_Custom.png"}, "mesh.crsbrands.com.br": {"documentTitle": "Acesso Remoto - CRS Brands", "logoFile": "CRSBrands_Logo_Custom.png"}, "mesh.mhs.tec.br": {"documentTitle": "Acesso Remoto - MHS TEC", "logoFile": "MHS_Logo_Custom.png"}}};
        var state = window.__meshBrandingState || { logoStatus: null, logoUrl: null, pending: false, host: null };
        window.__meshBrandingState = state;

        function normalizeHost(host) { return String(host || '').trim().toLowerCase().split(':')[0]; }

        function resolveBrand() {
            var host = normalizeHost(window.location.hostname);
            var domains = CONFIG.domains || {};
            var brand = domains[host] || domains[host.replace(/^www\./, '')] || {};
            return { host: host, brand: brand };
        }

        function logoUrl() {
            var route = ((CONFIG.routes || {}).logo || '/mesh_branding/logo.png');
            return route + '?v=' + encodeURIComponent(Date.now());
        }

        function resetIfHostChanged() {
            var h = normalizeHost(window.location.hostname);
            if (state.host !== h) {
                state.host = h;
                state.logoStatus = null;
                state.logoUrl = null;
                state.pending = false;
            }
        }

        function testLogoOnce(callback) {
            resetIfHostChanged();
            if (state.logoStatus === 'ok') { callback(state.logoUrl); return; }
            if (state.logoStatus === 'missing') return;
            if (state.pending) return;
            state.pending = true;
            var url = logoUrl();
            var img = new Image();
            img.onload = function() {
                state.pending = false;
                if (img.width > 0 || img.height > 0) {
                    state.logoStatus = 'ok';
                    state.logoUrl = url;
                    callback(url);
                } else { state.logoStatus = 'missing'; }
            };
            img.onerror = function() { state.pending = false; state.logoStatus = 'missing'; };
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
            if (text.indexOf('loginlogo.png') >= 0) return true;
            if (text.indexOf('serverpic.ashx') >= 0) return true;
            if (text.indexOf('loginpic.ashx') >= 0) return true;
            if (text.indexOf('titlepic.ashx') >= 0) return true;
            if (text.indexOf('mainmeshimage') >= 0) return true;
            if (text.indexOf('loginlogo') >= 0 || text.indexOf('login-logo') >= 0) return true;
            if (text.indexOf('titlelogo') >= 0 || text.indexOf('title-logo') >= 0) return true;
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
            if ((CONFIG.options || {}).replaceMastheadLogo === false) return;
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
                replaceImages(url);
                addMastheadLogo(url);
            });
            // Nao altera background, cores nem textos internos.
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
        var CONFIG = {"defaultLogoFile": "Aplicado_Logo.png", "routes": {"logo": "/mesh_branding/logo.png"}, "options": {"applyDocumentTitle": true, "replaceLoginLogo": true, "replaceTitleLogo": true, "replaceMainMeshImage": true, "replaceMastheadLogo": true, "preserveBackgrounds": true, "preserveInternalTitles": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo_Custom.png"}, "mesh.fastcopy.net.br": {"documentTitle": "Acesso Remoto - FastCopy", "logoFile": "FastCopy_Logo_Custom.png"}, "mesh.crsbrands.com.br": {"documentTitle": "Acesso Remoto - CRS Brands", "logoFile": "CRSBrands_Logo_Custom.png"}, "mesh.mhs.tec.br": {"documentTitle": "Acesso Remoto - MHS TEC", "logoFile": "MHS_Logo_Custom.png"}}};
        var state = window.__meshBrandingState || { logoStatus: null, logoUrl: null, pending: false, host: null };
        window.__meshBrandingState = state;

        function normalizeHost(host) { return String(host || '').trim().toLowerCase().split(':')[0]; }

        function resolveBrand() {
            var host = normalizeHost(window.location.hostname);
            var domains = CONFIG.domains || {};
            var brand = domains[host] || domains[host.replace(/^www\./, '')] || {};
            return { host: host, brand: brand };
        }

        function logoUrl() {
            var route = ((CONFIG.routes || {}).logo || '/mesh_branding/logo.png');
            return route + '?v=' + encodeURIComponent(Date.now());
        }

        function resetIfHostChanged() {
            var h = normalizeHost(window.location.hostname);
            if (state.host !== h) {
                state.host = h;
                state.logoStatus = null;
                state.logoUrl = null;
                state.pending = false;
            }
        }

        function testLogoOnce(callback) {
            resetIfHostChanged();
            if (state.logoStatus === 'ok') { callback(state.logoUrl); return; }
            if (state.logoStatus === 'missing') return;
            if (state.pending) return;
            state.pending = true;
            var url = logoUrl();
            var img = new Image();
            img.onload = function() {
                state.pending = false;
                if (img.width > 0 || img.height > 0) {
                    state.logoStatus = 'ok';
                    state.logoUrl = url;
                    callback(url);
                } else { state.logoStatus = 'missing'; }
            };
            img.onerror = function() { state.pending = false; state.logoStatus = 'missing'; };
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
            if (text.indexOf('loginlogo.png') >= 0) return true;
            if (text.indexOf('serverpic.ashx') >= 0) return true;
            if (text.indexOf('loginpic.ashx') >= 0) return true;
            if (text.indexOf('titlepic.ashx') >= 0) return true;
            if (text.indexOf('mainmeshimage') >= 0) return true;
            if (text.indexOf('loginlogo') >= 0 || text.indexOf('login-logo') >= 0) return true;
            if (text.indexOf('titlelogo') >= 0 || text.indexOf('title-logo') >= 0) return true;
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
            if ((CONFIG.options || {}).replaceMastheadLogo === false) return;
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
                replaceImages(url);
                addMastheadLogo(url);
            });
            // Nao altera background, cores nem textos internos.
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

    setTimeout(function() { registerRoutes(); }, 1000);
    setTimeout(function() { registerRoutes(); }, 5000);

    return obj;
};
