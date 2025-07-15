const { PrismaClient } = require('./generated/prisma');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  await prisma.note.deleteMany(); // Clear old notes

  const notes = [
    {
      title: 'Basic Markdown',
      content: `# 📘 **Book-Author API**

## 📌 **What it does**

This project is a basic **CRUD API** server that demonstrates **one-to-many** and **many-to-one** relationships using **authors** and their **books**.

Each **author** can have **multiple books**, and each **book** belongs to a **single author**.

It was built for learning purposes to understand how to model and implement relational-like behavior in **PostgreSQL**.
`,
    },
    {
      title: 'Broken Grammar Example',
      content: `This are a note with many mistake. It have bad grammer and unclear sentence.`,
    },
    {
      title: 'Correct Note',
      content: `The quick brown fox jumps over the lazy dog. This sentence contains all letters of the alphabet.`,
    },
  ];

  for (const note of notes) {
    await prisma.note.create({
      data: {
        title: note.title,
        file: Buffer.from(note.content, 'utf-8'),
      },
    });
  }

  console.log('🌱 Seed data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
