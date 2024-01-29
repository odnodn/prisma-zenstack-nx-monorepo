import { getEnhancedPrisma } from '@sample-nx-monorepo/db';
import express, { Request } from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

function getUserId(req: Request) {
  return parseInt(req.header('X-USER-ID')!);
}

// Gets a Prisma client bound to the current user identity
function getUserDb(userId: number | undefined) {
  return getEnhancedPrisma(userId);
}

const app = express();

app.use((req, res, next) => {
  const userIdHeader = req.header('X-USER-ID');
  let userId = userIdHeader ? parseInt(userIdHeader) : undefined;
  if (Number.isNaN(userId)) {
    userId = undefined;
  }
  req.db = getUserDb(userId);
  next();
});

app.get('/', async (req, res) => {
  const posts = await req.db.post.findMany();
  res.send({ posts });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
