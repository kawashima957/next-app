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

    // userAliceからuserBobへの割り当てを作成
    const assignment1 = await prisma.assignedByToAssignedTo.create({
      data: {
        assignedById: userAlice.id,
        assignedToId: userBob.id,
      },
    });

    const userCharlie = await prisma.user.create({
      data: {
        name: 'Charlie',
        email: 'charlie@example.com',
      },
    });

    // userBobからuserCharlieへの割り当てを作成
    const assignment2 = await prisma.assignedByToAssignedTo.create({
      data: {
        assignedById: userBob.id,
        assignedToId: userCharlie.id,
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
        description: 'This is a subtask 1-1',
        taskId: task1.id,
        responsibleUserId: userAlice.id,
      },
    });

    const subTask1_2 = await prisma.subTask.create({
      data: {
        title: 'SubTask 1-2',
        deadline: new Date(),
        description: 'This is a subtask 1-2',
        taskId: task1.id,
        responsibleUserId: userAlice.id,
      },
    });

    const subTask2_1 = await prisma.subTask.create({
      data: {
        title: 'SubTask 2-1',
        deadline: new Date(),
        description: 'This is a subtask 2-1',
        taskId: task2.id,
        responsibleUserId: userBob.id,
      },
    });

    const subTask3_1 = await prisma.subTask.create({
      data: {
        title: 'SubTask 3-1',
        deadline: new Date(),
        description: 'This is a subtask 3-1',
        taskId: task3.id,
        responsibleUserId: userAlice.id,
      },
    });

    // 追加のユーザーを作成
    const userDave = await prisma.user.create({
      data: {
        name: 'Dave',
        email: 'dave@example.com',
      },
    });

    // userCharlieからuserDaveへの割り当てを作成
    const assignment3 = await prisma.assignedByToAssignedTo.create({
      data: {
        assignedById: userCharlie.id,
        assignedToId: userDave.id,
      },
    });

    // 追加のタスクを作成
    const task4 = await prisma.task.create({
      data: {
        title: 'Task 4',
        createUserId: userDave.id,
      },
    });

    // 追加のサブタスクを作成
    const subTask4_1 = await prisma.subTask.create({
      data: {
        title: 'SubTask 4-1',
        deadline: new Date(),
        description: 'This is a subtask 4-1',
        taskId: task4.id,
        responsibleUserId: userDave.id,
      },
    });

    return { userAlice, userBob, userCharlie, userDave, assignment1, assignment2, assignment3, task1, task2, task3, task4, subTask1_1, subTask1_2, subTask2_1, subTask3_1, subTask4_1 };
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