import { useState } from 'react';

export default function TaskCreationForm({ userId, onCreateTask }: { userId: string, onCreateTask: () => void }) {
    const [taskdescription, setTaskdescription] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージの状態を追加

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log('taskdescription', taskdescription);
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Task description" value={taskdescription} onChange={(e) => setTaskdescription(e.target.value)} />
                <button type="submit">Add</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}