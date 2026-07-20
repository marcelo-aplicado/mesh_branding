/**
 * MeshCentral Mesh Branding v1.0.4
 * Altera favicon, document.title, titulo do painel e logo do masthead (#masthead).
 * SVGs ficam embutidos como data URI para evitar 404 em /plugins.
 */
module.exports.mesh_branding = function(parent) {
    var obj = {};
    obj.parent = parent;
    obj.exports = [ 'onWebUIStartupEnd', 'goPageEnd' ];
    obj.onWebUIStartupEnd = function() {
        (function() {
            'use strict';
            var BRAND_CONFIG = {"defaultBrand": "mesh.aplicado.com.br", "options": {"applyFavicon": true, "applyDocumentTitle": true, "applyMastheadLogo": true, "applyMainTitle": true, "applyMainCardLogo": false, "debug": false}, "domains": {"mesh.aplicado.com.br": {"brandKey": "aplicado", "documentTitle": "Acesso Remoto - Aplicado", "mainTitle": "Aplicado", "primaryColor": "#2563eb", "accentColor": "#143a73"}, "mesh.fastcopy.net.br": {"brandKey": "fastcopy", "documentTitle": "Acesso Remoto - FastCopy", "mainTitle": "FastCopy", "primaryColor": "#16a34a", "accentColor": "#052e16"}, "mesh.crsbrands.com.br": {"brandKey": "crsbrands", "documentTitle": "Acesso Remoto - CRS Brands", "mainTitle": "CRS Brands", "primaryColor": "#dc2626", "accentColor": "#450a0a"}, "mesh.mhs.tec.br": {"brandKey": "mhs", "documentTitle": "Acesso Remoto - MHS TEC", "mainTitle": "MHS TEC", "primaryColor": "#7c3aed", "accentColor": "#2e1065"}}, "embeddedLogos": {"aplicado": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJBcGxpY2FkbyI+CiAgPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeDI9IjEiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjU2M2ViIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjUyMCIgaGVpZ2h0PSIxNDAiIHJ4PSIyNCIgZmlsbD0idXJsKCNnKSIvPgogIDxjaXJjbGUgY3g9IjcyIiBjeT0iNzAiIHI9IjM4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LC4xOCkiLz4KICA8cGF0aCBkPSJNNTIgODggTDcyIDM0IEw5MiA4OCBaIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIuOTYiLz4KICA8dGV4dCB4PSIxMjYiIHk9IjgzIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+QXBsaWNhZG88L3RleHQ+Cjwvc3ZnPg==", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJBIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyNTYzZWIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5BPC90ZXh0Pgo8L3N2Zz4="}, "fastcopy": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJGYXN0Q29weSI+CiAgPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeDI9IjEiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMTZhMzRhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjUyMCIgaGVpZ2h0PSIxNDAiIHJ4PSIyNCIgZmlsbD0idXJsKCNnKSIvPgogIDxjaXJjbGUgY3g9IjcyIiBjeT0iNzAiIHI9IjM4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LC4xOCkiLz4KICA8cGF0aCBkPSJNNTIgODggTDcyIDM0IEw5MiA4OCBaIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIuOTYiLz4KICA8dGV4dCB4PSIxMjYiIHk9IjgzIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+RmFzdENvcHk8L3RleHQ+Cjwvc3ZnPg==", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJGIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxNmEzNGEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5GPC90ZXh0Pgo8L3N2Zz4="}, "crsbrands": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDUlMgQnJhbmRzIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNkYzI2MjYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5DUlMgQnJhbmRzPC90ZXh0Pgo8L3N2Zz4=", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNkYzI2MjYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5DPC90ZXh0Pgo8L3N2Zz4="}, "mhs": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJNSFMgVEVDIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5NSFMgVEVDPC90ZXh0Pgo8L3N2Zz4=", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJNIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5NPC90ZXh0Pgo8L3N2Zz4="}}};
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
            function setFavicon(dataUri) {
                if (!dataUri || !document.head) return;
                var links = document.querySelectorAll("link[rel='icon'],link[rel='shortcut icon'],link[rel='apple-touch-icon']");
                for (var i=0;i<links.length;i++) { if (links[i].parentNode) links[i].parentNode.removeChild(links[i]); }
                var link = document.createElement('link'); link.rel='icon'; link.type='image/svg+xml'; link.href=dataUri; document.head.appendChild(link);
            }
            function ensureStyle() {
                if (document.getElementById('meshbranding-style')) return;
                var style=document.createElement('style');
                style.id='meshbranding-style';
                style.textContent = '' +
                  '#masthead[data-meshbranding="1"]{position:relative!important;background-image:linear-gradient(90deg,var(--meshbranding-accent,#143a73),var(--meshbranding-primary,#2563eb))!important;background-color:var(--meshbranding-accent,#143a73)!important;background-repeat:no-repeat!important;}' +
                  '#meshbranding-masthead-logo{position:absolute!important;left:10px!important;top:4px!important;height:54px!important;width:auto!important;max-width:240px!important;z-index:99999!important;object-fit:contain!important;pointer-events:none!important;}' +
                  '#p6title[data-meshbranding="1"] h1{color:var(--meshbranding-accent,#143a73)!important;}';
                document.head.appendChild(style);
            }
            function applyMastheadLogo(brand, embedded) {
                var masthead = document.getElementById('masthead');
                if (!masthead || !embedded.logoDataUri) return;
                var root = document.documentElement;
                if (brand.primaryColor) root.style.setProperty('--meshbranding-primary', brand.primaryColor);
                if (brand.accentColor) root.style.setProperty('--meshbranding-accent', brand.accentColor);
                masthead.setAttribute('data-meshbranding','1');
                // Remove imagem de fundo nativa contendo logo fixo, mantendo fundo por CSS do plugin.
                masthead.style.backgroundImage = 'linear-gradient(90deg,' + (brand.accentColor || '#143a73') + ',' + (brand.primaryColor || '#2563eb') + ')';
                masthead.style.backgroundColor = brand.accentColor || '#143a73';
                var logo = document.getElementById('meshbranding-masthead-logo');
                if (!logo) {
                    logo = document.createElement('img');
                    logo.id = 'meshbranding-masthead-logo';
                    masthead.insertBefore(logo, masthead.firstChild);
                }
                logo.src = embedded.logoDataUri;
                logo.alt = brand.mainTitle || brand.documentTitle || 'MeshCentral';
            }
            function applyMainTitle(brand) {
                var title = document.querySelector('#p6title h1');
                if (title && brand.mainTitle) title.innerText = brand.mainTitle;
                var wrap = document.getElementById('p6title');
                if (wrap) wrap.setAttribute('data-meshbranding','1');
            }
            function applyMainCardLogo(brand, embedded) {
                var img = document.getElementById('MainMeshImage');
                if (img && embedded.logoDataUri) { img.src = embedded.logoDataUri; img.alt = brand.mainTitle || 'MeshCentral'; }
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
                if (opt.applyMainTitle !== false) applyMainTitle(brand);
                if (opt.applyMainCardLogo === true) applyMainCardLogo(brand, embedded);
            }
            window.meshBrandingApply = applyBranding;
            applyBranding();
            if (!window.__meshBrandingObserverStarted) {
                window.__meshBrandingObserverStarted = true;
                var pending=false;
                var observer=new MutationObserver(function() {
                    if (pending) return; pending=true;
                    setTimeout(function() { pending=false; applyBranding(); }, 100);
                });
                observer.observe(document.documentElement, {childList:true, subtree:true});
            }
        })();
    };
    obj.goPageEnd = function() {
        (function() {
            'use strict';
            var BRAND_CONFIG = {"defaultBrand": "mesh.aplicado.com.br", "options": {"applyFavicon": true, "applyDocumentTitle": true, "applyMastheadLogo": true, "applyMainTitle": true, "applyMainCardLogo": false, "debug": false}, "domains": {"mesh.aplicado.com.br": {"brandKey": "aplicado", "documentTitle": "Acesso Remoto - Aplicado", "mainTitle": "Aplicado", "primaryColor": "#2563eb", "accentColor": "#143a73"}, "mesh.fastcopy.net.br": {"brandKey": "fastcopy", "documentTitle": "Acesso Remoto - FastCopy", "mainTitle": "FastCopy", "primaryColor": "#16a34a", "accentColor": "#052e16"}, "mesh.crsbrands.com.br": {"brandKey": "crsbrands", "documentTitle": "Acesso Remoto - CRS Brands", "mainTitle": "CRS Brands", "primaryColor": "#dc2626", "accentColor": "#450a0a"}, "mesh.mhs.tec.br": {"brandKey": "mhs", "documentTitle": "Acesso Remoto - MHS TEC", "mainTitle": "MHS TEC", "primaryColor": "#7c3aed", "accentColor": "#2e1065"}}, "embeddedLogos": {"aplicado": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJBcGxpY2FkbyI+CiAgPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeDI9IjEiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjU2M2ViIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjUyMCIgaGVpZ2h0PSIxNDAiIHJ4PSIyNCIgZmlsbD0idXJsKCNnKSIvPgogIDxjaXJjbGUgY3g9IjcyIiBjeT0iNzAiIHI9IjM4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LC4xOCkiLz4KICA8cGF0aCBkPSJNNTIgODggTDcyIDM0IEw5MiA4OCBaIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIuOTYiLz4KICA8dGV4dCB4PSIxMjYiIHk9IjgzIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+QXBsaWNhZG88L3RleHQ+Cjwvc3ZnPg==", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJBIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyNTYzZWIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5BPC90ZXh0Pgo8L3N2Zz4="}, "fastcopy": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJGYXN0Q29weSI+CiAgPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeDI9IjEiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMTZhMzRhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjUyMCIgaGVpZ2h0PSIxNDAiIHJ4PSIyNCIgZmlsbD0idXJsKCNnKSIvPgogIDxjaXJjbGUgY3g9IjcyIiBjeT0iNzAiIHI9IjM4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LC4xOCkiLz4KICA8cGF0aCBkPSJNNTIgODggTDcyIDM0IEw5MiA4OCBaIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIuOTYiLz4KICA8dGV4dCB4PSIxMjYiIHk9IjgzIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+RmFzdENvcHk8L3RleHQ+Cjwvc3ZnPg==", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJGIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxNmEzNGEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5GPC90ZXh0Pgo8L3N2Zz4="}, "crsbrands": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDUlMgQnJhbmRzIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNkYzI2MjYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5DUlMgQnJhbmRzPC90ZXh0Pgo8L3N2Zz4=", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNkYzI2MjYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5DPC90ZXh0Pgo8L3N2Zz4="}, "mhs": {"logoDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJNSFMgVEVDIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5NSFMgVEVDPC90ZXh0Pgo8L3N2Zz4=", "faviconDataUri": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iMTQwIiB2aWV3Qm94PSIwIDAgNTIwIDE0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJNIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTIwIiBoZWlnaHQ9IjE0MCIgcng9IjI0IiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNzIiIGN5PSI3MCIgcj0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsLjE4KSIvPgogIDxwYXRoIGQ9Ik01MiA4OCBMNzIgMzQgTDkyIDg4IFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9Ii45NiIvPgogIDx0ZXh0IHg9IjEyNiIgeT0iODMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5NPC90ZXh0Pgo8L3N2Zz4="}}};
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
            function setFavicon(dataUri) {
                if (!dataUri || !document.head) return;
                var links = document.querySelectorAll("link[rel='icon'],link[rel='shortcut icon'],link[rel='apple-touch-icon']");
                for (var i=0;i<links.length;i++) { if (links[i].parentNode) links[i].parentNode.removeChild(links[i]); }
                var link = document.createElement('link'); link.rel='icon'; link.type='image/svg+xml'; link.href=dataUri; document.head.appendChild(link);
            }
            function ensureStyle() {
                if (document.getElementById('meshbranding-style')) return;
                var style=document.createElement('style');
                style.id='meshbranding-style';
                style.textContent = '' +
                  '#masthead[data-meshbranding="1"]{position:relative!important;background-image:linear-gradient(90deg,var(--meshbranding-accent,#143a73),var(--meshbranding-primary,#2563eb))!important;background-color:var(--meshbranding-accent,#143a73)!important;background-repeat:no-repeat!important;}' +
                  '#meshbranding-masthead-logo{position:absolute!important;left:10px!important;top:4px!important;height:54px!important;width:auto!important;max-width:240px!important;z-index:99999!important;object-fit:contain!important;pointer-events:none!important;}' +
                  '#p6title[data-meshbranding="1"] h1{color:var(--meshbranding-accent,#143a73)!important;}';
                document.head.appendChild(style);
            }
            function applyMastheadLogo(brand, embedded) {
                var masthead = document.getElementById('masthead');
                if (!masthead || !embedded.logoDataUri) return;
                var root = document.documentElement;
                if (brand.primaryColor) root.style.setProperty('--meshbranding-primary', brand.primaryColor);
                if (brand.accentColor) root.style.setProperty('--meshbranding-accent', brand.accentColor);
                masthead.setAttribute('data-meshbranding','1');
                // Remove imagem de fundo nativa contendo logo fixo, mantendo fundo por CSS do plugin.
                masthead.style.backgroundImage = 'linear-gradient(90deg,' + (brand.accentColor || '#143a73') + ',' + (brand.primaryColor || '#2563eb') + ')';
                masthead.style.backgroundColor = brand.accentColor || '#143a73';
                var logo = document.getElementById('meshbranding-masthead-logo');
                if (!logo) {
                    logo = document.createElement('img');
                    logo.id = 'meshbranding-masthead-logo';
                    masthead.insertBefore(logo, masthead.firstChild);
                }
                logo.src = embedded.logoDataUri;
                logo.alt = brand.mainTitle || brand.documentTitle || 'MeshCentral';
            }
            function applyMainTitle(brand) {
                var title = document.querySelector('#p6title h1');
                if (title && brand.mainTitle) title.innerText = brand.mainTitle;
                var wrap = document.getElementById('p6title');
                if (wrap) wrap.setAttribute('data-meshbranding','1');
            }
            function applyMainCardLogo(brand, embedded) {
                var img = document.getElementById('MainMeshImage');
                if (img && embedded.logoDataUri) { img.src = embedded.logoDataUri; img.alt = brand.mainTitle || 'MeshCentral'; }
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
                if (opt.applyMainTitle !== false) applyMainTitle(brand);
                if (opt.applyMainCardLogo === true) applyMainCardLogo(brand, embedded);
            }
            window.meshBrandingApply = applyBranding;
            applyBranding();
            if (!window.__meshBrandingObserverStarted) {
                window.__meshBrandingObserverStarted = true;
                var pending=false;
                var observer=new MutationObserver(function() {
                    if (pending) return; pending=true;
                    setTimeout(function() { pending=false; applyBranding(); }, 100);
                });
                observer.observe(document.documentElement, {childList:true, subtree:true});
            }
        })();
    };
    return obj;
};
