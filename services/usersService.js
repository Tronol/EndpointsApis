const User = require('../models/User'); // Asegúrate de que la ruta sea correcta

class UsersService {
  constructor() {
    console.log('UsersService inicializado con MongoDB');
  }

  async getUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error('Error al obtener usuarios: ' + error.message);
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findById(id);
      return user || null;
    } catch (error) {
      throw new Error('Error al obtener usuario: ' + error.message);
    }
  }

  async createUser(userData) {
    try {
      const existingUser = await User.findOne({
        $or: [
          { email: userData.email },
          { username: userData.username }
        ]
      });

      if (existingUser) {
        throw new Error('El email o username ya está en uso');
      }

      const newUser = new User({
        name: userData.name,
        email: userData.email,
        username: userData.username,
        password: userData.password,
        active: userData.active !== undefined ? userData.active : true
      });

      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error('Error al crear usuario: ' + error.message);
    }
  }

  async updateUser(id, changes) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        changes,
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        throw new Error('Usuario no encontrado');
      }

      return updatedUser;
    } catch (error) {
      throw new Error('Error al actualizar usuario: ' + error.message);
    }
  }

  async patchUser(id, changes) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: changes },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        throw new Error('Usuario no encontrado');
      }

      return updatedUser;
    } catch (error) {
      throw new Error('Error al actualizar usuario: ' + error.message);
    }
  }

  async deleteUser(id) {
    try {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        throw new Error('Usuario no encontrado');
      }

      return deletedUser;
    } catch (error) {
      throw new Error('Error al eliminar usuario: ' + error.message);
    }
  }
}

module.exports = UsersService;
