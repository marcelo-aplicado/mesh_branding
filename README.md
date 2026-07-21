# Mesh Branding

Plugin de branding por subdomínio para MeshCentral.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 4.0.9

Esta versão corrige o middleware de título HTML para não interferir em redirects, especialmente no fluxo `/logout` -> `/login`.

## Arquivos esperados

Logo padrão global:

```text
/opt/docker/meshcentral/meshcentral-data/Aplicado_Logo.png
```

Logos customizados do plugin:

```text
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/FastCopy_Logo.png
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/CRSBrands_Logo.png
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/Aplicado_Logo.png
```

## Rotas interceptadas

```text
/loginlogo.png
/logo.png
```

## Título da página de login

O middleware de `<title>` agora só atua em `/` e `/login`, e ignora `/logout` para preservar o redirecionamento nativo do MeshCentral.

## ZIP

Arquivos diretamente na raiz, sem pasta adicional.
