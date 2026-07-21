# MeshCentral Mesh Branding

Plugin de branding por subdomínio para MeshCentral com interceptação backend do `loginlogo.png`.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 4.0.4

Esta versão não depende mais de JavaScript na tela de login. Como o MeshCentral 1.2.1 não carrega `pluginHandler` na tela de login, o plugin passa a interceptar diretamente a rota nativa:

```text
/loginlogo.png
```

Também mantém a rota diagnóstica:

```text
/mesh_branding/logo.png
```

## Resultado esperado

- `mesh.aplicado.com.br/loginlogo.png` deve retornar `Aplicado_Logo_Custom.png`, se o arquivo existir.
- outros hosts usam seus `*_Custom.png`, se existirem.
- quando o customizado não existir, retorna `Aplicado_Logo.png`.

## Arquivos esperados em meshcentral-data

```text
/opt/docker/meshcentral/meshcentral-data/Aplicado_Logo.png
/opt/docker/meshcentral/meshcentral-data/Aplicado_Logo_Custom.png
```

## O que esta versão não altera

- `#MainMeshImage`;
- card `Meu Servidor`;
- background;
- cores;
- banco de dados;
- grupos de dispositivos.

## Cabeçalhos de diagnóstico

A resposta da imagem deve incluir:

```text
X-Mesh-Branding-Host
X-Mesh-Branding-File
```

## ZIP

Arquivos diretamente na raiz, sem pasta adicional.
