const User = require('../entities/User')

class UserService{

    async create(user) {
        try {
            const newUser = await User.create(user); // Esperar o MongoDB criar o usuário
            return newUser;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return null;
        }
    }
}
module.exports = UserService