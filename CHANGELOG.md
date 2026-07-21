# Changelog

## 4.0.4

- Nova estratégia: intercepta `/loginlogo.png` diretamente no backend.
- Não depende mais do JavaScript do plugin na tela de login.
- Mantém `/mesh_branding/logo.png` como rota diagnóstica.
- Usa o mesmo seletor de arquivo por host e fallback para `Aplicado_Logo.png`.
- Mantém `MainMeshImage`, `Meu Servidor`, background e cores intactos.

## 4.0.3

- Tentativa frontend via `img#loginPicture`.
