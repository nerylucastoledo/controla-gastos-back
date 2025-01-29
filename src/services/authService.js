const { 
	getAuth, 
	createUserWithEmailAndPassword, 
	signInWithEmailAndPassword, 
	signOut, 
	sendEmailVerification,
} = require('../config/firebase');
const connectDB = require('../config/database');
const { parseCurrencyString, validateFields } = require('../utils/utils');

const auth = getAuth();
  
class AuthService {
	static async registerUser({ email, name, username, salary, password }) {
		const db = await connectDB();
		
		try {
			if (!validateFields(email)) {
        throw new Error('Email não pode ser vazio.');
      }

			if (!validateFields(name)) {
        throw new Error('Nome não pode ser vazio.');
      }

			if (!validateFields(username)) {
        throw new Error('Username não pode ser vazio.');
      }

			if (!validateFields(salary)) {
        throw new Error('Salário não pode ser vazio.');
      }

			if (parseCurrencyString(salary) === 0) {
        throw new Error('Salário não pode ser 0.');
      }

			if (!validateFields(password)) {
        throw new Error('Senha não pode ser vazia.');
      }

			if (password.length < 8) {
        throw new Error('Senha deve conter 8 dígitos.');
      }

			const existingUser = await db
				.collection("users")
				.find({ email })
				.toArray();

			if (existingUser.length) {
        throw new Error('Email já está em uso.');
      }

			await db.collection('users').insertOne({ email, name, username, salary });
			await createUserWithEmailAndPassword(auth, email, password);
			await sendEmailVerification(auth.currentUser);
			return { message: 'Usuário criado com sucesso.' };

		} catch (error) {
			throw new Error(error.message || 'Não foi possível cadastrar esse usuário.');
		}
  }

	static async loginUser({ email, password }) {
		const db = await connectDB();

		try {
			if (!validateFields(email)) {
        throw new Error('E-mail não pode ser vazio.');
      }

      if (!validateFields(password)) {
        throw new Error('Senha não pode ser vazia.');
      }

			const response = await signInWithEmailAndPassword(auth, email, password)
				.then(async (userCredential) => {
					const idToken = userCredential._tokenResponse.idToken
					const user = await db
						.collection("users")
						.find({ email })
						.toArray();

					if (!idToken && !user.length) {
						throw new Error("Ocorreu um erro ao tentar fazer o login.")
					}

					return {
						message: "Usuário logado com sucesso! Estamos te redirecionando.",
						token: idToken,
						username: user[0].username, 
						salary: user[0].salary
					};
				})
				.catch(() => {
					return { message: "Usuário ou senha inválido."}
				});

			if (response.error) {
				throw new Error(response.message)
			} else {
				return response
			}
		} catch (error) {
			throw new Error(error.message || 'Não foi acessar a conta. Tente novamente');
		}
  }

	static async logoutUser() {
    try {
      await signOut(auth);
			return {
				message: 'Usuálio deslogado com sucesso.',
			};
    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro interno');
    }
  }
}

module.exports = AuthService;