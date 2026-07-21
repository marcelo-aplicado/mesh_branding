# MeshCentral Mesh Branding

Plugin de branding por subdomínio para MeshCentral com rota HTTP interna no próprio servidor.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 4.0.0

Esta versão registra no servidor MeshCentral as rotas:

```text
/mesh_branding/logo.png
/mesh_branding/logo
```

O navegador passa a trocar `loginlogo.png`, `serverpic.ashx`, `MainMeshImage` e imagens de branding para:

```text
/mesh_branding/logo.png
```

O backend do plugin decide qual arquivo entregar com base no host da requisição.

## Arquivos esperados em meshcentral-data

```text
/opt/docker/meshcentral/meshcentral-data/Aplicado_Logo.png
/opt/docker/meshcentral/meshcentral-data/Aplicado_Logo_Custom.png
```

## Regra atual

- `mesh.aplicado.com.br` tenta `Aplicado_Logo_Custom.png`; se não existir, usa `Aplicado_Logo.png`.
- `mesh.fastcopy.net.br` tenta `FastCopy_Logo_Custom.png`; se não existir, usa `Aplicado_Logo.png`.
- `mesh.crsbrands.com.br` tenta `CRSBrands_Logo_Custom.png`; se não existir, usa `Aplicado_Logo.png`.
- `mesh.mhs.tec.br` tenta `MHS_Logo_Custom.png`; se não existir, usa `Aplicado_Logo.png`.

## Teste da rota

Após atualizar, reinicie o MeshCentral e abra:

```text
https://mesh.aplicado.com.br/mesh_branding/logo.png
```

O retorno deve ser HTTP 200 e o cabeçalho deve incluir algo como:

```text
X-Mesh-Branding-File: Aplicado_Logo_Custom.png
```

Se o log do MeshCentral não mostrar a linha abaixo, a rota não foi registrada:

```text
PLUGIN: Mesh Branding v4.0.0: registered /mesh_branding/logo.png and /mesh_branding/logo
```

## O que esta versão não altera

- background;
- cores;
- texto interno `Meu Servidor`;
- banco de dados;
- domínio lógico do MeshCentral.

## ZIP

Arquivos diretamente na raiz, sem pasta adicional.
