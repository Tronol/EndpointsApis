class UsersService {
  constructor() {
    console.log('UsersService inicializado');
  }

  async getUsers() {
    return new Promise((resolve) => {
      resolve(global.users);
    });
  }

  async getUserById(id) {
    return new Promise((resolve) => {
      const user = global.users.find(item => item.id === id);
      resolve(user || null);
    });
  }

  async createUser(userData) {
    return new Promise((resolve, reject) => {
      const existingUser = global.users.find(u => u.email === userData.email);
      if (existingUser) {
        reject(new Error('El email ya está en uso'));
        return;
      }

      const newUser = {
        id: String(global.users.length + 1),
        name: userData.name,
        email: userData.email,
        username: userData.username || '',
        password: userData.password || '',
        active: userData.active !== undefined ? userData.active : true
      };

      global.users.push(newUser);
      resolve(newUser);
    });
  }

  async updateUser(id, changes) {
    return new Promise((resolve, reject) => {
      const index = global.users.findIndex(item => item.id === id);
      if (index === -1) {
        reject(new Error('Usuario no encontrado'));
        return;
      }

      const updatedUser = {
        ...global.users[index],
        ...changes
      };
      global.users[index] = updatedUser;
      resolve(updatedUser);
    });
  }

  async patchUser(id, changes) {
    return new Promise((resolve, reject) => {
      const index = global.users.findIndex(item => item.id === id);
      if (index === -1) {
        reject(new Error('Usuario no encontrado'));
        return;
      }

      const updatedUser = {
        ...global.users[index],
        ...changes
      };
      global.users[index] = updatedUser;
      resolve(updatedUser);
    });
  }

  async deleteUser(id) {
    return new Promise((resolve, reject) => {
      const index = global.users.findIndex(item => item.id === id);
      if (index === -1) {
        reject(new Error('Usuario no encontrado'));
        return;
      }

      const deletedUser = global.users.splice(index, 1)[0];
      resolve(deletedUser);
    });
  }
}

module.exports = UsersService;
