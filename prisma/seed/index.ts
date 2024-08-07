import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$transaction(async () => {
    // ユーザーを複数作成
    const userAlice = await prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@example.com',
      },
    });

    const userBob = await prisma.user.create({
      data: {
        name: 'Bob',
        email: 'k0906yuki@gmail.com',
      },
    });

    const userCharlie = await prisma.user.create({
      data: {
        name: 'Charlie',
        email: 'charlie@example.com',
      },
    });

    // タスクを複数作成
    const task1 = await prisma.task.create({
      data: {
        title: 'Task 1',
        createUserId: userAlice.id,
      },
    });

    const task2 = await prisma.task.create({
      data: {
        title: 'Task 2',
        createUserId: userBob.id,
      },
    });

    const task3 = await prisma.task.create({
      data: {
        title: 'Task 3',
        createUserId: userCharlie.id,
      },
    });

    // サブタスクを複数作成
    const subTask1_1 = await prisma.subTask.create({
      data: {
        title: 'SubTask 1-1',
        deadline: new Date(),
        // responsible: 'Bob',
        description: 'This is a subtask 1-1',
        taskId: task1.id,
        responsibleUserId: userAlice.id,
      },
    });

    const subTask1_2 = await prisma.subTask.create({
      data: {
        title: 'SubTask 1-2',
        deadline: new Date(),
        // responsible: 'Charlie',
        description: 'This is a subtask 1-2',
        taskId: task1.id,
        responsibleUserId: userAlice.id,
      },
    });

    const subTask2_1 = await prisma.subTask.create({
      data: {
        title: 'SubTask 2-1',
        deadline: new Date(),
        // responsible: 'Alice',
        description: 'This is a subtask 2-1',
        taskId: task2.id,
        responsibleUserId: userBob.id,
      },
    });

    const subTask3_1 = await prisma.subTask.create({
      data: {
        title: 'SubTask 3-1',
        deadline: new Date(),
        // responsible: 'Alice',
        description: 'This is a subtask 3-1',
        taskId: task3.id,
        responsibleUserId: userAlice.id,
      },
    });

    return { userAlice, userBob, userCharlie, task1, task2, task3, subTask1_1, subTask1_2, subTask2_1, subTask3_1 };
  });

  console.log(result);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });