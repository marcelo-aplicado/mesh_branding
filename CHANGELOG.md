# Changelog

## 4.0.0

- Criada rota HTTP interna no MeshCentral: `/mesh_branding/logo.png`.
- Rota também responde em `/mesh_branding/logo` para compatibilidade.
- Backend seleciona o logo pelo host da requisição.
- Fallback automático para `Aplicado_Logo.png`.
- Frontend não cria mais URLs com `host=`; usa apenas `/mesh_branding/logo.png`.
- Mantém background, cores e `Meu Servidor` intactos.
- Adicionados cabeçalhos `X-Mesh-Branding-Host` e `X-Mesh-Branding-File` para diagnóstico.

## 3.0.2

- Logos diretamente em `meshcentral-data` sem subpasta.
