/**
 * Mesh Branding v4.1.1
 * Logos, favicons, title e tamanho por host.
 */
module.exports.mesh_branding = function(parent) {
    var fs = require('fs');
    var path = require('path');
    var obj = { parent: parent, meshServer: parent.parent };
    obj.debug = obj.meshServer && obj.meshServer.debug;
    obj.exports = ['onWebUIStartupEnd', 'goPageEnd'];

    var pluginDir = __dirname;
    var dataDir = path.resolve(__dirname, '..', '..');
    var localConfigPath = path.join(__dirname, 'brand-config.json');

    function log(m) {
        try { obj.debug('PLUGIN', 'Mesh Branding', m); } catch (e) {}
        try { console.log('PLUGIN: Mesh Branding: ' + m); } catch (e) {}
    }

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

    function rootFromName(name) {
        name = String(name || '').toLowerCase();
        return name === 'data' ? dataDir : pluginDir;
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

    function selectFaviconFile(req) {
        var cfg = readConfig();
        var customRoot = rootFromName(cfg.customFaviconBaseDir || 'plugin');
        var defaultRoot = rootFromName(cfg.defaultFaviconBaseDir || 'plugin');
        var host = getHost(req);
        var brand = brandForHost(cfg, host);
        if (brand && brand.faviconFile) {
            var customFile = safeJoin(customRoot, brand.faviconFile);
            if (customFile && fs.existsSync(customFile) && fs.statSync(customFile).isFile()) return { file: customFile, host: host, selected: brand.faviconFile, root: customRoot, mode: 'custom' };
        }
        if (cfg.defaultFaviconFile) {
            var defaultFile = safeJoin(defaultRoot, cfg.defaultFaviconFile);
            if (defaultFile && fs.existsSync(defaultFile) && fs.statSync(defaultFile).isFile()) return { file: defaultFile, host: host, selected: cfg.defaultFaviconFile, root: defaultRoot, mode: 'default' };
        }
        return { file: null, host: host, selected: null, root: customRoot + ' | ' + defaultRoot, mode: 'native' };
    }

    function titleForReq(req) {
        var cfg = readConfig();
        var brand = brandForHost(cfg, getHost(req));
        return (brand && brand.documentTitle) || null;
    }

    function cssForReq(req) {
        var cfg = readConfig();
        var host = getHost(req);
        var brand = brandForHost(cfg, host) || {};
        var base = cfg.defaultLogoCss || {};
        var override = brand.logoCss || {};
        var css = {};
        Object.keys(base).forEach(function(k) { css[k] = base[k]; });
        Object.keys(override).forEach(function(k) { css[k] = override[k]; });
        return css;
    }

    function cssBlockFromConfig(css) {
        var masthead = [];
        var login = [];
        if (css.mastheadBackgroundSize) masthead.push('background-size:' + css.mastheadBackgroundSize + ' !important');
        if (css.mastheadBackgroundPosition) masthead.push('background-position:' + css.mastheadBackgroundPosition + ' !important');
        if (css.mastheadBackgroundRepeat) masthead.push('background-repeat:' + css.mastheadBackgroundRepeat + ' !important');
        if (css.loginLogoWidth) login.push('width:' + css.loginLogoWidth + ' !important');
        if (css.loginLogoHeight) login.push('height:' + css.loginLogoHeight + ' !important');
        if (css.loginLogoObjectFit) login.push('object-fit:' + css.loginLogoObjectFit + ' !important');
        login.push('max-width:100% !important');
        login.push('display:block !important');
        var out = '';
        if (masthead.length) out += '#masthead{' + masthead.join(';') + ';}';
        if (login.length) out += 'img#loginPicture{' + login.join(';') + ';}';
        return out;
    }

    function sendFileResult(req, res, selected, notFoundText, allowNativeNext, next) {
        if (!selected.file) {
            if (allowNativeNext && typeof next === 'function') return next();
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Mesh-Branding-Root': selected.root || '', 'X-Mesh-Branding-Mode': selected.mode || '' });
            res.end(notFoundText || 'Mesh Branding: file not found');
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

    function sendLogo(req, res) { sendFileResult(req, res, selectLogoFile(req), 'Mesh Branding: no logo found'); }
    function sendFavicon(req, res, next) { sendFileResult(req, res, selectFaviconFile(req), 'Mesh Branding: no favicon found', true, next); }

    function getApp() {
        var candidates = [obj.meshServer && obj.meshServer.webserver && obj.meshServer.webserver.app, obj.meshServer && obj.meshServer.app, parent && parent.app, parent && parent.webserver && parent.webserver.app];
        for (var i = 0; i < candidates.length; i++) if (candidates[i] && typeof candidates[i].use === 'function') return candidates[i];
        return null;
    }

    function moveLastLayerToFront(app) {
        try {
            var stack = app && app._router && app._router.stack;
            if (Array.isArray(stack) && stack.length > 1) { var layer = stack.pop(); stack.unshift(layer); return true; }
        } catch(e) {}
        return false;
    }

    function shouldPatchHtml(req) {
        if (!req || String(req.method || 'GET').toUpperCase() !== 'GET') return false;
        var pathOnly = String(req.url || '/').split('?')[0].toLowerCase();
        if (pathOnly === '/logout' || pathOnly.indexOf('/logout') === 0) return false;
        if (!(pathOnly === '/' || pathOnly === '/login')) return false;
        if (pathOnly.match(/\.(png|jpg|jpeg|gif|webp|ico|css|js|map|svg|woff|woff2|ttf|eot|ashx)$/)) return false;
        var accept = String((req.headers && req.headers.accept) || '').toLowerCase();
        return (accept.indexOf('text/html') >= 0 || accept.indexOf('*/*') >= 0 || accept === '');
    }

    function patchTitleHtml(html, title) {
        if (!title) return html;
        var safeTitle = String(title).replace(/[&<>]/g, function(c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; });
        if (/<title>[\s\S]*?<\/title>/i.test(html)) return html.replace(/<title>[\s\S]*?<\/title>/i, '<title>' + safeTitle + '</title>');
        if (/<head[^>]*>/i.test(html)) return html.replace(/<head[^>]*>/i, function(m) { return m + '<title>' + safeTitle + '</title>'; });
        return html;
    }

    function patchStyleHtml(html, css) {
        if (!css) return html;
        var style = '<style id="mesh-branding-size-style">' + css + '</style>';
        if (/<head[^>]*>/i.test(html)) return html.replace(/<head[^>]*>/i, function(m) { return m + style; });
        return style + html;
    }

    function htmlPatchMiddleware(req, res, next) {
        if (!shouldPatchHtml(req)) return next();
        var title = titleForReq(req);
        var css = cssBlockFromConfig(cssForReq(req));
        if (!title && !css) return next();
        var chunks = [], oldWrite = res.write, oldEnd = res.end, oldWriteHead = res.writeHead, statusCode = 200, headersObj = null;
        res.writeHead = function(code, headers) { statusCode = code || statusCode; headersObj = headers || headersObj; return res; };
        res.write = function(chunk, encoding, cb) { if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding)); if (typeof cb === 'function') cb(); return true; };
        res.end = function(chunk, encoding, cb) {
            if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
            var body = Buffer.concat(chunks).toString('utf8');
            if (statusCode >= 300 && statusCode < 400) {
                if (oldWriteHead && !res.headersSent) { try { oldWriteHead.call(res, statusCode, headersObj || undefined); } catch(e) {} }
                return oldEnd.call(res, body, 'utf8', cb);
            }
            if (body.indexOf('<html') >= 0 || body.indexOf('<title') >= 0 || body.indexOf('<head') >= 0) {
                body = patchTitleHtml(body, title);
                body = patchStyleHtml(body, css);
                try { res.setHeader('Content-Length', Buffer.byteLength(body)); } catch(e) {}
                try { if (title) res.setHeader('X-Mesh-Branding-Title', title); } catch(e) {}
                try { if (css) res.setHeader('X-Mesh-Branding-Css', '1'); } catch(e) {}
            }
            if (oldWriteHead && !res.headersSent) { try { oldWriteHead.call(res, statusCode, headersObj || undefined); } catch(e) {} }
            return oldEnd.call(res, body, 'utf8', cb);
        };
        next();
    }

    function brandingHandler(req, res) {
        var u = req.url || '/', q = u.indexOf('?');
        if (q >= 0) u = u.substring(0, q);
        if (u === '/' || u === '/logo' || u === '/logo.png') return sendLogo(req, res);
        if (u === '/favicon' || u === '/favicon.ico' || u === '/favicon.png') return sendFavicon(req, res);
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Mesh Branding route not found');
    }

    function logoHandler(req, res) { sendLogo(req, res); }
    function faviconHandler(req, res, next) { sendFavicon(req, res, next); }

    obj.hook_setupHttpHandlers = function() {
        var app = getApp();
        if (!app) { log('Express app not found'); return; }
        if (app.__mesh_branding_v411_registered) return;
        app.__mesh_branding_v411_registered = true;
        app.use(htmlPatchMiddleware); moveLastLayerToFront(app);
        var cfg = readConfig(), route = cfg.route || '/mesh_branding';
        app.use(route, brandingHandler);
        app.use('/loginlogo.png', logoHandler); moveLastLayerToFront(app);
        app.use('/logo.png', logoHandler); moveLastLayerToFront(app);
        app.use('/favicon.ico', faviconHandler); moveLastLayerToFront(app);
        app.use('/favicon-303x303.png', faviconHandler); var front = moveLastLayerToFront(app);
        log('registered route ' + route + ' -> custom:' + pluginDir + ', default:' + dataDir);
        log('intercepted /loginlogo.png, /logo.png and favicon routes -> custom:' + pluginDir + ', default:' + dataDir + (front ? ' (front)' : ''));
        log('registered HTML title/style middleware for / and /login only');
    };

    obj.server_startup = function() { log('loaded, pluginDir=' + pluginDir + ', dataDir=' + dataDir); };

    obj.onWebUIStartupEnd = function() {
        (function() {
            'use strict';
            var CONFIG = {"defaultLogoFile": "Aplicado_Logo.png", "defaultFaviconFile": "Aplicado_Favicon.svg", "customLogoBaseDir": "plugin", "defaultLogoBaseDir": "data", "customFaviconBaseDir": "plugin", "defaultFaviconBaseDir": "plugin", "route": "/mesh_branding", "logoEndpoint": "/mesh_branding/logo.png", "faviconEndpoint": "/mesh_branding/favicon.ico", "intercept": {"enabled": true, "paths": ["/loginlogo.png", "/logo.png", "/favicon.ico", "/favicon-303x303.png"]}, "defaultLogoCss": {"mastheadBackgroundSize": "220px auto", "mastheadBackgroundPosition": "12px center", "mastheadBackgroundRepeat": "no-repeat", "loginLogoWidth": "224px", "loginLogoHeight": "60px", "loginLogoObjectFit": "contain"}, "options": {"applyDocumentTitle": true, "applyLogoCss": true, "replaceBrandingImagesAfterLogin": false, "replaceMainMeshImage": false, "replaceBackgrounds": false, "preserveInternalTitles": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo.png", "faviconFile": "Aplicado_Favicon.svg"}, "mesh.fastcopy.net.br": {"documentTitle": "Acesso Remoto - FastCopy", "logoFile": "FastCopy_Logo.png", "faviconFile": "FastCopy_Favicon.svg"}, "mesh.crsbrands.com.br": {"documentTitle": "Acesso Remoto - CRS Brands", "logoFile": "CRSBrands_Logo.png", "faviconFile": "CRSBrands_Favicon.svg"}, "mesh.mhs.tec.br": {"documentTitle": "Acesso Remoto - Aplicado", "logoFile": "Aplicado_Logo.png", "faviconFile": "Aplicado_Favicon.svg"}}};
            function normalizeHost(host) { return String(host || '').trim().toLowerCase().split(':')[0]; }
            function resolveBrand() { var host = normalizeHost(window.location.hostname), domains = CONFIG.domains || {}, brand = domains[host] || domains[host.replace(/^www\./, '')] || {}; return { host: host, brand: brand }; }
            function mergeCss() { var base = CONFIG.defaultLogoCss || {}, brand = resolveBrand().brand || {}, over = brand.logoCss || {}, css = {}; Object.keys(base).forEach(function(k) { css[k] = base[k]; }); Object.keys(over).forEach(function(k) { css[k] = over[k]; }); return css; }
            function applyCss() { var css = mergeCss(), m = document.getElementById('masthead'); if (m) { if (css.mastheadBackgroundSize) m.style.backgroundSize = css.mastheadBackgroundSize; if (css.mastheadBackgroundPosition) m.style.backgroundPosition = css.mastheadBackgroundPosition; if (css.mastheadBackgroundRepeat) m.style.backgroundRepeat = css.mastheadBackgroundRepeat; } }
            function apply() { var r = resolveBrand(); window.__meshBrandingResolved = r; if ((CONFIG.options || {}).applyDocumentTitle !== false && r.brand.documentTitle) document.title = r.brand.documentTitle; var old = document.getElementById('meshbranding-masthead-logo'); if (old && old.parentNode) old.parentNode.removeChild(old); applyCss(); }
            window.meshBrandingApply = apply; apply(); setTimeout(apply, 500); setTimeout(apply, 1500);
        })();
    };
    obj.goPageEnd = obj.onWebUIStartupEnd;
    return obj;
};
