# MeshCentral Mesh Branding

Plugin de branding global por subdomínio para MeshCentral.

## Instalação

Use esta URL na interface gráfica do MeshCentral:

```text
https://raw.githubusercontent.com/marcelo-aplicado/mesh_branding/main/config.json
```

## Versão 2.0.1

Esta versão mantém o modo global da v2.0.0 e adiciona uma mitigação para o efeito visual em que o login mostra um logo nativo e depois troca para outro.

O plugin agora:

- oculta imagens nativas de branding enquanto ainda não foram substituídas;
- substitui imagens com `serverpic.ashx`, `loginpic.ashx`, `titlepic.ashx`, `logo`, `loginlogo` e `MainMeshImage`;
- substitui backgrounds de branding quando detectados;
- mantém favicon, `document.title` e logo do `#masthead` por subdomínio;
- preserva textos internos como `Meu Servidor`.

## Observação importante

Como o MeshCentral carrega primeiro o HTML nativo e depois executa plugins de Web UI, esta versão reduz bastante a troca visual no navegador. Para eliminar o flash em nível absoluto, o ideal seria alterar a origem servida por `serverpic.ashx/loginpic.ashx` no backend ou no proxy reverso.

## ZIP

Este ZIP está com os arquivos diretamente na raiz, sem pasta extra.

## Teste útil no Console

```javascript
window.meshBrandingApply && window.meshBrandingApply();
window.__meshBrandingResolved;
Array.from(document.querySelectorAll('img[data-meshbranding-replaced="1"]')).map(x => x.getAttribute('data-meshbranding-original-src'));
```

## Licença

MIT
