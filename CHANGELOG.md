# Changelog

## 3.0.0

- Logos deixam de ficar embutidos no plugin.
- Plugin procura logos em `meshcentral-data`.
- Se o logo não existir, mantém o padrão do MeshCentral.
- Removida alteração de background e cores do tema.
- Preservado `Meu Servidor`.
- Adicionados endpoints `/mesh_branding/logo` e `/mesh_branding/favicon`.
- ZIP gerado com arquivos diretamente na raiz.

## 2.0.1

- Mitigação de flash visual no login.

## 2.0.0

- Modo global de substituição de imagens de branding.

## 1.0.5

- Preservado o título interno padrão do MeshCentral.

## 1.0.4

- Logotipo principal aplicado em `#masthead`.

## 1.0.3

- Logos SVG embutidos no JavaScript.

## 1.0.2

- Corrigido export `module.exports.mesh_branding = function(parent)`.
