/**
 * MeshCentral Mesh Branding v1.0.3
 * Branding por subdominio com logos SVG embutidos como data URI.
 * Corrige 404 em /plugins/mesh_branding/assets/... no MeshCentral 1.2.1.
 */
module.exports.mesh_branding = function(parent) {
    var obj = {};
    obj.parent = parent;
    obj.exports = [ 'onWebUIStartupEnd', 'goPageEnd' ];

    obj.onWebUIStartupEnd = function() {
        (function() {
            'use strict';
            var BRAND_CONFIG = {"defaultBrand": "mesh.aplicado.com.br", "options": {"applyFavicon": true, "applyDocumentTitle": true, "applyMainMeshImage": true, "applyMainTitle": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"brandKey": "aplicado", "documentTitle": "Acesso Remoto - Aplicado", "mainTitle": "Aplicado", "primaryColor": "#2563eb", "accentColor": "#0f172a"}, "mesh.fastcopy.net.br": {"brandKey": "fastcopy", "documentTitle": "Acesso Remoto - FastCopy", "mainTitle": "FastCopy", "primaryColor": "#16a34a", "accentColor": "#052e16"}, "mesh.crsbrands.com.br": {"brandKey": "crsbrands", "documentTitle": "Acesso Remoto - CRS Brands", "mainTitle": "CRS Brands", "primaryColor": "#dc2626", "accentColor": "#450a0a"}, "mesh.mhs.tec.br": {"brandKey": "mhs", "documentTitle": "Acesso Remoto - MHS TEC", "mainTitle": "MHS TEC", "primaryColor": "#7c3aed", "accentColor": "#2e1065"}}, "embeddedLogos": {"aplicado": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJBcGxpY2FkbyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjU2M2ViIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzExMTgyNyIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjUyMCIgaGVpZ2h0PSIxNDAiIHJ4PSIyNCIgZmlsbD0idXJsKCNnKSIvPgogIDxjaXJjbGUgY3g9IjcyIiBjeT0iNzAiIHI9IjM4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LC4xOCkiLz4KICA8cGF0aCBkPSJNNTIgODggTDcyIDM0IEw5MiA4OCBaIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIuOTYiLz4KICA8dGV4dCB4PSIxMjYiIHk9IjgzIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+QXBsaWNhZG88L3RleHQ+Cjwvc3ZnPg==", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJBIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHgyPSIxIiB5MT0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyNTYzZWIiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5BPC90ZXh0Pgo8L3N2Zz4="}, "fastcopy": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJGYXN0Q29weSI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMTZhMzRhIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzExMTgyNyIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjUyMCIgaGVpZ2h0PSIxNDAiIHJ4PSIyNCIgZmlsbD0idXJsKCNnKSIvPgogIDxjaXJjbGUgY3g9IjcyIiBjeT0iNzAiIHI9IjM4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LC4xOCkiLz4KICA8cGF0aCBkPSJNNTIgODggTDcyIDM0IEw5MiA4OCBaIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIuOTYiLz4KICA8dGV4dCB4PSIxMjYiIHk9IjgzIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+RmFzdENvcHk8L3RleHQ+Cjwvc3ZnPg==", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJGIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHgyPSIxIiB5MT0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxNmEzNGEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5GPC90ZXh0Pgo8L3N2Zz4="}, "crsbrands": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDUlMgQnJhbmRzIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHgyPSIxIiB5MT0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNkYzI2MjYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5DUlMgQnJhbmRzPC90ZXh0Pgo8L3N2Zz4=", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHgyPSIxIiB5MT0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNkYzI2MjYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5DPC90ZXh0Pgo8L3N2Zz4="}, "mhs": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJNSFMgVEVDIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHgyPSIxIiB5MT0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5NSFMgVEVDPC90ZXh0Pgo8L3N2Zz4=", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJNIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHgyPSIxIiB5MT0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5NPC90ZXh0Pgo8L3N2Zz4="}}};

            function normalizeHost(host) {
                return String(host || '').trim().toLowerCase().split(':')[0];
            }

            function resolveBrand() {
                var host = normalizeHost(window.location.hostname);
                var domains = BRAND_CONFIG.domains || {};
                var resolvedHost = host;
                var brand = domains[host];
                if (!brand) {
                    var clean = host.replace(/^www\./, '');
                    brand = domains[clean];
                    resolvedHost = clean;
                }
                if (!brand) {
                    resolvedHost = BRAND_CONFIG.defaultBrand;
                    brand = domains[BRAND_CONFIG.defaultBrand];
                }
                if (!brand) {
                    var keys = Object.keys(domains);
                    resolvedHost = keys.length ? keys[0] : host;
                    brand = keys.length ? domains[keys[0]] : {};
                }
                var key = brand.brandKey || 'aplicado';
                var embedded = (BRAND_CONFIG.embeddedLogos || {})[key] || (BRAND_CONFIG.embeddedLogos || {}).aplicado || {};
                return { host: resolvedHost, brand: brand, embedded: embedded };
            }

            function setFavicon(dataUri) {
                if (!dataUri || !document.head) return;
                var links = document.querySelectorAll("link[rel='icon'],link[rel='shortcut icon'],link[rel='apple-touch-icon']");
                for (var i = 0; i < links.length; i++) { links[i].parentNode.removeChild(links[i]); }
                var link = document.createElement('link');
                link.rel = 'icon';
                link.type = 'image/svg+xml';
                link.href = dataUri;
                document.head.appendChild(link);
            }

            function setStyle(brand) {
                var root = document.documentElement;
                if (brand.primaryColor) root.style.setProperty('--meshbranding-primary', brand.primaryColor);
                if (brand.accentColor) root.style.setProperty('--meshbranding-accent', brand.accentColor);
                var style = document.getElementById('meshbranding-style');
                if (!style) {
                    style = document.createElement('style');
                    style.id = 'meshbranding-style';
                    style.textContent = '' +
                        '#p6title[data-meshbranding="1"]{display:flex!important;align-items:center!important;gap:14px!important;}' +
                        '#MainMeshImage[data-meshbranding="1"]{width:260px!important;height:auto!important;max-height:86px!important;object-fit:contain!important;}' +
                        '#p6title[data-meshbranding="1"] h1{color:var(--meshbranding-accent,#0f172a)!important;margin-left:0!important;}';
                    document.head.appendChild(style);
                }
            }

            function applyBranding() {
                var resolved = resolveBrand();
                var brand = resolved.brand || {};
                var embedded = resolved.embedded || {};
                var options = BRAND_CONFIG.options || {};

                window.__meshBrandingResolved = resolved;

                if (options.applyDocumentTitle !== false && brand.documentTitle) {
                    document.title = brand.documentTitle;
                }

                if (options.applyFavicon !== false) {
                    setFavicon(embedded.faviconDataUri || embedded.logoDataUri);
                }

                setStyle(brand);

                if (options.applyMainMeshImage !== false) {
                    var img = document.getElementById('MainMeshImage');
                    if (img && embedded.logoDataUri) {
                        img.src = embedded.logoDataUri;
                        img.alt = brand.mainTitle || brand.documentTitle || 'MeshCentral';
                        img.setAttribute('data-meshbranding', '1');
                    }
                }

                if (options.applyMainTitle !== false && brand.mainTitle) {
                    var title = document.querySelector('#p6title h1');
                    if (title) { title.innerText = brand.mainTitle; }
                }

                var wrap = document.getElementById('p6title');
                if (wrap) { wrap.setAttribute('data-meshbranding', '1'); }
            }

            window.meshBrandingApply = applyBranding;
            applyBranding();

            if (!window.__meshBrandingObserverStarted) {
                window.__meshBrandingObserverStarted = true;
                var pending = false;
                var observer = new MutationObserver(function() {
                    if (pending) return;
                    pending = true;
                    setTimeout(function() { pending = false; applyBranding(); }, 50);
                });
                observer.observe(document.documentElement, { childList: true, subtree: true });
            }
        })();
    };

    obj.goPageEnd = function() {
        (function() {
            'use strict';
            var BRAND_CONFIG = {"defaultBrand": "mesh.aplicado.com.br", "options": {"applyFavicon": true, "applyDocumentTitle": true, "applyMainMeshImage": true, "applyMainTitle": true, "debug": false}, "domains": {"mesh.aplicado.com.br": {"brandKey": "aplicado", "documentTitle": "Acesso Remoto - Aplicado", "mainTitle": "Aplicado", "primaryColor": "#2563eb", "accentColor": "#0f172a"}, "mesh.fastcopy.net.br": {"brandKey": "fastcopy", "documentTitle": "Acesso Remoto - FastCopy", "mainTitle": "FastCopy", "primaryColor": "#16a34a", "accentColor": "#052e16"}, "mesh.crsbrands.com.br": {"brandKey": "crsbrands", "documentTitle": "Acesso Remoto - CRS Brands", "mainTitle": "CRS Brands", "primaryColor": "#dc2626", "accentColor": "#450a0a"}, "mesh.mhs.tec.br": {"brandKey": "mhs", "documentTitle": "Acesso Remoto - MHS TEC", "mainTitle": "MHS TEC", "primaryColor": "#7c3aed", "accentColor": "#2e1065"}}, "embeddedLogos": {"aplicado": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJBcGxpY2FkbyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjU2M2ViIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzExMTgyNyIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjUyMCIgaGVpZ2h0PSIxNDAiIHJ4PSIyNCIgZmlsbD0idXJsKCNnKSIvPgogIDxjaXJjbGUgY3g9IjcyIiBjeT0iNzAiIHI9IjM4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LC4xOCkiLz4KICA8cGF0aCBkPSJNNTIgODggTDcyIDM0IEw5MiA4OCBaIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIuOTYiLz4KICA8dGV4dCB4PSIxMjYiIHk9IjgzIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+QXBsaWNhZG88L3RleHQ+Cjwvc3ZnPg==", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJBIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHgyPSIxIiB5MT0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyNTYzZWIiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5BPC90ZXh0Pgo8L3N2Zz4="}, "fastcopy": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJGYXN0Q29weSI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMTZhMzRhIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzExMTgyNyIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjUyMCIgaGVpZ2h0PSIxNDAiIHJ4PSIyNCIgZmlsbD0idXJsKCNnKSIvPgogIDxjaXJjbGUgY3g9IjcyIiBjeT0iNzAiIHI9IjM4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LC4xOCkiLz4KICA8cGF0aCBkPSJNNTIgODggTDcyIDM0IEw5MiA4OCBaIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIuOTYiLz4KICA8dGV4dCB4PSIxMjYiIHk9IjgzIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+RmFzdENvcHk8L3RleHQ+Cjwvc3ZnPg==", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJGIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHgyPSIxIiB5MT0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxNmEzNGEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5GPC90ZXh0Pgo8L3N2Zz4="}, "crsbrands": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDUlMgQnJhbmRzIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHgyPSIxIiB5MT0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNkYzI2MjYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5DUlMgQnJhbmRzPC90ZXh0Pgo8L3N2Zz4=", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHgyPSIxIiB5MT0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNkYzI2MjYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5DPC90ZXh0Pgo8L3N2Zz4="}, "mhs": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJNSFMgVEVDIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHgyPSIxIiB5MT0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5NSFMgVEVDPC90ZXh0Pgo8L3N2Zz4=", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJNIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHgyPSIxIiB5MT0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5NPC90ZXh0Pgo8L3N2Zz4="}}};

            function normalizeHost(host) {
                return String(host || '').trim().toLowerCase().split(':')[0];
            }

            function resolveBrand() {
                var host = normalizeHost(window.location.hostname);
                var domains = BRAND_CONFIG.domains || {};
                var resolvedHost = host;
                var brand = domains[host];
                if (!brand) {
                    var clean = host.replace(/^www\./, '');
                    brand = domains[clean];
                    resolvedHost = clean;
                }
                if (!brand) {
                    resolvedHost = BRAND_CONFIG.defaultBrand;
                    brand = domains[BRAND_CONFIG.defaultBrand];
                }
                if (!brand) {
                    var keys = Object.keys(domains);
                    resolvedHost = keys.length ? keys[0] : host;
                    brand = keys.length ? domains[keys[0]] : {};
                }
                var key = brand.brandKey || 'aplicado';
                var embedded = (BRAND_CONFIG.embeddedLogos || {})[key] || (BRAND_CONFIG.embeddedLogos || {}).aplicado || {};
                return { host: resolvedHost, brand: brand, embedded: embedded };
            }

            function setFavicon(dataUri) {
                if (!dataUri || !document.head) return;
                var links = document.querySelectorAll("link[rel='icon'],link[rel='shortcut icon'],link[rel='apple-touch-icon']");
                for (var i = 0; i < links.length; i++) { links[i].parentNode.removeChild(links[i]); }
                var link = document.createElement('link');
                link.rel = 'icon';
                link.type = 'image/svg+xml';
                link.href = dataUri;
                document.head.appendChild(link);
            }

            function setStyle(brand) {
                var root = document.documentElement;
                if (brand.primaryColor) root.style.setProperty('--meshbranding-primary', brand.primaryColor);
                if (brand.accentColor) root.style.setProperty('--meshbranding-accent', brand.accentColor);
                var style = document.getElementById('meshbranding-style');
                if (!style) {
                    style = document.createElement('style');
                    style.id = 'meshbranding-style';
                    style.textContent = '' +
                        '#p6title[data-meshbranding="1"]{display:flex!important;align-items:center!important;gap:14px!important;}' +
                        '#MainMeshImage[data-meshbranding="1"]{width:260px!important;height:auto!important;max-height:86px!important;object-fit:contain!important;}' +
                        '#p6title[data-meshbranding="1"] h1{color:var(--meshbranding-accent,#0f172a)!important;margin-left:0!important;}';
                    document.head.appendChild(style);
                }
            }

            function applyBranding() {
                var resolved = resolveBrand();
                var brand = resolved.brand || {};
                var embedded = resolved.embedded || {};
                var options = BRAND_CONFIG.options || {};

                window.__meshBrandingResolved = resolved;

                if (options.applyDocumentTitle !== false && brand.documentTitle) {
                    document.title = brand.documentTitle;
                }

                if (options.applyFavicon !== false) {
                    setFavicon(embedded.faviconDataUri || embedded.logoDataUri);
                }

                setStyle(brand);

                if (options.applyMainMeshImage !== false) {
                    var img = document.getElementById('MainMeshImage');
                    if (img && embedded.logoDataUri) {
                        img.src = embedded.logoDataUri;
                        img.alt = brand.mainTitle || brand.documentTitle || 'MeshCentral';
                        img.setAttribute('data-meshbranding', '1');
                    }
                }

                if (options.applyMainTitle !== false && brand.mainTitle) {
                    var title = document.querySelector('#p6title h1');
                    if (title) { title.innerText = brand.mainTitle; }
                }

                var wrap = document.getElementById('p6title');
                if (wrap) { wrap.setAttribute('data-meshbranding', '1'); }
            }

            window.meshBrandingApply = applyBranding;
            applyBranding();

            if (!window.__meshBrandingObserverStarted) {
                window.__meshBrandingObserverStarted = true;
                var pending = false;
                var observer = new MutationObserver(function() {
                    if (pending) return;
                    pending = true;
                    setTimeout(function() { pending = false; applyBranding(); }, 50);
                });
                observer.observe(document.documentElement, { childList: true, subtree: true });
            }
        })();
    };

    return obj;
};
