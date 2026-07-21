# MeshCentral Mesh Branding

Plugin de branding por subdomínio para MeshCentral com rota HTTP interna no próprio servidor.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 4.0.1

Esta versão corrige o registro de rota seguindo o mesmo padrão do <File>mesh-drive-github-ready-v1.2.1.zip</File>: usa `obj.meshServer = parent.parent`, obtém `obj.meshServer.webserver.app` e registra a rota com `app.use(route, handler)`.

Rota registrada:

```text
/mesh_branding/logo.png
```

Como a rota é montada com `app.use('/mesh_branding', handler)`, também responde internamente para:

```text
/mesh_branding/logo
/mesh_branding/logo.png
```

## Arquivos esperados em meshcentral-data

```text
/opt/docker/meshcentral/meshcentral-data/Aplicado_Logo.png
/opt/docker/meshcentral/meshcentral-data/Aplicado_Logo_Custom.png
```

## Regra atual

- `mesh.aplicado.com.br`: tenta `Aplicado_Logo_Custom.png`; fallback `Aplicado_Logo.png`.
- `mesh.fastcopy.net.br`: tenta `FastCopy_Logo_Custom.png`; fallback `Aplicado_Logo.png`.
- `mesh.crsbrands.com.br`: tenta `CRSBrands_Logo_Custom.png`; fallback `Aplicado_Logo.png`.
- `mesh.mhs.tec.br`: tenta `MHS_Logo_Custom.png`; fallback `Aplicado_Logo.png`.

## Teste

Após reiniciar o MeshCentral, o log esperado é:

```text
PLUGIN: Mesh Branding: registered route /mesh_branding -> /opt/meshcentral/meshcentral-data/<logoFile>
```

Abra:

```text
https://mesh.aplicado.com.br/mesh_branding/logo.png
```

O cabeçalho deve indicar:

```text
X-Mesh-Branding-File: Aplicado_Logo_Custom.png
```

## ZIP

Arquivos diretamente na raiz, sem pasta adicional.
