# Mesh Branding

Plugin de branding por subdomínio para MeshCentral.

## Versão 1.2.2

Esta versão remove o `CONFIG` hardcoded do JavaScript do frontend.

O frontend agora carrega dinamicamente:

```text
/mesh_branding/config
```

Essa rota retorna o conteúdo atual de:

```text
meshcentral-data/plugins/mesh_branding/brand-config.json
```

Assim, parâmetros como `mastheadBackgroundSize`, `loginLogoWidth`, `faviconFile`, `logoFile` e `documentTitle` passam a ter uma única fonte de configuração.

## Validação rápida

```text
/mesh_branding/config
```

Deve retornar o JSON atual do plugin.

## ZIP

Arquivos diretamente na raiz, sem pasta adicional.
