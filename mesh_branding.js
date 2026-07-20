/**
 * MeshCentral Mesh Branding v2.0.1
 * Branding global por subdominio com mitigacao de flash visual no login.
 * Altera favicon, document.title, logo do masthead e imagens de branding detectadas em qualquer tela.
 * Nao altera textos internos como "Meu Servidor".
 */
module.exports.mesh_branding = function(parent) {
    var obj = {};
    obj.parent = parent;
    obj.exports = [ 'onWebUIStartupEnd', 'goPageEnd' ];
    obj.onWebUIStartupEnd = function() {
        (function() {
            'use strict';
            var BRAND_CONFIG = {"defaultBrand": "mesh.aplicado.com.br", "options": {"applyFavicon": true, "applyDocumentTitle": true, "applyMastheadLogo": true, "replaceBrandingImages": true, "replaceBrandingBackgrounds": true, "hideNativeBrandingUntilApplied": true, "preserveInternalTitles": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"brandKey": "aplicado", "documentTitle": "Acesso Remoto - Aplicado", "primaryColor": "#2563eb", "accentColor": "#143a73"}, "mesh.fastcopy.net.br": {"brandKey": "fastcopy", "documentTitle": "Acesso Remoto - FastCopy", "primaryColor": "#16a34a", "accentColor": "#052e16"}, "mesh.crsbrands.com.br": {"brandKey": "crsbrands", "documentTitle": "Acesso Remoto - CRS Brands", "primaryColor": "#dc2626", "accentColor": "#450a0a"}, "mesh.mhs.tec.br": {"brandKey": "mhs", "documentTitle": "Acesso Remoto - MHS TEC", "primaryColor": "#7c3aed", "accentColor": "#2e1065"}}, "embeddedLogos": {"aplicado": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJBcGxpY2FkbyI+CiAgPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeDI9IjEiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjU2M2ViIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjUyMCIgaGVpZ2h0PSIxNDAiIHJ4PSIyNCIgZmlsbD0idXJsKCNnKSIvPgogIDxjaXJjbGUgY3g9IjcyIiBjeT0iNzAiIHI9IjM4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LC4xOCkiLz4KICA8cGF0aCBkPSJNNTIgODggTDcyIDM0IEw5MiA4OCBaIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIuOTYiLz4KICA8dGV4dCB4PSIxMjYiIHk9IjgzIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+QXBsaWNhZG88L3RleHQ+Cjwvc3ZnPg==", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJBIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyNTYzZWIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5BPC90ZXh0Pgo8L3N2Zz4="}, "fastcopy": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJGYXN0Q29weSI+CiAgPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeDI9IjEiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMTZhMzRhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjUyMCIgaGVpZ2h0PSIxNDAiIHJ4PSIyNCIgZmlsbD0idXJsKCNnKSIvPgogIDxjaXJjbGUgY3g9IjcyIiBjeT0iNzAiIHI9IjM4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LC4xOCkiLz4KICA8cGF0aCBkPSJNNTIgODggTDcyIDM0IEw5MiA4OCBaIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIuOTYiLz4KICA8dGV4dCB4PSIxMjYiIHk9IjgzIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+RmFzdENvcHk8L3RleHQ+Cjwvc3ZnPg==", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJGIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxNmEzNGEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5GPC90ZXh0Pgo8L3N2Zz4="}, "crsbrands": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDUlMgQnJhbmRzIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNkYzI2MjYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5DUlMgQnJhbmRzPC90ZXh0Pgo8L3N2Zz4=", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNkYzI2MjYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5DPC90ZXh0Pgo8L3N2Zz4="}, "mhs": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJNSFMgVEVDIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5NSFMgVEVDPC90ZXh0Pgo8L3N2Zz4=", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJNIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5NPC90ZXh0Pgo8L3N2Zz4="}}};
            function log() { if ((BRAND_CONFIG.options || {}).debug === true && window.console) console.log.apply(console, ['[MeshBranding]'].concat(Array.prototype.slice.call(arguments))); }
            function normalizeHost(host) { return String(host || '').trim().toLowerCase().split(':')[0]; }
            function resolveBrand() {
                var host = normalizeHost(window.location.hostname);
                var domains = BRAND_CONFIG.domains || {};
                var brand = domains[host];
                var resolvedHost = host;
                if (!brand) { var clean = host.replace(/^www\./, ''); brand = domains[clean]; resolvedHost = clean; }
                if (!brand) { resolvedHost = BRAND_CONFIG.defaultBrand; brand = domains[BRAND_CONFIG.defaultBrand]; }
                if (!brand) { var keys = Object.keys(domains); resolvedHost = keys[0] || host; brand = domains[resolvedHost] || {}; }
                var key = brand.brandKey || 'aplicado';
                var embedded = (BRAND_CONFIG.embeddedLogos || {})[key] || (BRAND_CONFIG.embeddedLogos || {}).aplicado || {};
                return { host: resolvedHost, brand: brand, embedded: embedded };
            }
            function isIgnorableIcon(text) {
                return text.indexOf('icon-') >= 0 || text.indexOf('x16') >= 0 || text.indexOf('plugin24') >= 0 || text.indexOf('link4') >= 0 || text.indexOf('link6') >= 0 || text.indexOf('userimage.ashx') >= 0 || text.indexOf('user-256') >= 0 || text.indexOf('group-256') >= 0 || text.indexOf('mesh-256') >= 0;
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
                if (isIgnorableIcon(text)) return false;
                if (text.indexOf('serverpic.ashx') >= 0) return true;
                if (text.indexOf('loginpic.ashx') >= 0) return true;
                if (text.indexOf('titlepic.ashx') >= 0) return true;
                if (text.indexOf('mainmeshimage') >= 0) return true;
                if (text.indexOf('mainmesh') >= 0) return true;
                if (text.indexOf('loginlogo') >= 0) return true;
                if (text.indexOf('login-logo') >= 0) return true;
                if (text.indexOf('titlelogo') >= 0) return true;
                if (text.indexOf('title-logo') >= 0) return true;
                if (text.indexOf('/logo') >= 0 || text.indexOf('logo.') >= 0 || text.indexOf('-logo') >= 0 || text.indexOf('_logo') >= 0) return true;
                return false;
            }
            function ensureStyle() {
                if (document.getElementById('meshbranding-style')) return;
                var style=document.createElement('style');
                style.id='meshbranding-style';
                var hideNative = '';
                if ((BRAND_CONFIG.options || {}).hideNativeBrandingUntilApplied !== false) {
                    hideNative = 'img[src*="serverpic.ashx"]:not([data-meshbranding-replaced="1"]),img[src*="loginpic.ashx"]:not([data-meshbranding-replaced="1"]),img[src*="titlepic.ashx"]:not([data-meshbranding-replaced="1"]),img[id="MainMeshImage"]:not([data-meshbranding-replaced="1"]),img[src*="loginlogo"]:not([data-meshbranding-replaced="1"]),img[src*="logo"]:not([data-meshbranding-replaced="1"]):not(#meshbranding-masthead-logo){visibility:hidden!important;}';
                }
                style.textContent = hideNative +
                  '#masthead[data-meshbranding="1"]{position:relative!important;background-image:linear-gradient(90deg,var(--meshbranding-accent,#143a73),var(--meshbranding-primary,#2563eb))!important;background-color:var(--meshbranding-accent,#143a73)!important;background-repeat:no-repeat!important;}' +
                  '#meshbranding-masthead-logo{position:absolute!important;left:10px!important;top:4px!important;height:54px!important;width:auto!important;max-width:240px!important;z-index:99999!important;object-fit:contain!important;pointer-events:none!important;visibility:visible!important;}' +
                  'img[data-meshbranding-replaced="1"]{object-fit:contain!important;visibility:visible!important;}';
                document.head.appendChild(style);
            }
            function setFavicon(dataUri) {
                if (!dataUri || !document.head) return;
                var links = document.querySelectorAll("link[rel='icon'],link[rel='shortcut icon'],link[rel='apple-touch-icon']");
                for (var i=0;i<links.length;i++) { if (links[i].parentNode) links[i].parentNode.removeChild(links[i]); }
                var link = document.createElement('link'); link.rel='icon'; link.type='image/svg+xml'; link.href=dataUri; document.head.appendChild(link);
            }
            function replaceBrandingImages(brand, embedded) {
                if (!embedded.logoDataUri) return 0;
                var imgs = document.querySelectorAll('img');
                var count = 0;
                for (var i=0;i<imgs.length;i++) {
                    var img = imgs[i];
                    if (!looksLikeBrandingImage(img)) continue;
                    if (!img.getAttribute('data-meshbranding-original-src')) img.setAttribute('data-meshbranding-original-src', img.getAttribute('src') || '');
                    img.src = embedded.logoDataUri;
                    img.alt = brand.documentTitle || img.alt || 'MeshCentral';
                    img.setAttribute('data-meshbranding-replaced','1');
                    img.style.visibility = 'visible';
                    var w = img.width || img.naturalWidth || 0;
                    if (img.id === 'MainMeshImage' || w > 160) { img.style.maxHeight = img.style.maxHeight || '86px'; img.style.width = img.style.width || '260px'; img.style.height = 'auto'; }
                    count++;
                }
                return count;
            }
            function replaceBrandingBackgrounds(brand, embedded) {
                if (!embedded.logoDataUri) return 0;
                var nodes = [document.body].concat(Array.prototype.slice.call(document.querySelectorAll('div,span,a,td,header,section')));
                var count = 0;
                for (var i=0;i<nodes.length;i++) {
                    var el = nodes[i];
                    if (!el || !window.getComputedStyle) continue;
                    var bg = '';
                    try { bg = window.getComputedStyle(el).backgroundImage || ''; } catch(e) { bg=''; }
                    var bgl = String(bg).toLowerCase();
                    if (bgl.indexOf('serverpic') < 0 && bgl.indexOf('loginpic') < 0 && bgl.indexOf('titlepic') < 0 && bgl.indexOf('logo') < 0) continue;
                    if (isIgnorableIcon(bgl)) continue;
                    el.style.backgroundImage = 'url("' + embedded.logoDataUri + '")';
                    el.style.backgroundRepeat = 'no-repeat';
                    el.style.backgroundSize = 'contain';
                    el.setAttribute('data-meshbranding-bg','1');
                    count++;
                }
                return count;
            }
            function applyMastheadLogo(brand, embedded) {
                var masthead = document.getElementById('masthead');
                if (!masthead || !embedded.logoDataUri) return;
                var root = document.documentElement;
                if (brand.primaryColor) root.style.setProperty('--meshbranding-primary', brand.primaryColor);
                if (brand.accentColor) root.style.setProperty('--meshbranding-accent', brand.accentColor);
                masthead.setAttribute('data-meshbranding','1');
                masthead.style.backgroundImage = 'linear-gradient(90deg,' + (brand.accentColor || '#143a73') + ',' + (brand.primaryColor || '#2563eb') + ')';
                masthead.style.backgroundColor = brand.accentColor || '#143a73';
                var logo = document.getElementById('meshbranding-masthead-logo');
                if (!logo) {
                    logo = document.createElement('img');
                    logo.id = 'meshbranding-masthead-logo';
                    masthead.insertBefore(logo, masthead.firstChild);
                }
                logo.src = embedded.logoDataUri;
                logo.alt = brand.documentTitle || 'MeshCentral';
            }
            function applyBranding() {
                var resolved = resolveBrand();
                var brand = resolved.brand || {};
                var embedded = resolved.embedded || {};
                var opt = BRAND_CONFIG.options || {};
                window.__meshBrandingResolved = resolved;
                ensureStyle();
                if (opt.applyDocumentTitle !== false && brand.documentTitle) document.title = brand.documentTitle;
                if (opt.applyFavicon !== false) setFavicon(embedded.faviconDataUri || embedded.logoDataUri);
                if (opt.applyMastheadLogo !== false) applyMastheadLogo(brand, embedded);
                var imgCount = opt.replaceBrandingImages !== false ? replaceBrandingImages(brand, embedded) : 0;
                var bgCount = opt.replaceBrandingBackgrounds !== false ? replaceBrandingBackgrounds(brand, embedded) : 0;
                log('aplicado', resolved.host, 'imgs', imgCount, 'bgs', bgCount);
                // Intencionalmente NAO altera textos internos como #p6title h1: preserva "Meu Servidor".
            }
            window.meshBrandingApply = applyBranding;
            applyBranding();
            if (!window.__meshBrandingObserverStarted) {
                window.__meshBrandingObserverStarted = true;
                var pending=false;
                var observer=new MutationObserver(function() {
                    if (pending) return; pending=true;
                    setTimeout(function() { pending=false; applyBranding(); }, 80);
                });
                observer.observe(document.documentElement, {childList:true, subtree:true, attributes:true, attributeFilter:['src','style','class']});
            }
        })();
    };
    obj.goPageEnd = function() {
        (function() {
            'use strict';
            var BRAND_CONFIG = {"defaultBrand": "mesh.aplicado.com.br", "options": {"applyFavicon": true, "applyDocumentTitle": true, "applyMastheadLogo": true, "replaceBrandingImages": true, "replaceBrandingBackgrounds": true, "hideNativeBrandingUntilApplied": true, "preserveInternalTitles": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"brandKey": "aplicado", "documentTitle": "Acesso Remoto - Aplicado", "primaryColor": "#2563eb", "accentColor": "#143a73"}, "mesh.fastcopy.net.br": {"brandKey": "fastcopy", "documentTitle": "Acesso Remoto - FastCopy", "primaryColor": "#16a34a", "accentColor": "#052e16"}, "mesh.crsbrands.com.br": {"brandKey": "crsbrands", "documentTitle": "Acesso Remoto - CRS Brands", "primaryColor": "#dc2626", "accentColor": "#450a0a"}, "mesh.mhs.tec.br": {"brandKey": "mhs", "documentTitle": "Acesso Remoto - MHS TEC", "primaryColor": "#7c3aed", "accentColor": "#2e1065"}}, "embeddedLogos": {"aplicado": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJBcGxpY2FkbyI+CiAgPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeDI9IjEiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjU2M2ViIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjUyMCIgaGVpZ2h0PSIxNDAiIHJ4PSIyNCIgZmlsbD0idXJsKCNnKSIvPgogIDxjaXJjbGUgY3g9IjcyIiBjeT0iNzAiIHI9IjM4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LC4xOCkiLz4KICA8cGF0aCBkPSJNNTIgODggTDcyIDM0IEw5MiA4OCBaIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIuOTYiLz4KICA8dGV4dCB4PSIxMjYiIHk9IjgzIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+QXBsaWNhZG88L3RleHQ+Cjwvc3ZnPg==", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJBIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyNTYzZWIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5BPC90ZXh0Pgo8L3N2Zz4="}, "fastcopy": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJGYXN0Q29weSI+CiAgPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeDI9IjEiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMTZhMzRhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjUyMCIgaGVpZ2h0PSIxNDAiIHJ4PSIyNCIgZmlsbD0idXJsKCNnKSIvPgogIDxjaXJjbGUgY3g9IjcyIiBjeT0iNzAiIHI9IjM4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LC4xOCkiLz4KICA8cGF0aCBkPSJNNTIgODggTDcyIDM0IEw5MiA4OCBaIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIuOTYiLz4KICA8dGV4dCB4PSIxMjYiIHk9IjgzIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+RmFzdENvcHk8L3RleHQ+Cjwvc3ZnPg==", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJGIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxNmEzNGEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5GPC90ZXh0Pgo8L3N2Zz4="}, "crsbrands": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDUlMgQnJhbmRzIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNkYzI2MjYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5DUlMgQnJhbmRzPC90ZXh0Pgo8L3N2Zz4=", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNkYzI2MjYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5DPC90ZXh0Pgo8L3N2Zz4="}, "mhs": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJNSFMgVEVDIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5NSFMgVEVDPC90ZXh0Pgo8L3N2Zz4=", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJNIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5NPC90ZXh0Pgo8L3N2Zz4="}}};
            function log() { if ((BRAND_CONFIG.options || {}).debug === true && window.console) console.log.apply(console, ['[MeshBranding]'].concat(Array.prototype.slice.call(arguments))); }
            function normalizeHost(host) { return String(host || '').trim().toLowerCase().split(':')[0]; }
            function resolveBrand() {
                var host = normalizeHost(window.location.hostname);
                var domains = BRAND_CONFIG.domains || {};
                var brand = domains[host];
                var resolvedHost = host;
                if (!brand) { var clean = host.replace(/^www\./, ''); brand = domains[clean]; resolvedHost = clean; }
                if (!brand) { resolvedHost = BRAND_CONFIG.defaultBrand; brand = domains[BRAND_CONFIG.defaultBrand]; }
                if (!brand) { var keys = Object.keys(domains); resolvedHost = keys[0] || host; brand = domains[resolvedHost] || {}; }
                var key = brand.brandKey || 'aplicado';
                var embedded = (BRAND_CONFIG.embeddedLogos || {})[key] || (BRAND_CONFIG.embeddedLogos || {}).aplicado || {};
                return { host: resolvedHost, brand: brand, embedded: embedded };
            }
            function isIgnorableIcon(text) {
                return text.indexOf('icon-') >= 0 || text.indexOf('x16') >= 0 || text.indexOf('plugin24') >= 0 || text.indexOf('link4') >= 0 || text.indexOf('link6') >= 0 || text.indexOf('userimage.ashx') >= 0 || text.indexOf('user-256') >= 0 || text.indexOf('group-256') >= 0 || text.indexOf('mesh-256') >= 0;
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
                if (isIgnorableIcon(text)) return false;
                if (text.indexOf('serverpic.ashx') >= 0) return true;
                if (text.indexOf('loginpic.ashx') >= 0) return true;
                if (text.indexOf('titlepic.ashx') >= 0) return true;
                if (text.indexOf('mainmeshimage') >= 0) return true;
                if (text.indexOf('mainmesh') >= 0) return true;
                if (text.indexOf('loginlogo') >= 0) return true;
                if (text.indexOf('login-logo') >= 0) return true;
                if (text.indexOf('titlelogo') >= 0) return true;
                if (text.indexOf('title-logo') >= 0) return true;
                if (text.indexOf('/logo') >= 0 || text.indexOf('logo.') >= 0 || text.indexOf('-logo') >= 0 || text.indexOf('_logo') >= 0) return true;
                return false;
            }
            function ensureStyle() {
                if (document.getElementById('meshbranding-style')) return;
                var style=document.createElement('style');
                style.id='meshbranding-style';
                var hideNative = '';
                if ((BRAND_CONFIG.options || {}).hideNativeBrandingUntilApplied !== false) {
                    hideNative = 'img[src*="serverpic.ashx"]:not([data-meshbranding-replaced="1"]),img[src*="loginpic.ashx"]:not([data-meshbranding-replaced="1"]),img[src*="titlepic.ashx"]:not([data-meshbranding-replaced="1"]),img[id="MainMeshImage"]:not([data-meshbranding-replaced="1"]),img[src*="loginlogo"]:not([data-meshbranding-replaced="1"]),img[src*="logo"]:not([data-meshbranding-replaced="1"]):not(#meshbranding-masthead-logo){visibility:hidden!important;}';
                }
                style.textContent = hideNative +
                  '#masthead[data-meshbranding="1"]{position:relative!important;background-image:linear-gradient(90deg,var(--meshbranding-accent,#143a73),var(--meshbranding-primary,#2563eb))!important;background-color:var(--meshbranding-accent,#143a73)!important;background-repeat:no-repeat!important;}' +
                  '#meshbranding-masthead-logo{position:absolute!important;left:10px!important;top:4px!important;height:54px!important;width:auto!important;max-width:240px!important;z-index:99999!important;object-fit:contain!important;pointer-events:none!important;visibility:visible!important;}' +
                  'img[data-meshbranding-replaced="1"]{object-fit:contain!important;visibility:visible!important;}';
                document.head.appendChild(style);
            }
            function setFavicon(dataUri) {
                if (!dataUri || !document.head) return;
                var links = document.querySelectorAll("link[rel='icon'],link[rel='shortcut icon'],link[rel='apple-touch-icon']");
                for (var i=0;i<links.length;i++) { if (links[i].parentNode) links[i].parentNode.removeChild(links[i]); }
                var link = document.createElement('link'); link.rel='icon'; link.type='image/svg+xml'; link.href=dataUri; document.head.appendChild(link);
            }
            function replaceBrandingImages(brand, embedded) {
                if (!embedded.logoDataUri) return 0;
                var imgs = document.querySelectorAll('img');
                var count = 0;
                for (var i=0;i<imgs.length;i++) {
                    var img = imgs[i];
                    if (!looksLikeBrandingImage(img)) continue;
                    if (!img.getAttribute('data-meshbranding-original-src')) img.setAttribute('data-meshbranding-original-src', img.getAttribute('src') || '');
                    img.src = embedded.logoDataUri;
                    img.alt = brand.documentTitle || img.alt || 'MeshCentral';
                    img.setAttribute('data-meshbranding-replaced','1');
                    img.style.visibility = 'visible';
                    var w = img.width || img.naturalWidth || 0;
                    if (img.id === 'MainMeshImage' || w > 160) { img.style.maxHeight = img.style.maxHeight || '86px'; img.style.width = img.style.width || '260px'; img.style.height = 'auto'; }
                    count++;
                }
                return count;
            }
            function replaceBrandingBackgrounds(brand, embedded) {
                if (!embedded.logoDataUri) return 0;
                var nodes = [document.body].concat(Array.prototype.slice.call(document.querySelectorAll('div,span,a,td,header,section')));
                var count = 0;
                for (var i=0;i<nodes.length;i++) {
                    var el = nodes[i];
                    if (!el || !window.getComputedStyle) continue;
                    var bg = '';
                    try { bg = window.getComputedStyle(el).backgroundImage || ''; } catch(e) { bg=''; }
                    var bgl = String(bg).toLowerCase();
                    if (bgl.indexOf('serverpic') < 0 && bgl.indexOf('loginpic') < 0 && bgl.indexOf('titlepic') < 0 && bgl.indexOf('logo') < 0) continue;
                    if (isIgnorableIcon(bgl)) continue;
                    el.style.backgroundImage = 'url("' + embedded.logoDataUri + '")';
                    el.style.backgroundRepeat = 'no-repeat';
                    el.style.backgroundSize = 'contain';
                    el.setAttribute('data-meshbranding-bg','1');
                    count++;
                }
                return count;
            }
            function applyMastheadLogo(brand, embedded) {
                var masthead = document.getElementById('masthead');
                if (!masthead || !embedded.logoDataUri) return;
                var root = document.documentElement;
                if (brand.primaryColor) root.style.setProperty('--meshbranding-primary', brand.primaryColor);
                if (brand.accentColor) root.style.setProperty('--meshbranding-accent', brand.accentColor);
                masthead.setAttribute('data-meshbranding','1');
                masthead.style.backgroundImage = 'linear-gradient(90deg,' + (brand.accentColor || '#143a73') + ',' + (brand.primaryColor || '#2563eb') + ')';
                masthead.style.backgroundColor = brand.accentColor || '#143a73';
                var logo = document.getElementById('meshbranding-masthead-logo');
                if (!logo) {
                    logo = document.createElement('img');
                    logo.id = 'meshbranding-masthead-logo';
                    masthead.insertBefore(logo, masthead.firstChild);
                }
                logo.src = embedded.logoDataUri;
                logo.alt = brand.documentTitle || 'MeshCentral';
            }
            function applyBranding() {
                var resolved = resolveBrand();
                var brand = resolved.brand || {};
                var embedded = resolved.embedded || {};
                var opt = BRAND_CONFIG.options || {};
                window.__meshBrandingResolved = resolved;
                ensureStyle();
                if (opt.applyDocumentTitle !== false && brand.documentTitle) document.title = brand.documentTitle;
                if (opt.applyFavicon !== false) setFavicon(embedded.faviconDataUri || embedded.logoDataUri);
                if (opt.applyMastheadLogo !== false) applyMastheadLogo(brand, embedded);
                var imgCount = opt.replaceBrandingImages !== false ? replaceBrandingImages(brand, embedded) : 0;
                var bgCount = opt.replaceBrandingBackgrounds !== false ? replaceBrandingBackgrounds(brand, embedded) : 0;
                log('aplicado', resolved.host, 'imgs', imgCount, 'bgs', bgCount);
                // Intencionalmente NAO altera textos internos como #p6title h1: preserva "Meu Servidor".
            }
            window.meshBrandingApply = applyBranding;
            applyBranding();
            if (!window.__meshBrandingObserverStarted) {
                window.__meshBrandingObserverStarted = true;
                var pending=false;
                var observer=new MutationObserver(function() {
                    if (pending) return; pending=true;
                    setTimeout(function() { pending=false; applyBranding(); }, 80);
                });
                observer.observe(document.documentElement, {childList:true, subtree:true, attributes:true, attributeFilter:['src','style','class']});
            }
        })();
    };
    return obj;
};
