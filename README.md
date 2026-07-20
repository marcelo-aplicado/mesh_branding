# MeshCentral Mesh Branding

Plugin de branding por subdomínio para MeshCentral usando logotipos armazenados em `meshcentral-data`.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 3.0.0

Esta versão remove os logos embutidos e passa a procurar os arquivos em `meshcentral-data`. Se o arquivo do domínio não existir, o plugin **não altera o logotipo**, mantendo o padrão do MeshCentral.

## Onde colocar os logotipos

Dentro do container, o diretório base é normalmente:

```text
/opt/meshcentral/meshcentral-data
```

No host Docker do seu ambiente, esse mesmo volume corresponde a:

```text
/opt/docker/meshcentral/meshcentral-data
```

Estrutura recomendada:

```text
/opt/docker/meshcentral/meshcentral-data/mesh_branding/logos/aplicado.svg
/opt/docker/meshcentral/meshcentral-data/mesh_branding/logos/fastcopy.svg
/opt/docker/meshcentral/meshcentral-data/mesh_branding/logos/crsbrands.svg
/opt/docker/meshcentral/meshcentral-data/mesh_branding/logos/mhs.svg
```

Favicons opcionais:

```text
/opt/docker/meshcentral/meshcentral-data/mesh_branding/favicons/aplicado.svg
/opt/docker/meshcentral/meshcentral-data/mesh_branding/favicons/fastcopy.svg
/opt/docker/meshcentral/meshcentral-data/mesh_branding/favicons/crsbrands.svg
/opt/docker/meshcentral/meshcentral-data/mesh_branding/favicons/mhs.svg
```

## O que o plugin altera

- `document.title` por subdomínio;
- favicon, se existir arquivo específico;
- imagens de branding, se existir logo específico;
- logo do topo, se existir logo específico.

## O que o plugin não altera

- background;
- cores do tema;
- título interno `Meu Servidor`;
- imagens comuns de ícones, usuários, grupos ou plugins.

## Endpoints registrados pelo plugin

```text
/mesh_branding/logo
/mesh_branding/favicon
```

## ZIP

Este ZIP está com os arquivos diretamente na raiz, sem pasta extra.

## Teste no navegador

```javascript
window.meshBrandingApply && window.meshBrandingApply();
window.__meshBrandingResolved;
```

## Licença

MIT
