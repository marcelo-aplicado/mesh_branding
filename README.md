# Mesh Branding

Plugin de branding multi-domínio para MeshCentral.

O Mesh Branding permite personalizar a identidade visual do MeshCentral de acordo com o domínio utilizado para acesso, mantendo uma única instância do servidor, uma única base de dados e os mesmos dispositivos e usuários.

## Recursos

- Logo personalizado por domínio.
- Favicon personalizado por domínio.
- Título da página personalizado por domínio.
- Suporte a arquivos SVG, PNG, JPG, WEBP e ICO.
- Fallback automático para logo e favicon padrão.
- Controle de tamanho do logo na tela de login e na barra superior do MeshCentral.
- Compatível com múltiplos domínios utilizando a mesma instância do MeshCentral.
- Compatível com MeshCentral 1.2.4 ou superior.

## Estrutura dos Arquivos

Logo padrão global:

```text
meshcentral-data/
└── Aplicado_Logo.png
```

Arquivos personalizados do plugin:

```text
meshcentral-data/
└── plugins/
    └── mesh_branding/
        ├── Aplicado_Logo.svg
        ├── Aplicado_Favicon.svg
        ├── FastCopy_Logo.svg
        ├── FastCopy_Favicon.svg
        ├── CRSBrands_Logo.svg
        └── CRSBrands_Favicon.svg
```

## Instalação

### 1. Habilitar plugins no MeshCentral

No `config.json` do MeshCentral, confirme se a opção de plugins está habilitada:

```json
"plugins": {
  "enabled": true
}
```

Reinicie o MeshCentral se precisar alterar essa configuração.

### 2. Instalar o plugin

Na interface administrativa do MeshCentral:

```text
My Server > Plugins > Download Plugin
```

Use a URL do arquivo `config.json` do repositório do plugin:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

### 3. Copiar os arquivos de branding

Copie os logotipos e favicons personalizados para:

```text
meshcentral-data/plugins/mesh_branding/
```

Exemplo em Docker:

```text
/opt/docker/meshcentral/meshcentral-data/plugins/mesh_branding/
```

### 4. Configurar os domínios

Edite o arquivo:

```text
meshcentral-data/plugins/mesh_branding/brand-config.json
```

Exemplo:

```json
{
  "defaultLogoFile": "Aplicado_Logo.png",
  "defaultFaviconFile": "Aplicado_Favicon.svg",
  "customLogoBaseDir": "plugin",
  "defaultLogoBaseDir": "data",
  "customFaviconBaseDir": "plugin",
  "defaultFaviconBaseDir": "plugin",
  "domains": {
    "mesh.aplicado.com.br": {
      "documentTitle": "Acesso Remoto - Aplicado",
      "logoFile": "Aplicado_Logo.svg",
      "faviconFile": "Aplicado_Favicon.svg"
    },
    "mesh.fastcopy.net.br": {
      "documentTitle": "Acesso Remoto - FastCopy",
      "logoFile": "FastCopy_Logo.svg",
      "faviconFile": "FastCopy_Favicon.svg"
    }
  }
}
```

### 5. Reiniciar o MeshCentral

Após alterar o `brand-config.json` ou copiar novos arquivos de branding, reinicie o MeshCentral.

Exemplo em Docker:

```bash
docker restart meshcentral
```

## Configuração de Tamanho

O tamanho do logo pode ser ajustado no `brand-config.json`.

Configuração padrão:

```json
"defaultLogoCss": {
  "mastheadBackgroundSize": "auto 50px",
  "mastheadBackgroundPosition": "12px center",
  "mastheadBackgroundRepeat": "no-repeat",
  "loginLogoWidth": "224px",
  "loginLogoHeight": "60px",
  "loginLogoObjectFit": "contain",
  "loginLogoDisplay": "block",
  "loginLogoMarginLeft": "auto",
  "loginLogoMarginRight": "auto"
}
```

Também é possível definir valores específicos por domínio:

```json
"logoCss": {
  "mastheadBackgroundSize": "auto 48px",
  "loginLogoWidth": "220px",
  "loginLogoHeight": "60px"
}
```

## Rotas Utilizadas

O plugin intercepta automaticamente as seguintes rotas do MeshCentral:

```text
/loginlogo.png
/logo.png
/favicon.ico
/favicon-303x303.png
```

Também disponibiliza rotas de diagnóstico:

```text
/mesh_branding/logo.png
/mesh_branding/favicon.ico
/mesh_branding/config
```

## Diagnóstico

Para verificar a configuração carregada pelo plugin, acesse:

```text
/mesh_branding/config
```

Para verificar o logo aplicado ao domínio atual:

```text
/mesh_branding/logo.png
```

Para verificar o favicon aplicado ao domínio atual:

```text
/mesh_branding/favicon.ico
```

## Observações

- O plugin não altera o banco de dados do MeshCentral.
- O plugin não separa usuários ou dispositivos por domínio.
- O plugin não altera `serverpic.ashx`, `MainMeshImage` ou a área "Meu Servidor".
- O plugin utiliza o `brand-config.json` como fonte única de configuração para o frontend e o backend.

## Autor

Marcelo Henrique da Silva  
CRS Brands

## Licença

MIT
