# Exemplo Nginx

O plugin usa `window.location.hostname`, então mantenha:

```nginx
proxy_set_header Host $host;
```
