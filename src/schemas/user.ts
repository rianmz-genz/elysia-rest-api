import { Elysia, t } from 'elysia';

export const createUserSchema = {
  body: t.Object({
    first_name: t.String(),
    last_name: t.String(),
    email: t.String(),
    about: t.Optional(t.String()),
  }),
};

export const getUserByIdSchema = {
  params: t.Object({
    id: t.Numeric(),
  }),
};

export const updateUserSchema = {
  params: t.Object({
    id: t.Numeric(),
  }),
  body: t.Object({
    first_name: t.Optional(t.String()),
    last_name: t.Optional(t.String()),
    email: t.Optional(t.String()),
    about: t.Optional(t.String()),
  }),
};

export const deleteUserSchema = {
  params: t.Object({
    id: t.Numeric(),
  }),
};

export const getAllUserSchema = {
  query: t.Object({
    limit: t.Numeric(),
  }),
};
