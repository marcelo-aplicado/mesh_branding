# MeshCentral Mesh Branding

Plugin para aplicar logotipo do topo, título da aba do navegador e favicon por subdomínio em uma única instalação do MeshCentral.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 1.0.5

A versão 1.0.5 mantém o título interno padrão do MeshCentral, ou seja, não altera mais `#p6title h1` nem `#MainMeshImage`.

O plugin altera somente:

- favicon da aba;
- `document.title`, texto ao lado do favicon na aba do navegador;
- logo do topo dentro de `#masthead`.

## Importante sobre o ZIP

Este ZIP foi gerado com os arquivos diretamente na raiz, sem uma pasta adicional envolvendo o projeto.

## Teste no Console

```javascript
window.meshBrandingApply && window.meshBrandingApply();
window.__meshBrandingResolved;
document.title;
document.querySelector('#p6title h1')?.innerText;
```

## Licença

MIT
