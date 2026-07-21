# MeshCentral Mesh Branding

Plugin de branding por subdomínio para MeshCentral com interceptação backend de `loginlogo.png` e `logo.png`.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 4.0.7

Esta versão altera o local dos arquivos PNG. Agora o plugin procura os logos customizados dentro da pasta do próprio plugin e mantém o logo padrão no diretório base do MeshCentral:

```text
/opt/meshcentral/meshcentral-data/plugins/mesh_branding/
```

No host Docker do seu ambiente, normalmente corresponde a:

```text
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/
```

## Arquivos esperados

Logo padrão global:

```text
/opt/docker/meshcentral/meshcentral-data/Aplicado_Logo.png
```

Logos customizados do plugin:

```text
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/Aplicado_Logo_Custom.png
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/FastCopy_Logo_Custom.png
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/CRSBrands_Logo_Custom.png
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/MHS_Logo_Custom.png
```

## Rotas interceptadas

```text
/loginlogo.png
/logo.png
```

- `/loginlogo.png` é usado na tela de login.
- `/logo.png` é usado como `background-image` do `#masthead` após login.

## Fallback

Se o logo customizado do domínio não existir dentro da pasta do plugin, o plugin usa:

```text
/opt/docker/meshcentral/meshcentral-data/Aplicado_Logo.png
```

## Observação sobre atualizações

Ao atualizar/reinstalar o plugin pelo GitHub, confirme se os arquivos PNG continuam presentes em:

```text
meshcentral-data/plugins/mesh_branding/
```

## ZIP

Arquivos diretamente na raiz, sem pasta adicional.
