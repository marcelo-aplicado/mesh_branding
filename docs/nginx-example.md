# Exemplo Nginx

O plugin usa `window.location.hostname`, então basta manter o host original encaminhado:

```nginx
proxy_set_header Host $host;
```
