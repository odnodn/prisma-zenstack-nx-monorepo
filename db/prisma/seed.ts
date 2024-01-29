import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
    },
  });
  console.log('User created:', user);

  const post1 = await prisma.post.create({
    data: {
      name: 'A published post',
      published: true,
      author: { connect: { id: user.id } },
    },
  });
  console.log('Post created:', post1);

  const post2 = await prisma.post.create({
    data: {
      name: 'A draft post',
      author: { connect: { id: user.id } },
    },
  });
  console.log('Post created:', post2);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
