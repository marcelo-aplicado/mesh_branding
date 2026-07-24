/**
 * Mesh Branding v1.2.2
 * Fonte unica de configuracao: brand-config.json.
 * O frontend carrega /mesh_branding/config, sem CONFIG hardcoded no JS.
 */
module.exports.mesh_branding = function(parent) {
    var fs = require('fs');
    var path = require('path');
    var obj = { parent: parent, meshServer: parent.parent };
    obj.debug = obj.meshServer && obj.meshServer.debug;
    obj.exports = ['onWebUIStartupEnd', 'goPageEnd'];

    var pluginDir = __dirname;
    var dataDir = path.resolve(__dirname, '..', '..');
    var cfgPath = path.join(__dirname, 'brand-config.json');

    function log(m) {
        try { obj.debug('PLUGIN', 'Mesh Branding', m); } catch (e) {}
        try { console.log('PLUGIN: Mesh Branding: ' + m); } catch (e) {}
    }

    function cfg() {
        try { return JSON.parse(fs.readFileSync(cfgPath, 'utf8')); } catch (e) { return {}; }
    }

    function norm(h) { return String(h || '').trim().toLowerCase().split(':')[0]; }

    function host(req) {
        return norm((req && req.headers && (req.headers['x-forwarded-host'] || req.headers.host)) || '');
    }

    function mime(file) {
        var ext = path.extname(file).toLowerCase();
        if (ext === '.png') return 'image/png';
        if (ext === '.svg') return 'image/svg+xml; charset=utf-8';
        if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
        if (ext === '.webp') return 'image/webp';
        if (ext === '.ico') return 'image/x-icon';
        return 'application/octet-stream';
    }

    function safe(base, rel) {
        rel = String(rel || '').replace(/\\/g, '/').replace(/^\/+/, '');
        var full = path.resolve(base, rel);
        return full.indexOf(path.resolve(base)) === 0 ? full : null;
    }

    function brandFor(c, h) {
        var d = c.domains || {};
        h = norm(h);
        return d[h] || d[h.replace(/^www\./, '')] || null;
    }

    function root(name) {
        return String(name || '').toLowerCase() === 'data' ? dataDir : pluginDir;
    }

    function pick(req, type) {
        var c = cfg();
        var h = host(req);
        var b = brandFor(c, h);
        var customRoot = root(type === 'favicon' ? (c.customFaviconBaseDir || 'plugin') : (c.customLogoBaseDir || 'plugin'));
        var defaultRoot = root(type === 'favicon' ? (c.defaultFaviconBaseDir || 'plugin') : (c.defaultLogoBaseDir || 'data'));
        var brandFile = b && (type === 'favicon' ? b.faviconFile : b.logoFile);
        var defaultFile = type === 'favicon' ? c.defaultFaviconFile : c.defaultLogoFile;

        if (brandFile) {
            var customFile = safe(customRoot, brandFile);
            if (customFile && fs.existsSync(customFile) && fs.statSync(customFile).isFile()) {
                return { file: customFile, host: h, selected: brandFile, root: customRoot, mode: 'custom' };
            }
        }

        if (defaultFile) {
            var df = safe(defaultRoot, defaultFile);
            if (df && fs.existsSync(df) && fs.statSync(df).isFile()) {
                return { file: df, host: h, selected: defaultFile, root: defaultRoot, mode: 'default' };
            }
        }

        return { file: null, host: h, selected: null, root: customRoot + ' | ' + defaultRoot, mode: type === 'favicon' ? 'native' : 'missing' };
    }

    function send(req, res, selected, next) {
        if (!selected.file) {
            if (next) return next();
            res.writeHead(404, {
                'Content-Type': 'text/plain; charset=utf-8',
                'X-Mesh-Branding-Root': selected.root || '',
                'X-Mesh-Branding-Mode': selected.mode || ''
            });
            res.end('Mesh Branding: file not found');
            return;
        }

        res.writeHead(200, {
            'Content-Type': mime(selected.file),
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'X-Mesh-Branding-Host': selected.host || '',
            'X-Mesh-Branding-File': selected.selected || '',
            'X-Mesh-Branding-Root': selected.root || '',
            'X-Mesh-Branding-Mode': selected.mode || ''
        });
        fs.createReadStream(selected.file).pipe(res);
    }

    function getApp() {
        var candidates = [
            obj.meshServer && obj.meshServer.webserver && obj.meshServer.webserver.app,
            obj.meshServer && obj.meshServer.app,
            parent && parent.app,
            parent && parent.webserver && parent.webserver.app
        ];
        for (var i = 0; i < candidates.length; i++) {
            if (candidates[i] && typeof candidates[i].use === 'function') return candidates[i];
        }
        return null;
    }

    function front(app) {
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

    function title(req) {
        var b = brandFor(cfg(), host(req));
        return (b && b.documentTitle) || null;
    }

    function cssFromConfig(c, h) {
        var b = brandFor(c, h) || {};
        var base = c.defaultLogoCss || {};
        var over = b.logoCss || {};
        var x = {};
        Object.keys(base).forEach(function(k) { x[k] = base[k]; });
        Object.keys(over).forEach(function(k) { x[k] = over[k]; });
        return x;
    }

    function css(req) {
        var c = cfg();
        var x = cssFromConfig(c, host(req));
        var masthead = [];
        var login = [];

        if (x.mastheadBackgroundSize) masthead.push('background-size:' + x.mastheadBackgroundSize + ' !important');
        if (x.mastheadBackgroundPosition) masthead.push('background-position:' + x.mastheadBackgroundPosition + ' !important');
        if (x.mastheadBackgroundRepeat) masthead.push('background-repeat:' + x.mastheadBackgroundRepeat + ' !important');

        if (x.loginLogoWidth) login.push('width:' + x.loginLogoWidth + ' !important');
        if (x.loginLogoHeight) login.push('height:' + x.loginLogoHeight + ' !important');
        if (x.loginLogoObjectFit) login.push('object-fit:' + x.loginLogoObjectFit + ' !important');
        if (x.loginLogoDisplay) login.push('display:' + x.loginLogoDisplay + ' !important');
        if (x.loginLogoMarginLeft) login.push('margin-left:' + x.loginLogoMarginLeft + ' !important');
        if (x.loginLogoMarginRight) login.push('margin-right:' + x.loginLogoMarginRight + ' !important');
        login.push('max-width:100% !important');

        var out = '';
        if (masthead.length) out += '#masthead{' + masthead.join(';') + ';}';
        if (login.length) out += 'img#loginPicture{' + login.join(';') + ';}';
        return out;
    }

    function should(req) {
        if (!req || String(req.method || 'GET').toUpperCase() !== 'GET') return false;
        var p = String(req.url || '/').split('?')[0].toLowerCase();
        if (p === '/logout' || p.indexOf('/logout') === 0) return false;
        if (!(p === '/' || p === '/login')) return false;
        if (p.match(/\.(png|jpg|jpeg|gif|webp|ico|css|js|map|svg|woff|woff2|ttf|eot|ashx)$/)) return false;
        var a = String(req.headers && req.headers.accept || '').toLowerCase();
        return a.indexOf('text/html') >= 0 || a.indexOf('*/*') >= 0 || a === '';
    }

    function patch(html, pageTitle, cssBlock) {
        if (pageTitle) {
            var safeTitle = String(pageTitle).replace(/[&<>]/g, function(ch) {
                return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[ch];
            });
            if (/<title>[\s\S]*?<\/title>/i.test(html)) {
                html = html.replace(/<title>[\s\S]*?<\/title>/i, '<title>' + safeTitle + '</title>');
            } else {
                html = html.replace(/<head[^>]*>/i, function(m) { return m + '<title>' + safeTitle + '</title>'; });
            }
        }

        if (cssBlock) {
            html = html.replace(/<head[^>]*>/i, function(m) {
                return m + '<style id="mesh-branding-size-style">' + cssBlock + '</style>';
            });
        }
        return html;
    }

    function htmlMw(req, res, next) {
        if (!should(req)) return next();
        var t = title(req);
        var cssBlock = css(req);
        if (!t && !cssBlock) return next();

        var chunks = [];
        var oldWrite = res.write;
        var oldEnd = res.end;
        var oldWriteHead = res.writeHead;
        var code = 200;
        var headers = null;

        res.writeHead = function(c, h) {
            code = c || code;
            headers = h || headers;
            return res;
        };
        res.write = function(chunk, enc, cb) {
            if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, enc));
            if (typeof cb === 'function') cb();
            return true;
        };
        res.end = function(chunk, enc, cb) {
            if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, enc));
            var body = Buffer.concat(chunks).toString('utf8');
            if (code >= 300 && code < 400) {
                if (oldWriteHead && !res.headersSent) {
                    try { oldWriteHead.call(res, code, headers || undefined); } catch (e) {}
                }
                return oldEnd.call(res, body, 'utf8', cb);
            }
            if (body.indexOf('<html') >= 0 || body.indexOf('<head') >= 0) {
                body = patch(body, t, cssBlock);
                try { res.setHeader('Content-Length', Buffer.byteLength(body)); } catch (e) {}
                try { if (t) res.setHeader('X-Mesh-Branding-Title', t); if (cssBlock) res.setHeader('X-Mesh-Branding-Css', '1'); } catch (e) {}
            }
            if (oldWriteHead && !res.headersSent) {
                try { oldWriteHead.call(res, code, headers || undefined); } catch (e) {}
            }
            return oldEnd.call(res, body, 'utf8', cb);
        };
        next();
    }

    function sendConfig(req, res) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'X-Mesh-Branding-Config': 'brand-config.json'
        });
        res.end(JSON.stringify(cfg()));
    }

    function logo(req, res) { send(req, res, pick(req, 'logo')); }
    function fav(req, res, next) { send(req, res, pick(req, 'favicon'), next); }

    function route(req, res) {
        var u = (req.url || '/').split('?')[0];
        if (u === '/config' || u === '/config.json') return sendConfig(req, res);
        if (u === '/' || u === '/logo' || u === '/logo.png') return logo(req, res);
        if (u === '/favicon' || u === '/favicon.ico' || u === '/favicon.png') return fav(req, res);
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Mesh Branding route not found');
    }

    obj.hook_setupHttpHandlers = function() {
        var app = getApp();
        if (!app) { log('Express app not found'); return; }
        if (app.__mesh_branding_v122_registered) return;
        app.__mesh_branding_v122_registered = true;

        app.use(htmlMw); front(app);
        var c = cfg(), r = c.route || '/mesh_branding';
        app.use(r, route);
        app.use('/loginlogo.png', logo); front(app);
        app.use('/logo.png', logo); front(app);
        app.use('/favicon.ico', fav); front(app);
        app.use('/favicon-303x303.png', fav); var f = front(app);

        log('registered route ' + r + ' -> custom:' + pluginDir + ', default:' + dataDir);
        log('registered route ' + r + '/config -> ' + cfgPath);
        log('intercepted /loginlogo.png, /logo.png and favicon routes' + (f ? ' (front)' : ''));
        log('registered HTML title/style middleware for / and /login only');
    };

    obj.server_startup = function() { log('loaded, pluginDir=' + pluginDir + ', dataDir=' + dataDir); };

    obj.onWebUIStartupEnd = function() {
        (function() {
            'use strict';

            function n(h) { return String(h || '').trim().toLowerCase().split(':')[0]; }

            function brandForClient(CONFIG) {
                var h = n(window.location.hostname);
                var d = CONFIG.domains || {};
                var b = d[h] || d[h.replace(/^www\./, '')] || {};
                return { host: h, brand: b };
            }

            function mergeCss(CONFIG) {
                var r = brandForClient(CONFIG);
                var base = CONFIG.defaultLogoCss || {};
                var over = (r.brand || {}).logoCss || {};
                var x = {};
                Object.keys(base).forEach(function(k) { x[k] = base[k]; });
                Object.keys(over).forEach(function(k) { x[k] = over[k]; });
                return x;
            }

            function apply(CONFIG) {
                if (!CONFIG) return;
                var r = brandForClient(CONFIG);
                window.__meshBrandingResolved = r;

                if ((CONFIG.options || {}).applyDocumentTitle !== false && r.brand.documentTitle) {
                    document.title = r.brand.documentTitle;
                }

                var m = document.getElementById('masthead');
                var x = mergeCss(CONFIG);
                if (m) {
                    if (x.mastheadBackgroundSize) m.style.backgroundSize = x.mastheadBackgroundSize;
                    if (x.mastheadBackgroundPosition) m.style.backgroundPosition = x.mastheadBackgroundPosition;
                    if (x.mastheadBackgroundRepeat) m.style.backgroundRepeat = x.mastheadBackgroundRepeat;
                }
            }

            function loadConfigAndApply() {
                fetch('/mesh_branding/config?v=' + Date.now(), { cache: 'no-store' })
                    .then(function(r) { return r.json(); })
                    .then(function(CONFIG) {
                        window.__meshBrandingConfig = CONFIG;
                        apply(CONFIG);
                        setTimeout(function() { apply(CONFIG); }, 500);
                        setTimeout(function() { apply(CONFIG); }, 1500);
                    })
                    .catch(function(err) {
                        try { console.warn('Mesh Branding: failed to load config', err); } catch (e) {}
                    });
            }

            window.meshBrandingApply = function() {
                if (window.__meshBrandingConfig) {
                    apply(window.__meshBrandingConfig);
                } else {
                    loadConfigAndApply();
                }
            };

            loadConfigAndApply();
        })();
    };
    obj.goPageEnd = obj.onWebUIStartupEnd;
    return obj;
};
