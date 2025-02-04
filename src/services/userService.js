const connectDB = require('../config/database');
const { validateFields } = require('../utils/utils');

class UserService {
  static async updateSalary(username, { salary }) {
    const db = await connectDB();

    try {
      if (!validateFields(salary)) {
        throw new Error('Salário não pode ser vazio.');
      }

      const existingUser = await db
        .collection('users')
        .find({ username })
        .toArray();

      if (existingUser.length === 0) {
        throw new Error('Nenhum usuário encontrado.');
      }

      await db.collection('users')
        .updateOne(
          { username },
          { $set: { salary } }
        );

      return { message: 'Salário atualizado com sucesso.' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteUser(username) {
    const db = await connectDB();

    try {
      const existingUser = await db
        .collection('users')
        .find({ username })
        .toArray();

      if (existingUser.length === 0) {
        throw new Error('Nenhum usuário encontrado.');
      }

      await db.collection('users').deleteOne({ username });

      return { message: 'Usuário deletado com sucesso.' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserService;