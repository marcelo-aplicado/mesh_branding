# MeshCentral Mesh Branding

Plugin de branding por subdomínio usando logotipos armazenados em `meshcentral-data/mesh_branding`.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Teste proposto

Arquivo existente:

```text
/opt/docker/meshcentral/meshcentral-data/mesh_branding/Aplicado_Logo.png
```

Resultado esperado:

- `mesh.aplicado.com.br` usa `Aplicado_Logo.png`.
- `mesh.fastcopy.net.br` não possui `FastCopy_Logo.png`, então mantém o logo padrão do MeshCentral.

## Importante

Esta versão:

- não altera background;
- não altera cores;
- não altera `Meu Servidor`;
- não faz loop infinito de 404: se `/mesh_branding/logo` retornar 404 uma vez, o navegador para de tentar naquela página.

## Testes

Após reiniciar o MeshCentral, teste:

```text
https://mesh.aplicado.com.br/mesh_branding/logo?host=mesh.aplicado.com.br
```

Deve abrir a imagem `Aplicado_Logo.png`.

```text
https://mesh.fastcopy.net.br/mesh_branding/logo?host=mesh.fastcopy.net.br
```

Deve retornar 404 e o MeshCentral deve manter o logo padrão.

## ZIP

Este ZIP está com os arquivos diretamente na raiz, sem pasta extra.
