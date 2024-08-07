import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getTasksAndSubTasks(userId: string) {
    // ユーザーがcreateUserであるタスクとそのサブタスクを取得
    const tasksAsCreateUser = await prisma.task.findMany({
        where: {
            createUserId: userId,
        },
        include: {
            createUser: true,
            subTasks: {
                include: {
                    responsibleUser: true, // responsibleUserも取得
                    },
                },
            }
        });

    // ユーザーがresponsibleUserであるサブタスクを含むタスクとそのサブタスクを取得
    const tasksAsResponsibleUser = await prisma.task.findMany({
        where: {
            createUserId: {
                not: userId, // createUserが異なるタスクのみを取得
            },
            subTasks: {
                some: {
                    responsibleUserId: userId,
                },
            },
        },
        include: {
            createUser: true,
            subTasks: {
                where: {
                    responsibleUserId: userId,
                },
                include: {
                    responsibleUser: true, // responsibleUserも取得
                },
            },
        },
    });

    // 結果をマージして返す
    const allTasks = [...tasksAsCreateUser, ...tasksAsResponsibleUser];
    return allTasks;
}

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    // const url = new URL(request.url);
    // const userId = url.searchParams.get('userId');
    const userId = params.userId;
    console.log("userId", userId);
    if (!userId) {
        return new Response(JSON.stringify({ error: 'userId is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    const tasks = await getTasksAndSubTasks(userId);
    console.log(tasks);
    return new Response(JSON.stringify({ tasks }), {
        headers: { 'Content-Type': 'application/json' },
    });
}