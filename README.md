# Mesh Branding

Plugin de branding por subdomínio para MeshCentral.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 4.0.8

Esta versão usa como base o `brand-config.json` enviado pelo Marcelo e adiciona alteração do título HTML também na tela de login.

## Arquivos esperados

Logo padrão global:

```text
/opt/docker/meshcentral/meshcentral-data/Aplicado_Logo.png
```

Logos customizados do plugin:

```text
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/FastCopy_Logo.png
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/CRSBrands_Logo.png
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/Aplicado_Logo.png
```

## Rotas interceptadas

```text
/loginlogo.png
/logo.png
```

## Título da página de login

A versão inclui um middleware HTML que substitui o conteúdo da tag:

```html
<title>...</title>
```

com base no `documentTitle` configurado para o host atual.

## Diagnóstico

As respostas das imagens incluem:

```text
X-Mesh-Branding-Host
X-Mesh-Branding-File
X-Mesh-Branding-Root
X-Mesh-Branding-Mode
```

As respostas HTML alteradas incluem:

```text
X-Mesh-Branding-Title
```

## ZIP

Arquivos diretamente na raiz, sem pasta adicional.
