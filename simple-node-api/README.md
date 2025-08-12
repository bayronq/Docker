Crear imagen
```
podman build . -t api-image:v1

Ejecutar o Correr imagen
```
podman run -d -p 30080:3000 --rm --name api-container api-image:v1


