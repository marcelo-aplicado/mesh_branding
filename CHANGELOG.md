# Changelog

## 4.0.1

- Corrigido registro da rota seguindo o padrão funcional do Mesh Drive.
- Usa `obj.meshServer = parent.parent`.
- Registra `app.use('/mesh_branding', handler)` em vez de tentar localizar Express por varredura genérica.
- Mantém fallback para `Aplicado_Logo.png`.
- Mantém background, cores e `Meu Servidor` intactos.

## 4.0.0

- Primeira tentativa de rota HTTP interna no MeshCentral.
