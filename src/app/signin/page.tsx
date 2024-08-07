import { auth, signIn } from "@/lib/auth";

export default async function SignInPage() {
    return (
        <form action={async () => {
          'use server';
          await signIn('google', { redirectTo: '/list' });
        }}>
          <button>サインイン</button>
        </form>
      );
}