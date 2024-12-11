const connectDB = require('../config/database');

class UserService {
	static async createUser(userData) {
		const db = await connectDB();

    try {
      const existingUser = await db
        .collection('users')
        .findOne({
          $or: [
            { username: userData.username }, 
            { email: userData.email }
          ]
        });

      if (existingUser) {
        throw new Error('Nome de usuário ou email já em uso');
      }
      
      const result = await db
        .collection('users')
        .insertOne(userData);

      return {
        message: 'Usuário criado com sucesso!',
        user: userData
      };

    } catch (error) {
      throw new Error(error.message || 'Não foi possível criar o usuário');
    }
	}

	static async findByEmail(email) {
    try {
      const db = await connectDB();
      const users = await db
        .collection("users")
        .find({ email })
        .toArray();

      if (!users.length) {
        throw new Error('Nenhum usuário encontrado com o email fornecido');
      }

      return users;

    } catch (error) {
      throw new Error(error.message || 'Não foi possível encontrar o usuário');
    }
  }

  static async updateNameAndSalary(email, { name, salary }) {
    const db = await connectDB();
    try {
      const existingUser = await db
        .collection('users')
        .find({ email })
        .toArray();;

      if (!existingUser.length) {
        throw new Error('Nenhum usuário encontrado com esse email');
      }

      await db.collection('users').updateOne(
        { email },
        { $set: { name, salary }}
      );

      return {
        message: 'Usuário atualizado com sucesso!',
        user: { email, name, salary }
      };

    } catch (error) {
      throw new Error(error.message || 'Erro ao atualizar o usuário');
    }
  }

  static async deleteUser(email) {
    const db = await connectDB();
    try {
      const existingUser = await db
        .collection('users')
        .find({ email })
        .toArray();;

      if (!existingUser.length) {
        throw new Error('Nenhum usuário encontrado com esse email');
      }

      await db.collection('users').deleteOne({ email });

      return {
        message: 'Usuário deletado com sucesso!',
      };

    } catch (error) {
      throw new Error(error.message || 'Erro ao deletar o usuário');
    }
  }
}

module.exports = UserService;