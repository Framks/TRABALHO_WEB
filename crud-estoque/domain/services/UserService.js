const User = require('../entities/User')

class UserService{

    static async create(user) {
        try {
            const newUser = await User.create(user); // Esperar o MongoDB criar o usuário
            return newUser;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return null;
        }
    }

    static async login({nome, senha}){
        try{
            // encontre apenas o primeiro registro
            const user = await User.findOne({nome, senha})
            console.log(user)
            if(user){
                user.senha = "********"
                return {success: "login success", user: user}
            }else{
                return {reject: "login reject"}
            }
        }catch(exception){
            let error =  "error " + exception
            return error
        }
    }
}
module.exports = UserService