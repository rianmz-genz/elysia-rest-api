import { da, faker } from '@faker-js/faker';
import { JsonResponse } from '../helpers/json_response';
type DB = {
  db: any;
};
type Params = {
  params: {
    id: number;
  };
};
type Body = {
  body: any;
};
type Query = {
  query: any;
};

class GetUserData {
  data;
  body;
  constructor(data: any, body: any) {
    this.data = data;
    this.body = body;
  }
  response() {
    return this.data.get({
      $first_name: this.body.first_name,
      $last_name: this.body.last_name,
      $email: this.body.email,
      $about: this.body.about || null,
    });
  }
}

export const createUser = ({ body, db }: Body & DB) => {
  console.log('Inserting user to the table');
  const insertUser = db.prepare(
    'INSERT INTO users (first_name, last_name, email, about) VALUES ($first_name, $last_name, $email, $about) RETURNING *',
  );

  const insertedUser = new GetUserData(insertUser, body).response();
  console.log(`Inserted user ${insertedUser}`);
  return new JsonResponse(insertedUser, 'Success create user').json();
};

export const updateUser = ({ params, body, db }: Params & Body & DB) => {
  const userId = params.id;

  console.log(`Updating user with ID ${userId}`);
  const updateUser = db.prepare(`
      UPDATE users
      SET first_name = $first_name, last_name = $last_name, email = $email, about = $about
      WHERE user_id = $user_id
      RETURNING *
    `);

  const updatedUser = new GetUserData(updateUser, body).response();

  console.log(`Updated user ${updatedUser}`);
  return new JsonResponse(updatedUser, 'Success update user').json();
};

export const deleteUser = ({ params, db }: DB & Params) => {
  const userId = params.id;

  console.log(`Deleting user with ID ${userId}`);
  const deleteUser = db.prepare(
    'DELETE FROM users WHERE user_id = $user_id RETURNING *',
  );

  const deletedUser = deleteUser.get({
    $user_id: userId,
  });

  console.log(`Deleted user ${deletedUser}`);
  return new JsonResponse(deletedUser, 'Success delete user').json();
};

export const getUserById = ({ params, db }: DB & Params) => {
  const userId = params.id;

  const user = db.query('SELECT * FROM users WHERE user_id = $user_id').get({
    $user_id: userId,
  });
  return new JsonResponse(user, 'Success get user by id').json();
};

export const getAllUser = ({ query, db }: Query & DB) => {
  const users = db
    .query('SELECT * FROM users order by first_name desc limit $limit')
    .all({
      $limit: query.limit,
    });
  return new JsonResponse(users, 'Success get all users').json();
};

export const seedUsers = ({ db }: DB) => {
  const insertUser = db.prepare(
    'INSERT INTO users (first_name, last_name, email, about) VALUES ($first_name, $last_name, $email, $about) RETURNING *',
  );

  for (let i = 0; i < 100; i++) {
    const insertedUser = insertUser.get({
      $first_name: faker.person.firstName(),
      $last_name: faker.person.firstName(),
      $email: faker.internet.email(),
      $about: faker.lorem.text(),
    });

    console.log(`Inserted user ${insertedUser}`);
  }
  return 'done';
};
