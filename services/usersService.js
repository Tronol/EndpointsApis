const faker = require('faker');

class UsersService {
  constructor() {
    this.users = [];
    this.generateData();
  }

  generateData() {
    console.log('Generando datos de usuarios...');
    for (let i = 0; i < 50; i++) {
      this.users.push({
        id: String(i + 1),
        name: faker.name.findName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        active: faker.datatype.boolean(),
      });
    }
    console.log('Datos de usuarios generados exitosamente');
  }

  getUsers() {
    return this.users;
  }

  getUserById(id) {
    const user = this.users.find(item => item.id === id);
    return user || null;
  }

  createUser(userData) {
    // Verificar si el email ya existe
    const existingUser = this.users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('El email ya está en uso');
    }

    const newUser = {
      id: String(this.users.length + 1),
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar || faker.image.avatar(),
      active: userData.active !== undefined ? userData.active : true
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Usuario no encontrado');
    }
    const updatedUser = { ...this.users[index], ...changes };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  patchUser(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Usuario no encontrado');
    }
    const updatedUser = { ...this.users[index], ...changes };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  deleteUser(id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Usuario no encontrado');
    }
    const deletedUser = this.users.splice(index, 1)[0];
    return deletedUser;
  }
}

module.exports = UsersService;
