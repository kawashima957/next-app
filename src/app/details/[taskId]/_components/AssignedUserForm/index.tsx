import { useState } from 'react';

export default function AssignedUserForm({ onUserFound }: { onUserFound: (user: any) => void }) {
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージの状態を追加

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const response = await fetch('/api/users/findByEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username }),
        });
        const responseData = await response.json(); // レスポンスデータを取得
        if (response.ok) {
            onUserFound(responseData.user); // ユーザーが見つかったので、onUserFoundを呼び出す
            setErrorMessage(''); // エラーメッセージをクリア
        } else {
            setErrorMessage(responseData.error); // エラーメッセージを設定
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="User name" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button type="submit">Add</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}