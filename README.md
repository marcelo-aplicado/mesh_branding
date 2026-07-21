# MeshCentral Mesh Branding

Plugin de branding por subdomínio para MeshCentral com interceptação backend de `loginlogo.png` e `logo.png`.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 4.0.5

Esta versão intercepta duas rotas nativas do MeshCentral:

```text
/loginlogo.png
/logo.png
```

- `/loginlogo.png` é usado na tela de login.
- `/logo.png` é usado como `background-image` do `#masthead` após o login.

Também mantém a rota diagnóstica:

```text
/mesh_branding/logo.png
```

## Resultado esperado

- `mesh.aplicado.com.br/loginlogo.png` retorna `Aplicado_Logo_Custom.png`, se existir.
- `mesh.aplicado.com.br/logo.png` retorna `Aplicado_Logo_Custom.png`, se existir.
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
- `/serverpic.ashx`;
- background geral;
- cores;
- banco de dados;
- grupos de dispositivos.

## Cabeçalhos de diagnóstico

As respostas das imagens devem incluir:

```text
X-Mesh-Branding-Host
X-Mesh-Branding-File
```

## ZIP

Arquivos diretamente na raiz, sem pasta adicional.
