'use client'
const AssignedUser = ({ user, taskId, subtaskId }: { user: any, taskId: string, subtaskId: string }) => {
    const handleUserClick = async (userId: string, taskId: string, subtaskId: string) => { // taskIdとsubtaskIdを再度追加
      console.log('User clicked:', userId);
    const response = await fetch(`http://localhost:3000/api/users/${userId}/tasks/${taskId}/subtasks/${subtaskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignedUserId: userId }),
    });
    const data = await response.json();
    console.log(data);
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