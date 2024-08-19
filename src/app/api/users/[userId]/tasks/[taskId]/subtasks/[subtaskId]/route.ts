import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function assignUserToSubTask(userId: string, taskId: string, subtaskId: string, assignedUserId: string) {
    // サブタスクを検索し、responsibleUserIdを更新
    const updatedSubTask = await prisma.subTask.update({
        where: {
            id: subtaskId,
        },
        data: {
            responsibleUserId: assignedUserId,
        },
    });

    return updatedSubTask;
}

export async function PUT(
    request: Request,
    { params }: { params: { userId: string, taskId: string, subtaskId: string } }
) {
    const userId = params.userId;
    const taskId = params.taskId;
    const subtaskId = params.subtaskId;
    const { assignedUserId } = await request.json();
    if (!userId || !taskId || !subtaskId || !assignedUserId) {
        return new Response(JSON.stringify({ error: 'userId, taskId, subtaskId and assignedUserId are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    const updatedSubTask = await assignUserToSubTask(userId, taskId, subtaskId, assignedUserId);
    return new Response(JSON.stringify({ updatedSubTask }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
