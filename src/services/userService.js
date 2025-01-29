const connectDB = require('../config/database');
const { validateFields } = require('../utils/utils');

class UserService {
  static async updateNameAndSalary(email, { name, salary }) {
    const db = await connectDB();

    try {
      if (!validateFields(name)) {
        throw new Error('Nome não pode ser vazio.');
      }

      if (!validateFields(salary)) {
        throw new Error('Salário não pode ser vazio.');
      }

      const existingUser = await db
        .collection('users')
        .find({ email })
        .toArray();

      if (existingUser.length === 0) {
        throw new Error('Nenhum usuário encontrado com esse email.');
      }

      await db.collection('users')
        .updateOne(
          { email },
          { $set: { name, salary } }
        );

      return { message: 'Usuário atualizado com sucesso.' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteUser(email) {
    const db = await connectDB();

    try {
      const existingUser = await db
        .collection('users')
        .find({ email })
        .toArray();

      if (existingUser.length === 0) {
        throw new Error('Nenhum usuário encontrado com esse email.');
      }

      await db.collection('users').deleteOne({ email });

      return { message: 'Usuário deletado com sucesso.' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserService;