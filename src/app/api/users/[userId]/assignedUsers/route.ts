import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAssignedUsers(userId: string) {
    // ユーザーが割り当てたユーザーを取得
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            assignedBy: {
                include: {
                    assignedTo: true,
                },
            },
        },
    });

    // assignedByの配列からassignedToユーザーのみを抽出
    const assignedUsers = user?.assignedBy.map((relation: any) => relation.assignedTo);

    return assignedUsers;
}

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    console.log(request)
    const userId = params.userId;
    console.log("userId", userId);
    if (!userId) {
        return new Response(JSON.stringify({ error: 'userId is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    const users = await getAssignedUsers(userId);
    console.log(users);
    return new Response(JSON.stringify({ users }), {
        headers: { 'Content-Type': 'application/json' },
    });
}



export async function POST(
    request: Request,
    { params }: { params: { userId: string } }
) {
    const userId = params.userId;
    const { assignedUserId } = await request.json();
    console.log("userId", userId);
    if (!userId || !assignedUserId) {
        return new Response(JSON.stringify({ error: 'userId and assignedUserEmail are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // メールアドレスからユーザーを検索
    const assignedUser = await prisma.user.findUnique({
        where: {
            id: assignedUserId,
        },
    });

    if (!assignedUser) {
        return new Response(JSON.stringify({ error: 'User with this email does not exist' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const newAssignment = await prisma.assignedByToAssignedTo.create({
        data: {
            assignedById: userId,
            assignedToId: assignedUser.id,
        },
    });
    console.log(newAssignment);
    return new Response(JSON.stringify({ newAssignment }), {
        headers: { 'Content-Type': 'application/json' },
    });
}