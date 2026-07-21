# MeshCentral Mesh Branding

Plugin de branding por subdomínio para MeshCentral com rota HTTP interna no próprio servidor.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 4.0.3

Esta versão corrige a tela de login identificada no MeshCentral 1.2.1:

```html
<img id="loginPicture" src="loginlogo.png">
```

A correção troca explicitamente `img#loginPicture` para:

```text
/mesh_branding/logo.png
```

Mantém:

- `#MainMeshImage` preservado;
- card `Meu Servidor` preservado;
- background preservado;
- cores preservadas;
- sem logo extra sobreposto no masthead.

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

## ZIP

Arquivos diretamente na raiz, sem pasta adicional.
