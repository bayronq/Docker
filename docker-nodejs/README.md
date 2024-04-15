# Crea imagen
```docker build -t docker-nodejs . 

# Ejecuta imagen en el puerto 3001
```docker run docker-nodejs -p 3001:3000 -d

# Probar app
http://localhost/3001/generatePasswords/5
