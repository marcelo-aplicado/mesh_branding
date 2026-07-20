# MeshCentral Mesh Branding

Plugin para aplicar logotipo, título e favicon por subdomínio em uma única instalação do MeshCentral.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 1.0.4

A versão 1.0.4 muda o foco do logotipo do card `#MainMeshImage` para o logotipo real do topo da interface, dentro de `#masthead`.

O plugin agora:

- altera o favicon;
- altera `document.title`;
- altera o título `#p6title h1`;
- injeta o logotipo correto no `#masthead`;
- não altera mais o logo do card interno por padrão;
- mantém os SVGs embutidos no JavaScript como `data:image/svg+xml;base64`.

## Domínios configurados

- `mesh.aplicado.com.br` -> Aplicado
- `mesh.fastcopy.net.br` -> FastCopy
- `mesh.crsbrands.com.br` -> CRS Brands
- `mesh.mhs.tec.br` -> MHS TEC

## Teste no Console

```javascript
window.meshBrandingApply && window.meshBrandingApply();
window.__meshBrandingResolved;
document.getElementById('meshbranding-masthead-logo');
```

## Licença

MIT
