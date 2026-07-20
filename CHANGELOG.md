# Changelog

## 1.0.3

- Logos SVG embutidos no `mesh_branding.js` como data URI.
- Removida dependência de servir arquivos por `/plugins/mesh_branding/assets/...`.
- Ajustado para alterar diretamente `#MainMeshImage` e `#p6title h1`.
- Mantidos os SVGs em `assets/logos` e `assets/favicons` como fonte/base do repositório.

## 1.0.2

- Corrigido export do plugin para MeshCentral 1.2.1: `module.exports.mesh_branding = function(parent)`.
- Mantidos hooks `onWebUIStartupEnd` e `goPageEnd`.

## 1.0.1

- Projeto renomeado para `mesh_branding`.
- URLs configuradas para `marcelo-aplicado/mesh_branding`.

## 1.0.0

- Versão inicial do plugin de branding por subdomínio.
