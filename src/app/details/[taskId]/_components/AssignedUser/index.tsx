'use client'
const AssignedUser = ({ user, taskId, subtaskId, onUserClick }: { user: any, taskId: string, subtaskId: string, onUserClick: (user: any) => void }) => {
    const handleUserClick = async (userId: string, taskId: string, subtaskId: string) => {
      const response = await fetch(`http://localhost:3000/api/users/${userId}/tasks/${taskId}/subtasks/${subtaskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignedUserId: userId }),
      });
      const data = await response.json();
      onUserClick(user); // ユーザーがクリックされたときに親コンポーネントの関数を呼び出す
    };
  
    return (
      <span 
        key={user.id} 
        onClick={() => handleUserClick(user.id, taskId, subtaskId)} // taskIdとsubtaskIdをここで渡す
        style={{ cursor: 'pointer' }}
      >
        {user.name}
      </span>
    );
};
  
export default AssignedUser;