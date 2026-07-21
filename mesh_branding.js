/**
 * MeshCentral Mesh Branding v4.0.2
 * Corrige sobreposicao: nao injeta logo novo no masthead e nao altera MainMeshImage/Meu Servidor.
 * Apenas substitui o src de imagens existentes como loginlogo.png.
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
    function getHost(req) { return normalizeHost((req && req.headers && (req.headers['x-forwarded-host'] || req.headers.host)) || ''); }
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

    obj.exports = [ 'onWebUIStartupEnd', 'goPageEnd' ];
    var cfg = readConfig();
    var route = cfg.route || '/mesh_branding';

    function handler(req, res) {
        var u = req.url || '/';
        var q = u.indexOf('?');
        if (q >= 0) u = u.substring(0, q);
        if (u === '/' || u === '/logo' || u === '/logo.png') { sendLogo(req, res); return; }
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Mesh Branding route not found');
    }

    obj.hook_setupHttpHandlers = function() {
        var a = getApp();
        if (!a) { log('Express app not found'); return; }
        if (a.__mesh_branding_v402_registered) return;
        a.__mesh_branding_v402_registered = true;
        a.use(route, handler);
        log('registered route ' + route + ' -> ' + dataDir + '/<logoFile>');
    };

    obj.server_startup = function() { log('loaded, dataDir=' + dataDir); };
    obj.onWebUIStartupEnd = function() {
    (function() {
        'use strict';
        var CONFIG = {"defaultLogoFile": "Aplicado_Logo.png", "route": "/mesh_branding", "logoEndpoint": "/mesh_branding/logo.png", "options": {"applyDocumentTitle": true, "replaceBrandingImages": true, "replaceMastheadLogo": false, "replaceMainMeshImage": false, "replaceBackgrounds": false, "preserveInternalTitles": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo_Custom.png"}, "mesh.fastcopy.net.br": {"documentTitle": "Acesso Remoto - FastCopy", "logoFile": "FastCopy_Logo_Custom.png"}, "mesh.crsbrands.com.br": {"documentTitle": "Acesso Remoto - CRS Brands", "logoFile": "CRSBrands_Logo_Custom.png"}, "mesh.mhs.tec.br": {"documentTitle": "Acesso Remoto - MHS TEC", "logoFile": "MHS_Logo_Custom.png"}}};
        var state = window.__meshBrandingState || { logoStatus: null, logoUrl: null, pending: false, host: null };
        window.__meshBrandingState = state;
        function normalizeHost(host) { return String(host || '').trim().toLowerCase().split(':')[0]; }
        function resolveBrand() {
            var host = normalizeHost(window.location.hostname);
            var domains = CONFIG.domains || {};
            var brand = domains[host] || domains[host.replace(/^www\./, '')] || {};
            return { host: host, brand: brand };
        }
        function logoUrl() { return (CONFIG.logoEndpoint || '/mesh_branding/logo.png') + '?v=' + encodeURIComponent(Date.now()); }
        function resetIfHostChanged() {
            var h = normalizeHost(window.location.hostname);
            if (state.host !== h) { state.host = h; state.logoStatus = null; state.logoUrl = null; state.pending = false; }
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
                if (img.width > 0 || img.height > 0) { state.logoStatus = 'ok'; state.logoUrl = url; callback(url); }
                else { state.logoStatus = 'missing'; }
            };
            img.onerror = function() { state.pending = false; state.logoStatus = 'missing'; };
            img.src = url;
        }
        function isIgnorable(text) {
            return text.indexOf('icon-') >= 0 || text.indexOf('x16') >= 0 || text.indexOf('plugin24') >= 0 || text.indexOf('link4') >= 0 || text.indexOf('link6') >= 0 || text.indexOf('userimage.ashx') >= 0 || text.indexOf('user-256') >= 0 || text.indexOf('group-256') >= 0 || text.indexOf('mesh-256') >= 0 || text.indexOf('details/') >= 0;
        }
        function looksLikeBrandingImage(img) {
            if (!img) return false;
            // Nunca substituir o logo do card 'Meu Servidor'.
            if (img.id === 'MainMeshImage' && (CONFIG.options || {}).replaceMainMeshImage !== true) return false;
            var id = String(img.id || '').toLowerCase();
            var cls = String(img.className || '').toLowerCase();
            var alt = String(img.alt || '').toLowerCase();
            var srcAttr = String(img.getAttribute('src') || '').toLowerCase();
            var src = String(img.src || '').toLowerCase();
            var text = id + ' ' + cls + ' ' + alt + ' ' + srcAttr + ' ' + src;
            if (img.getAttribute('data-meshbranding-preserve') === '1') return false;
            if (isIgnorable(text)) return false;
            // Troca somente imagens existentes de branding; nao cria imagem nova.
            if (text.indexOf('loginlogo.png') >= 0) return true;
            if (text.indexOf('loginpic.ashx') >= 0) return true;
            if (text.indexOf('titlepic.ashx') >= 0) return true;
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
        function removeInjectedMastheadLogo() {
            var old = document.getElementById('meshbranding-masthead-logo');
            if (old && old.parentNode) old.parentNode.removeChild(old);
        }
        function apply() {
            var r = resolveBrand();
            window.__meshBrandingResolved = r;
            if ((CONFIG.options || {}).applyDocumentTitle !== false && r.brand.documentTitle) document.title = r.brand.documentTitle;
            removeInjectedMastheadLogo();
            testLogoOnce(function(url) {
                if ((CONFIG.options || {}).replaceBrandingImages !== false) replaceImages(url);
            });
            // Nao altera background, cores, MainMeshImage ou textos internos.
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
        var CONFIG = {"defaultLogoFile": "Aplicado_Logo.png", "route": "/mesh_branding", "logoEndpoint": "/mesh_branding/logo.png", "options": {"applyDocumentTitle": true, "replaceBrandingImages": true, "replaceMastheadLogo": false, "replaceMainMeshImage": false, "replaceBackgrounds": false, "preserveInternalTitles": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo_Custom.png"}, "mesh.fastcopy.net.br": {"documentTitle": "Acesso Remoto - FastCopy", "logoFile": "FastCopy_Logo_Custom.png"}, "mesh.crsbrands.com.br": {"documentTitle": "Acesso Remoto - CRS Brands", "logoFile": "CRSBrands_Logo_Custom.png"}, "mesh.mhs.tec.br": {"documentTitle": "Acesso Remoto - MHS TEC", "logoFile": "MHS_Logo_Custom.png"}}};
        var state = window.__meshBrandingState || { logoStatus: null, logoUrl: null, pending: false, host: null };
        window.__meshBrandingState = state;
        function normalizeHost(host) { return String(host || '').trim().toLowerCase().split(':')[0]; }
        function resolveBrand() {
            var host = normalizeHost(window.location.hostname);
            var domains = CONFIG.domains || {};
            var brand = domains[host] || domains[host.replace(/^www\./, '')] || {};
            return { host: host, brand: brand };
        }
        function logoUrl() { return (CONFIG.logoEndpoint || '/mesh_branding/logo.png') + '?v=' + encodeURIComponent(Date.now()); }
        function resetIfHostChanged() {
            var h = normalizeHost(window.location.hostname);
            if (state.host !== h) { state.host = h; state.logoStatus = null; state.logoUrl = null; state.pending = false; }
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
                if (img.width > 0 || img.height > 0) { state.logoStatus = 'ok'; state.logoUrl = url; callback(url); }
                else { state.logoStatus = 'missing'; }
            };
            img.onerror = function() { state.pending = false; state.logoStatus = 'missing'; };
            img.src = url;
        }
        function isIgnorable(text) {
            return text.indexOf('icon-') >= 0 || text.indexOf('x16') >= 0 || text.indexOf('plugin24') >= 0 || text.indexOf('link4') >= 0 || text.indexOf('link6') >= 0 || text.indexOf('userimage.ashx') >= 0 || text.indexOf('user-256') >= 0 || text.indexOf('group-256') >= 0 || text.indexOf('mesh-256') >= 0 || text.indexOf('details/') >= 0;
        }
        function looksLikeBrandingImage(img) {
            if (!img) return false;
            // Nunca substituir o logo do card 'Meu Servidor'.
            if (img.id === 'MainMeshImage' && (CONFIG.options || {}).replaceMainMeshImage !== true) return false;
            var id = String(img.id || '').toLowerCase();
            var cls = String(img.className || '').toLowerCase();
            var alt = String(img.alt || '').toLowerCase();
            var srcAttr = String(img.getAttribute('src') || '').toLowerCase();
            var src = String(img.src || '').toLowerCase();
            var text = id + ' ' + cls + ' ' + alt + ' ' + srcAttr + ' ' + src;
            if (img.getAttribute('data-meshbranding-preserve') === '1') return false;
            if (isIgnorable(text)) return false;
            // Troca somente imagens existentes de branding; nao cria imagem nova.
            if (text.indexOf('loginlogo.png') >= 0) return true;
            if (text.indexOf('loginpic.ashx') >= 0) return true;
            if (text.indexOf('titlepic.ashx') >= 0) return true;
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
        function removeInjectedMastheadLogo() {
            var old = document.getElementById('meshbranding-masthead-logo');
            if (old && old.parentNode) old.parentNode.removeChild(old);
        }
        function apply() {
            var r = resolveBrand();
            window.__meshBrandingResolved = r;
            if ((CONFIG.options || {}).applyDocumentTitle !== false && r.brand.documentTitle) document.title = r.brand.documentTitle;
            removeInjectedMastheadLogo();
            testLogoOnce(function(url) {
                if ((CONFIG.options || {}).replaceBrandingImages !== false) replaceImages(url);
            });
            // Nao altera background, cores, MainMeshImage ou textos internos.
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
    return obj;
};
