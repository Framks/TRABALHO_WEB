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

    async login({password, username}){
        try{
            const user = await User.find({email:username, senha:password})
            if(user){
                return {sucess: "login sucess"}
            }else{
                return {regect: "login regect"}
            }
        }catch(exception){
            let error =  "error " + exception
            return error
        }
    }
}
module.exports = UserService