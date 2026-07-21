# Changelog

## 4.1.0

- Adicionado suporte a favicon por domínio via `faviconFile` no `brand-config.json`.
- Intercepta `/favicon.ico` e `/favicon-303x303.png` somente quando existe favicon customizado.
- Adicionada rota diagnóstica `/mesh_branding/favicon.ico`.
- Mantida correção de logout/redirect da v4.0.9.

## 4.0.9

- Middleware de `<title>` limitado a `/` e `/login`.
