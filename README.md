# MeshCentral Mesh Branding

Branding por subdomínio usando arquivos diretamente em `meshcentral-data`.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 3.0.2

Teste configurado conforme seu cenário atual:

```text
/opt/docker/meshcentral/meshcentral-data/Aplicado_Logo.png
/opt/docker/meshcentral/meshcentral-data/Aplicado_Logo_Custom.png
```

Comportamento esperado:

- `mesh.aplicado.com.br`: tenta `Aplicado_Logo_Custom.png`; se existir, usa customizado.
- `mesh.fastcopy.net.br`: tenta `FastCopy_Logo_Custom.png`; se não existir, usa `Aplicado_Logo.png`.
- `mesh.crsbrands.com.br`: tenta `CRSBrands_Logo_Custom.png`; se não existir, usa `Aplicado_Logo.png`.
- `mesh.mhs.tec.br`: tenta `MHS_Logo_Custom.png`; se não existir, usa `Aplicado_Logo.png`.

## O que esta versão não altera

- background;
- cores;
- texto interno `Meu Servidor`.

## Testes de rota

Após reiniciar o MeshCentral:

```text
https://mesh.aplicado.com.br/mesh_branding/logo?host=mesh.aplicado.com.br
```

Deve retornar `Aplicado_Logo_Custom.png`.

```text
https://mesh.fastcopy.net.br/mesh_branding/logo?host=mesh.fastcopy.net.br
```

Deve retornar `Aplicado_Logo.png`.

## ZIP

Arquivos diretamente na raiz, sem pasta adicional.
