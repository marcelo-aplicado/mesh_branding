# Mesh Branding

Plugin de branding por subdomínio para MeshCentral.

## Versão 4.1.2

Versão estabilizada com suporte a SVG/PNG, favicon por domínio, `defaultFaviconFile` e controle de tamanho do logo no login e no masthead.

## Novas opções no `brand-config.json`

```json
"defaultFaviconFile": "Aplicado_Favicon.svg",
"defaultLogoCss": {
  "mastheadBackgroundSize": "220px auto",
  "mastheadBackgroundPosition": "12px center",
  "mastheadBackgroundRepeat": "no-repeat",
  "loginLogoWidth": "224px",
  "loginLogoHeight": "60px",
  "loginLogoObjectFit": "contain"
}
```

Cada domínio também pode sobrescrever usando:

```json
"logoCss": {
  "mastheadBackgroundSize": "180px auto",
  "loginLogoWidth": "220px"
}
```

## Arquivos esperados

Logo padrão global:

```text
/opt/docker/meshcentral/meshcentral-data/Aplicado_Logo.png
```

Logos e favicons customizados do plugin:

```text
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/FastCopy_Logo.svg
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/FastCopy_Favicon.svg
```

## Rotas interceptadas

```text
/loginlogo.png
/logo.png
/favicon.ico
/favicon-303x303.png
```

## ZIP

Arquivos diretamente na raiz, sem pasta adicional.
