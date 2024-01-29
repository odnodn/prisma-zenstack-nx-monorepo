# ZenStack Sample Using Nx Monorepo

## Projects

- `db`

  Library containing ZModel schema and exports a function for getting an enhanced PrismaClient given a user id.

- `api`

  A simple Express.js API.

## To run the project

1. npm install
2. nx run db:generate
3. nx run db:push
4. nx run db:seed
5. nx serve api

You can then send a request to http://localhost:3000 to fetch posts:

- Fetch with user#1

  ```
  curl -H "X-USER-ID:1" http://localhost:3000
  ```

- Fetch with an anonymous user

  ```
  curl -H http://localhost:3000
  ```
