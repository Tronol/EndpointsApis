const express = require('express');
const UserService = require('../services/usersService');
const router = express.Router();
const userService = new UserService();


// GET ALL
router.get("/", (req, res) => {
  const users = userService.getUsers();
  res.json(users);
});

// GET BY ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = userService.getUserById(id);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.json(user);
});

// CREATE
router.post("/", (req, res) => {
  const body= req.body;
  const newUser = userService.createUser(body);
  res.status(201).json(
    {message: 'Usuario creado exitosamente',
    data: newUser
  });
});


// UPDATE
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try{
    const updatedUser = userService.updateUser(id, body);
    res.json({
      message: 'Usuario actualizado exitosamente',
      data: updatedUser
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// PATCH
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUser = userService.patchUser(id, updates);
    res.json({
      message: 'Usuario actualizado parcialmente',
      data: updatedUser
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const result = userService.deleteUser(id);
    res.json({
      message: 'Usuario eliminado exitosamente',
      data: result
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
