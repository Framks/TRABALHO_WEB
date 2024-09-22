// scripts/createUser.js
const mongoose = require('mongoose');
const User = require('../models/User');

async function createUser() {
  await mongoose.connect('mongodb://admin:password@localhost:27017/seu_banco_de_dados', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const user = new User({
    nome: 'Admin',
    email: 'admin@example.com',
    senha: 'password123', // Lembre-se de usar hashing em produção!
  });

  try {
    await user.save();
    console.log('Usuário criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar usuário:', error.message);
  } finally {
    mongoose.connection.close();
  }
}

createUser();
