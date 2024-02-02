import { Elysia } from 'elysia';
import { createDb } from './databases/db';
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUserById,
  seedUsers,
} from './controllers/user';
import {
  createUserSchema,
  deleteUserSchema,
  getAllUserSchema,
  getUserByIdSchema,
  updateUserSchema,
} from './schemas/user';

const app = new Elysia()
  .decorate('db', createDb())
  .post('/seed', seedUsers)
  .post('/users', createUser, createUserSchema)
  .get('/users/:id', getUserById, getUserByIdSchema)
  .put('/users/:id', updateUser, updateUserSchema)
  .delete('/users/:id', deleteUser, deleteUserSchema)
  .get('/users', getAllUser, getAllUserSchema)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
