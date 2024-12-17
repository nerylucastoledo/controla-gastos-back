const connectDB = require('../config/database');
var ObjectId = require('mongodb').ObjectId; 

class CategoryService {
	static async createCategory(categoryData) {
		const db = await connectDB();

    try {
      const existingCategory = await db
        .collection('categorys')
        .findOne({
          $or: [
            { name: categoryData.name, username: categoryData.username }
          ]
        });

      if (existingCategory) {
        throw new Error('Categoria já cadastrada');
      }
      
      await db.collection('categorys').insertOne(categoryData);

      return {
        message: 'Categoria criada com sucesso!',
        category: categoryData
      };

    } catch (error) {
      throw new Error(error.message || 'Não foi possível criar essa categoria');
    }
	}

	static async getAllCategorys(username) {
    try {
      const db = await connectDB();
      const categorys = await db.collection("categorys").find({ username }).toArray();

      if (!categorys.length) {
        throw new Error('Não foi possível encontrar nenhuma categoria para este usuário');
      }

      return categorys;

    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao buscar as categorias');
    }
  }

  static async updateCategoryName(id, name) {
    const db = await connectDB();
    try {
      const newObjectId = ObjectId.createFromHexString(id)
      const existingCategory = await db
        .collection('categorys')
        .findOne({
          $or: [ { _id: newObjectId } ]
        })

        if (!existingCategory) {
          throw new Error('Nenhuma categoria encontrada');
        }

      await db.collection('categorys').updateOne(
        { _id: newObjectId },
        { $set: { name }}
      );

      return {
        message: 'Categoria atualizada com sucesso!',
        category: { name }
      };

    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao atualizar a categoria');
    }
  }

  static async deleteCategory(id) {
    const db = await connectDB();
    try {
      const newObjectId = ObjectId.createFromHexString(id)
      const existingCategory = await db
        .collection('categorys')
        .find({ _id: newObjectId })
        .toArray();

      if (!existingCategory.length) {
        throw new Error('Nenhum ID encontrado');
      }

      await db.collection('categorys').deleteOne({ _id: newObjectId });

      return {
        message: 'Categoria deletada com sucesso!',
      };

    } catch (error) {
      throw new Error(error.message || 'Erro ao deletar essa categoria');
    }
  }
}

module.exports = CategoryService;