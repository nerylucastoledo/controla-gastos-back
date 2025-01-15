const { 
	getAuth, 
	createUserWithEmailAndPassword, 
	signInWithEmailAndPassword, 
	signOut, 
	sendEmailVerification,
} = require('../config/firebase');
const { createUser, findByEmail } = require('./userService');
const connectDB = require('../config/database');

const auth = getAuth();
  
class FirebaseAuthService {
	async registerUser({ email, password, salary, name, username }) {
		try {
			const db = await connectDB();
			
			const existingUser = await db
        .collection('users')
        .findOne({
          $or: [
            { username }, 
            { email }
          ]
        });

      if (existingUser) {
        throw new Error('Nome de usuário ou email já em uso');
      }

			await createUserWithEmailAndPassword(auth, email, password);
			await createUser({ email, name, username, salary });
			await sendEmailVerification(auth.currentUser);
			return {
				message: 'E-mail enviado! Usuário criado com sucesso!',
				user: {
					name,
					username,
					email
				}
			};
		} catch (error) {
			throw new Error(error.message || 'Não foi possível cadastrar esse usuário');
		}
  }

	async loginUser({ email, password }) {
		try {
			const response = await signInWithEmailAndPassword(auth, email, password)
				.then(async (userCredential) => {
					const idToken = userCredential._tokenResponse.idToken
					const user = await findByEmail(email);

					if (idToken && user.length) {
						return {
							message: "Usuário logado com sucesso! Estamos te redirecionando",
							token: idToken,
							username: user[0].username, 
							salary: user[0].salary
						};
					} else {
						throw new Error("Ocorreu um erro ao tentar fazer o login!")
					}
				})
				.catch(() => {
					return {
						message: "Usuário ou senha inválido!",
						error: true
					}
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

	async logoutUser() {
    try {
      await signOut(auth);
			return {
				message: 'Usuálio deslogado com sucesso!',
			};
    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro interno');
    }
  }
}

module.exports = new FirebaseAuthService();