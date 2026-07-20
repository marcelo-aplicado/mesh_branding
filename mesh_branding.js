/**
 * MeshCentral Mesh Branding v3.0.0
 * Logos lidos de meshcentral-data. Se o arquivo não existir, o branding padrão é preservado.
 * Não altera backgrounds nem textos internos como "Meu Servidor".
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
        return { host: host, brand: brand || {}, brandKey: (brand && brand.brandKey) || (req.query && req.query.brand) || 'default' };
    }
    function findBrandFile(kind, brandKey) {
        var cfg = localConfig || {};
        var pathsCfg = cfg.paths || {};
        var candidates = (kind === 'favicon' ? pathsCfg.faviconCandidates : pathsCfg.logoCandidates) || [];
        for (var i = 0; i < candidates.length; i++) {
            var rel = String(candidates[i]).replace(/\{brand\}/g, brandKey);
            var full = safeJoin(dataDir, rel);
            if (full && fs.existsSync(full) && fs.statSync(full).isFile()) return full;
        }
        return null;
    }
    function sendBrandFile(req, res, kind) {
        var resolved = resolveBrandFromReq(req);
        var file = findBrandFile(kind, resolved.brandKey);
        if (!file) { res.statusCode = 404; res.end('Logo not found'); return; }
        res.setHeader('Content-Type', getMime(file));
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        fs.createReadStream(file).pipe(res);
    }

    obj.hook_setupHttpHandlers = function() {
        var args = Array.prototype.slice.call(arguments);
        var app = null;
        for (var i = 0; i < args.length; i++) {
            if (args[i] && typeof args[i].get === 'function' && typeof args[i].use === 'function') { app = args[i]; break; }
        }
        if (!app && parent && parent.parent && parent.parent.webserver && parent.parent.webserver.app) app = parent.parent.webserver.app;
        if (!app && parent && parent.webserver && parent.webserver.app) app = parent.webserver.app;
        if (!app || app.__mesh_branding_routes_registered) return;
        app.__mesh_branding_routes_registered = true;
        app.get('/mesh_branding/logo', function(req, res) { sendBrandFile(req, res, 'logo'); });
        app.get('/mesh_branding/favicon', function(req, res) { sendBrandFile(req, res, 'favicon'); });
        console.log('PLUGIN: Mesh Branding: registered routes /mesh_branding/logo and /mesh_branding/favicon, dataDir=' + dataDir);
    };
    obj.onWebUIStartupEnd = function() {
        (function() {
            'use strict';
            var CONFIG = {"defaultBrand": "mesh.aplicado.com.br", "options": {"applyFavicon": true, "applyDocumentTitle": true, "replaceBrandingImages": true, "preserveBackgrounds": true, "preserveInternalTitles": true, "debug": false}, "paths": {"logoCandidates": ["mesh_branding/logos/{brand}.svg", "mesh_branding/logos/{brand}.png", "mesh_branding/{brand}.svg", "mesh_branding/{brand}.png", "branding/{brand}.svg", "branding/{brand}.png", "logos/{brand}.svg", "logos/{brand}.png", "{brand}.svg", "{brand}.png", "serverpic-{brand}.svg", "serverpic-{brand}.png"], "faviconCandidates": ["mesh_branding/favicons/{brand}.svg", "mesh_branding/favicons/{brand}.png", "branding/favicons/{brand}.svg", "branding/favicons/{brand}.png", "favicon-{brand}.svg", "favicon-{brand}.png"]}, "domains": {"mesh.aplicado.com.br": {"brandKey": "aplicado", "documentTitle": "Acesso Remoto - Aplicado"}, "mesh.fastcopy.net.br": {"brandKey": "fastcopy", "documentTitle": "Acesso Remoto - FastCopy"}, "mesh.crsbrands.com.br": {"brandKey": "crsbrands", "documentTitle": "Acesso Remoto - CRS Brands"}, "mesh.mhs.tec.br": {"brandKey": "mhs", "documentTitle": "Acesso Remoto - MHS TEC"}}};
            function log() { if ((CONFIG.options || {}).debug === true && window.console) console.log.apply(console, ['[MeshBranding]'].concat(Array.prototype.slice.call(arguments))); }
            function normalizeHost(host) { return String(host || '').trim().toLowerCase().split(':')[0]; }
            function resolveBrand() {
                var host = normalizeHost(window.location.hostname);
                var domains = CONFIG.domains || {};
                var brand = domains[host];
                var resolvedHost = host;
                if (!brand) { var clean = host.replace(/^www\./, ''); brand = domains[clean]; resolvedHost = clean; }
                if (!brand) { resolvedHost = CONFIG.defaultBrand; brand = domains[CONFIG.defaultBrand]; }
                if (!brand) { var keys = Object.keys(domains); resolvedHost = keys[0] || host; brand = domains[resolvedHost] || {}; }
                return { host: resolvedHost, brand: brand || {}, brandKey: (brand && brand.brandKey) || 'default' };
            }
            function route(kind) {
                var r = resolveBrand();
                return '/mesh_branding/' + kind + '?host=' + encodeURIComponent(r.host) + '&brand=' + encodeURIComponent(r.brandKey) + '&v=' + encodeURIComponent(Date.now());
            }
            function testImage(url, onOk) {
                var img = new Image();
                img.onload = function() { if (img.width > 0 || img.height > 0) onOk(url); };
                img.onerror = function() { log('arquivo inexistente, mantendo padrao', url); };
                img.src = url;
            }
            function setFavicon(url) {
                if (!url || !document.head) return;
                var nodes = document.querySelectorAll("link[rel='icon'],link[rel='shortcut icon'],link[rel='apple-touch-icon']");
                for (var i=0;i<nodes.length;i++) { if (nodes[i].parentNode) nodes[i].parentNode.removeChild(nodes[i]); }
                var link = document.createElement('link');
                link.rel = 'icon';
                link.href = url;
                document.head.appendChild(link);
            }
            function isIgnorable(text) {
                return text.indexOf('icon-') >= 0 || text.indexOf('x16') >= 0 || text.indexOf('plugin24') >= 0 || text.indexOf('link4') >= 0 || text.indexOf('link6') >= 0 || text.indexOf('userimage.ashx') >= 0 || text.indexOf('user-256') >= 0 || text.indexOf('group-256') >= 0 || text.indexOf('mesh-256') >= 0 || text.indexOf('details/') >= 0;
            }
            function looksLikeBrandingImage(img) {
                if (!img) return false;
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
                for (var i=0;i<imgs.length;i++) {
                    var img = imgs[i];
                    if (!looksLikeBrandingImage(img)) continue;
                    if (!img.getAttribute('data-meshbranding-original-src')) img.setAttribute('data-meshbranding-original-src', img.getAttribute('src') || '');
                    img.src = url;
                    img.setAttribute('data-meshbranding-replaced','1');
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
                var logoUrl = route('logo');
                testImage(logoUrl, function(okLogoUrl) {
                    if ((CONFIG.options || {}).replaceBrandingImages !== false) replaceImages(okLogoUrl);
                    if ((CONFIG.options || {}).applyMastheadLogo !== false) addMastheadLogo(okLogoUrl);
                });
                if ((CONFIG.options || {}).applyFavicon !== false) {
                    var faviconUrl = route('favicon');
                    testImage(faviconUrl, function(okFaviconUrl) { setFavicon(okFaviconUrl); });
                }
                // Intencionalmente nao altera backgrounds nem textos internos.
            }
            window.meshBrandingApply = apply;
            apply();
            if (!window.__meshBrandingObserverStarted) {
                window.__meshBrandingObserverStarted = true;
                var pending=false;
                var observer = new MutationObserver(function() {
                    if (pending) return;
                    pending = true;
                    setTimeout(function() { pending=false; apply(); }, 150);
                });
                observer.observe(document.documentElement, { childList:true, subtree:true, attributes:true, attributeFilter:['src','class'] });
            }
        })();
    };
    obj.goPageEnd = function() {
        (function() {
            'use strict';
            var CONFIG = {"defaultBrand": "mesh.aplicado.com.br", "options": {"applyFavicon": true, "applyDocumentTitle": true, "replaceBrandingImages": true, "preserveBackgrounds": true, "preserveInternalTitles": true, "debug": false}, "paths": {"logoCandidates": ["mesh_branding/logos/{brand}.svg", "mesh_branding/logos/{brand}.png", "mesh_branding/{brand}.svg", "mesh_branding/{brand}.png", "branding/{brand}.svg", "branding/{brand}.png", "logos/{brand}.svg", "logos/{brand}.png", "{brand}.svg", "{brand}.png", "serverpic-{brand}.svg", "serverpic-{brand}.png"], "faviconCandidates": ["mesh_branding/favicons/{brand}.svg", "mesh_branding/favicons/{brand}.png", "branding/favicons/{brand}.svg", "branding/favicons/{brand}.png", "favicon-{brand}.svg", "favicon-{brand}.png"]}, "domains": {"mesh.aplicado.com.br": {"brandKey": "aplicado", "documentTitle": "Acesso Remoto - Aplicado"}, "mesh.fastcopy.net.br": {"brandKey": "fastcopy", "documentTitle": "Acesso Remoto - FastCopy"}, "mesh.crsbrands.com.br": {"brandKey": "crsbrands", "documentTitle": "Acesso Remoto - CRS Brands"}, "mesh.mhs.tec.br": {"brandKey": "mhs", "documentTitle": "Acesso Remoto - MHS TEC"}}};
            function log() { if ((CONFIG.options || {}).debug === true && window.console) console.log.apply(console, ['[MeshBranding]'].concat(Array.prototype.slice.call(arguments))); }
            function normalizeHost(host) { return String(host || '').trim().toLowerCase().split(':')[0]; }
            function resolveBrand() {
                var host = normalizeHost(window.location.hostname);
                var domains = CONFIG.domains || {};
                var brand = domains[host];
                var resolvedHost = host;
                if (!brand) { var clean = host.replace(/^www\./, ''); brand = domains[clean]; resolvedHost = clean; }
                if (!brand) { resolvedHost = CONFIG.defaultBrand; brand = domains[CONFIG.defaultBrand]; }
                if (!brand) { var keys = Object.keys(domains); resolvedHost = keys[0] || host; brand = domains[resolvedHost] || {}; }
                return { host: resolvedHost, brand: brand || {}, brandKey: (brand && brand.brandKey) || 'default' };
            }
            function route(kind) {
                var r = resolveBrand();
                return '/mesh_branding/' + kind + '?host=' + encodeURIComponent(r.host) + '&brand=' + encodeURIComponent(r.brandKey) + '&v=' + encodeURIComponent(Date.now());
            }
            function testImage(url, onOk) {
                var img = new Image();
                img.onload = function() { if (img.width > 0 || img.height > 0) onOk(url); };
                img.onerror = function() { log('arquivo inexistente, mantendo padrao', url); };
                img.src = url;
            }
            function setFavicon(url) {
                if (!url || !document.head) return;
                var nodes = document.querySelectorAll("link[rel='icon'],link[rel='shortcut icon'],link[rel='apple-touch-icon']");
                for (var i=0;i<nodes.length;i++) { if (nodes[i].parentNode) nodes[i].parentNode.removeChild(nodes[i]); }
                var link = document.createElement('link');
                link.rel = 'icon';
                link.href = url;
                document.head.appendChild(link);
            }
            function isIgnorable(text) {
                return text.indexOf('icon-') >= 0 || text.indexOf('x16') >= 0 || text.indexOf('plugin24') >= 0 || text.indexOf('link4') >= 0 || text.indexOf('link6') >= 0 || text.indexOf('userimage.ashx') >= 0 || text.indexOf('user-256') >= 0 || text.indexOf('group-256') >= 0 || text.indexOf('mesh-256') >= 0 || text.indexOf('details/') >= 0;
            }
            function looksLikeBrandingImage(img) {
                if (!img) return false;
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
                for (var i=0;i<imgs.length;i++) {
                    var img = imgs[i];
                    if (!looksLikeBrandingImage(img)) continue;
                    if (!img.getAttribute('data-meshbranding-original-src')) img.setAttribute('data-meshbranding-original-src', img.getAttribute('src') || '');
                    img.src = url;
                    img.setAttribute('data-meshbranding-replaced','1');
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
                var logoUrl = route('logo');
                testImage(logoUrl, function(okLogoUrl) {
                    if ((CONFIG.options || {}).replaceBrandingImages !== false) replaceImages(okLogoUrl);
                    if ((CONFIG.options || {}).applyMastheadLogo !== false) addMastheadLogo(okLogoUrl);
                });
                if ((CONFIG.options || {}).applyFavicon !== false) {
                    var faviconUrl = route('favicon');
                    testImage(faviconUrl, function(okFaviconUrl) { setFavicon(okFaviconUrl); });
                }
                // Intencionalmente nao altera backgrounds nem textos internos.
            }
            window.meshBrandingApply = apply;
            apply();
            if (!window.__meshBrandingObserverStarted) {
                window.__meshBrandingObserverStarted = true;
                var pending=false;
                var observer = new MutationObserver(function() {
                    if (pending) return;
                    pending = true;
                    setTimeout(function() { pending=false; apply(); }, 150);
                });
                observer.observe(document.documentElement, { childList:true, subtree:true, attributes:true, attributeFilter:['src','class'] });
            }
        })();
    };
    return obj;
};
