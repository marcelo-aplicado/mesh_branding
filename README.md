# MeshCentral Mesh Branding

Plugin de branding por subdomínio para MeshCentral com interceptação backend de `loginlogo.png` e `logo.png`.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 4.0.6

Esta versão altera o local dos arquivos PNG. Agora o plugin procura os logos diretamente dentro da pasta do próprio plugin:

```text
/opt/meshcentral/meshcentral-data/plugins/mesh_branding/
```

No host Docker do seu ambiente, normalmente corresponde a:

```text
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/
```

## Arquivos esperados

```text
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/Aplicado_Logo.png
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/Aplicado_Logo_Custom.png
```

## Rotas interceptadas

```text
/loginlogo.png
/logo.png
```

- `/loginlogo.png` é usado na tela de login.
- `/logo.png` é usado como `background-image` do `#masthead` após login.

## Fallback

Se o logo customizado do domínio não existir, o plugin usa:

```text
Aplicado_Logo.png
```

Também dentro da pasta do plugin.

## Observação sobre atualizações

Ao atualizar/reinstalar o plugin pelo GitHub, confirme se os arquivos PNG continuam presentes em:

```text
meshcentral-data/plugins/mesh_branding/
```

## ZIP

Arquivos diretamente na raiz, sem pasta adicional.
