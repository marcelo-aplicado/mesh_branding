# Changelog

## 4.0.6

- Alterado o diretório de leitura dos logos para a pasta do plugin: `meshcentral-data/plugins/mesh_branding`.
- `Aplicado_Logo.png` e `Aplicado_Logo_Custom.png` agora devem ficar dentro da pasta do plugin.
- Mantida interceptação de `/loginlogo.png` e `/logo.png`.
- Mantido fallback por `Aplicado_Logo.png`.
- Adicionado header `X-Mesh-Branding-Root` para diagnóstico.

## 4.0.5

- Intercepta `/logo.png`, usado como background do `#masthead` após login.
