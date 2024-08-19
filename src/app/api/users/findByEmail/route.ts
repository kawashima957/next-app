import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function POST(
  request: Request,
) {
  const { email } = await request.json(); // リクエストボディからメールアドレスを取得

  try {
    const user = await prisma.user.findUnique({ where: { email } }); // メールアドレスに対応するユーザーを取得
    if (!user) {
      // ユーザーが見つからない場合は404エラーを返す
      return new Response(JSON.stringify({ error: 'User with this email does not exist' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // ユーザーが見つかった場合はそのユーザーを返す
      return new Response(JSON.stringify({ user: user }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    // サーバーエラーが発生した場合は500エラーを返す
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}