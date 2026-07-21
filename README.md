# Mesh Branding

Plugin de branding por subdomínio para MeshCentral.

## Versão 4.1.0

Adiciona suporte a favicon por domínio.

## Arquivos esperados

Logo padrão global:

```text
/opt/docker/meshcentral/meshcentral-data/Aplicado_Logo.png
```

Logos e favicons customizados do plugin:

```text
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/FastCopy_Logo.png
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/FastCopy_Favicon.png
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/CRSBrands_Logo.png
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/CRSBrands_Favicon.png
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/Aplicado_Logo.png
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/Aplicado_Favicon.png
```

## Rotas interceptadas

```text
/loginlogo.png
/logo.png
/favicon.ico
/favicon-303x303.png
```

Se o favicon customizado não existir, o plugin deixa a rota nativa do MeshCentral responder.

## Diagnóstico

Use `/mesh_branding/favicon.ico` para testar o favicon customizado do host atual.

## ZIP

Arquivos diretamente na raiz, sem pasta adicional.
