# Use uma imagem Node.js
FROM node:22.9

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o código da aplicação para o container
COPY package*.json ./

# Exponha a porta que o Express usa
EXPOSE 3000

# Comando para iniciar a aplicação e instalar dependências
CMD npm install && npm start
