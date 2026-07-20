# MeshCentral Mesh Branding

Plugin para aplicar **logotipo, título, favicon, cores e texto de apoio por subdomínio** em uma única instalação do MeshCentral.

## URL de instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Correção da versão 1.0.2

A versão 1.0.2 corrige o carregamento no MeshCentral 1.2.1. O `pluginHandler.js` espera que o módulo exporte uma função com o nome do `shortName`:

```javascript
module.exports.mesh_branding = function(parent) { ... }
```

A versão anterior usava `module.exports = function`, o que causava o erro:

```text
TypeError: require(...)[plugin.shortName] is not a function
```

## Cenário atendido

Vários subdomínios apontando para a mesma instância MeshCentral e para a mesma base de dados, sem Multi-Tenant:

- `mesh.aplicado.com.br`
- `mesh.fastcopy.net.br`
- `mesh.crsbrands.com.br`
- `mesh.mhs.tec.br`

A separação de acesso continua sendo feita pelas permissões de usuários e grupos de dispositivos do MeshCentral. Este plugin altera apenas a identidade visual exibida no navegador.

## Estrutura

```text
mesh_branding/
├── assets/
│   ├── favicons/
│   └── logos/
├── brand-config.json
├── CHANGELOG.md
├── config.json
├── mesh_branding.js
├── LICENSE
└── README.md
```

## Configuração das marcas

Edite `brand-config.json` para alterar títulos, favicon, logo e cores.

## Instalação no MeshCentral

1. Confirme que plugins estão ativos no `config.json` do MeshCentral:

```json
{
  "settings": {
    "plugins": {
      "enabled": true
    }
  }
}
```

2. Publique este projeto no GitHub:

```text
https://github.com/marcelo-aplicado/mesh_branding
```

3. No MeshCentral:

```text
My Server -> Plugins -> Download plugin
```

4. Informe exatamente:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

5. Reinicie o MeshCentral após atualizar o plugin.

## Teste rápido

Após reiniciar, confira se o erro desapareceu do log. No navegador, você pode executar:

```javascript
window.meshBrandingApply
```

Se retornar uma função, o script chegou ao navegador. Para reaplicar manualmente:

```javascript
window.meshBrandingApply && window.meshBrandingApply();
```

## Licença

MIT
