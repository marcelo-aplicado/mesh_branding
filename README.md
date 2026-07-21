# Mesh Branding

Plugin de branding multi-domínio para MeshCentral.

O Mesh Branding permite personalizar a identidade visual do MeshCentral de acordo com o domínio utilizado para acesso, mantendo uma única instância do servidor, uma única base de dados e os mesmos dispositivos e usuários.

## Recursos

- Logo personalizado por domínio
- Favicon personalizado por domínio
- Título da página personalizado por domínio
- Suporte a SVG, PNG, JPG, WEBP e ICO
- Fallback automático para logo e favicon padrão
- Controle de tamanho dos logotipos
- Compatível com múltiplos domínios utilizando a mesma instância do MeshCentral
- Compatível com MeshCentral 1.2.1 ou superior

## Estrutura dos Arquivos

Logo padrão:

```text
meshcentral-data/
└── Aplicado_Logo.png
```

Arquivos personalizados:

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

### 1. Instalar o Plugin

Pelo menu de Plugins do MeshCentral, utilize a URL:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

### 2. Copiar os Arquivos de Branding

Copie os logotipos e favicons para a pasta:

```text
meshcentral-data/plugins/mesh_branding/
```

### 3. Configurar os Domínios

Edite o arquivo:

```text
brand-config.json
```

Exemplo:

```json
{
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

### 4. Reiniciar o MeshCentral

```bash
docker restart meshcentral
```

## Configurações

### Logo padrão

```json
"defaultLogoFile": "Aplicado_Logo.png"
```

### Favicon padrão

```json
"defaultFaviconFile": "Aplicado_Favicon.svg"
```

### Tamanho do logotipo

```json
"defaultLogoCss": {
  "mastheadBackgroundSize": "auto 50px",
  "loginLogoWidth": "224px",
  "loginLogoHeight": "60px"
}
```

Também é possível definir valores específicos para cada domínio:

```json
"logoCss": {
  "mastheadBackgroundSize": "180px auto",
  "loginLogoWidth": "200px",
  "loginLogoHeight": "50px"
}
```

## Rotas Utilizadas

O plugin responde automaticamente às seguintes rotas:

```text
/loginlogo.png
/logo.png
/favicon.ico
/favicon-303x303.png
```

## Compatibilidade

- MeshCentral 1.2.1+
- Docker
- Linux
- Cloudflare Tunnel
- Reverse Proxy (Nginx, Traefik, HAProxy)

## Autor

Marcelo Henrique da Silva  
CRS Brands

## Licença

MIT
