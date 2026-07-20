# MeshCentral Mesh Branding

Plugin para aplicar **logotipo, título e favicon por subdomínio** em uma única instalação do MeshCentral.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## O que mudou na versão 1.0.3

A versão 1.0.3 remove a dependência de carregar imagens por `/plugins/mesh_branding/assets/...` porque a instalação retornou `404 Not Found` nesse caminho.

Agora os SVGs do repositório continuam em `assets/logos` e `assets/favicons`, mas também são embutidos dentro de `mesh_branding.js` como `data:image/svg+xml;base64,...`.

## Elementos alterados no MeshCentral

A versão foi ajustada para a interface real encontrada no MeshCentral 1.2.1:

```html
<div id="p6title">
    <img id="MainMeshImage" src="serverpic.ashx">
    <h1>Meu Servidor</h1>
</div>
```

O plugin altera diretamente:

- `#MainMeshImage`
- `#p6title h1`
- `document.title`
- favicon do navegador

## Domínios configurados

- `mesh.aplicado.com.br` -> Aplicado
- `mesh.fastcopy.net.br` -> FastCopy
- `mesh.crsbrands.com.br` -> CRS Brands
- `mesh.mhs.tec.br` -> MHS TEC

## Arquivos importantes

```text
config.json          # usado pelo MeshCentral para instalar/atualizar
mesh_branding.js     # plugin com SVGs embutidos
brand-config.json    # configuração documentada das marcas
assets/logos/*.svg   # SVGs utilizados como base
assets/favicons/*.svg
```

## Teste no navegador

No Console do navegador:

```javascript
window.meshBrandingApply && window.meshBrandingApply();
window.__meshBrandingResolved;
```

Se `window.__meshBrandingResolved` retornar o host e a marca, o plugin está ativo no navegador.

## Licença

MIT
