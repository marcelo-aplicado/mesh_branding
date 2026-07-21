# Changelog

## 4.1.2

- Versão estabilizada após validação do comportamento visual na tela de login.
- Mantido suporte a SVG/PNG para logo e favicon.
- Mantido `defaultFaviconFile`.
- Mantido controle de tamanho via `defaultLogoCss` e `domains.<host>.logoCss`.
- Mantida interceptação de `/loginlogo.png`, `/logo.png`, `/favicon.ico` e `/favicon-303x303.png`.
- Mantidos `MainMeshImage`, `Meu Servidor`, `/serverpic.ashx`, background geral e cores intactos.

## 4.1.1

- Adicionado `defaultFaviconFile`.
- Adicionado controle de tamanho via `defaultLogoCss` e `domains.<host>.logoCss`.
- Aplica tamanho do logo no `#masthead` após login.
- Injeta CSS de tamanho no HTML público/login para controlar `img#loginPicture`.
- Mantido suporte a SVG, PNG, ICO, JPG e WEBP.

## 4.1.0

- Adicionado suporte a favicon por domínio.
