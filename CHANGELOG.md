# Changelog

## 4.0.7

- Logos customizados passam a ficar na pasta do plugin: `meshcentral-data/plugins/mesh_branding`.
- O logo padrão `Aplicado_Logo.png` volta a ficar no diretório base `meshcentral-data`.
- Mantida interceptação de `/loginlogo.png` e `/logo.png`.
- Fallback agora usa `meshcentral-data/Aplicado_Logo.png`.
- Nome do plugin alterado para `Mesh Branding` na tela de plugins.
- Adicionado header `X-Mesh-Branding-Mode` para diagnóstico.

## 4.0.5

- Intercepta `/logo.png`, usado como background do `#masthead` após login.
