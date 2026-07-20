# Changelog

## 2.0.0

- Implementado modo global de substituição de imagens de branding.
- Substitui imagens com `serverpic.ashx`, `loginpic.ashx`, `titlepic.ashx`, `logo`, `loginlogo` e `MainMeshImage`.
- Substitui backgrounds de branding quando detectados.
- Mantém `document.title`, favicon e masthead por subdomínio.
- Preserva textos internos como "Meu Servidor".
- ZIP gerado com arquivos diretamente na raiz.

## 1.0.5

- Preservado o título interno padrão do MeshCentral.

## 1.0.4

- Logotipo principal aplicado em `#masthead`.

## 1.0.3

- Logos SVG embutidos no `mesh_branding.js` como data URI.

## 1.0.2

- Corrigido export `module.exports.mesh_branding = function(parent)`.

## 1.0.1

- Projeto renomeado para `mesh_branding`.

## 1.0.0

- Versão inicial.
