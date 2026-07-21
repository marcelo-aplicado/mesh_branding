# MeshCentral Mesh Branding

Plugin de branding por subdomínio para MeshCentral com rota HTTP interna no próprio servidor.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 4.0.2

Esta versão corrige o comportamento visual observado na 4.0.1:

- remove/inibe o logo injetado `meshbranding-masthead-logo`;
- não adiciona um novo logo em cima do logo padrão;
- não altera `#MainMeshImage`, preservando a aba/card `Meu Servidor`;
- substitui apenas o `src` de imagens existentes de branding, como `loginlogo.png`;
- não altera background, cores ou textos internos.

## Rota disponível

```text
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

## ZIP

Arquivos diretamente na raiz, sem pasta adicional.
