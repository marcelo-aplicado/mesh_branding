# Changelog

## 4.0.9

- Middleware de `<title>` limitado a `/` e `/login`.
- Corrigido para não interferir em redirects, especialmente `/logout` -> `/login`.
- Mantida interceptação de `/loginlogo.png` e `/logo.png`.
- Mantidos `MainMeshImage`, `Meu Servidor`, `/serverpic.ashx`, background e cores intactos.

## 4.0.8

- Adicionado middleware para substituir `<title>` também na tela de login.
