# MeshCentral Mesh Branding

Plugin de branding global por subdomínio para MeshCentral.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 2.0.0

Esta versão aplica o branding de forma global. Em vez de alterar apenas um ponto específico da tela, o plugin procura imagens de branding em qualquer página, incluindo login e telas internas, e troca por SVG embutido no próprio JavaScript.

O plugin altera:

- favicon da aba;
- `document.title`, título ao lado do favicon;
- logo do topo dentro de `#masthead`;
- imagens de branding com `serverpic.ashx`, `loginpic.ashx`, `titlepic.ashx`, `logo`, `loginlogo` e `MainMeshImage`.

O plugin não altera textos internos como `Meu Servidor`.

## ZIP

Este ZIP está com os arquivos diretamente na raiz, sem pasta extra.

## Testes úteis no Console

```javascript
window.meshBrandingApply && window.meshBrandingApply();
window.__meshBrandingResolved;
Array.from(document.querySelectorAll('img[data-meshbranding-replaced="1"]')).map(x => x.getAttribute('data-meshbranding-original-src'));
```

## Licença

MIT
