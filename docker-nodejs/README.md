# Crea imagen
`docker build -t docker-nodejs . `

## Ejecuta imagen en el puerto 3001
`docker run --name nodejs -d -p 3001:3000 docker-nodejs`

# Probar app
`curl http://localhost:3001/generatePasswords/5`
