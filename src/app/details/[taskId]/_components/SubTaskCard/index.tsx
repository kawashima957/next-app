'use client'

import React, { useState } from 'react'; // useStateをインポート
import AssignedUser from '../AssignedUser';
import AssignedUserForm from '../AssignedUserForm';

const SubTaskCard = ({ userId, subTask, taskId, initialAssignedUsers }: { userId: string, subTask: any, taskId: string, initialAssignedUsers: any[] }) => {
    const [responsibleUser, setResponsibleUser] = useState(subTask.responsibleUser); // responsibleUserの状態を管理
    const [assignedUsers, setAssignedUsers] = useState(initialAssignedUsers); // assignedUsersの状態を管理

    const handleUserClick = (user: any) => {
      setResponsibleUser(user);
    };

    const handleUserFound = (user: any) => { // 新しいユーザーが見つかったときの処理
      setResponsibleUser(user);
      setAssignedUsers([...assignedUsers, user]); // 新しいユーザーをassignedUsersに追加
    };

  return (
    <div key={subTask.id} className="subtask-card">
      <h3>{subTask.title}</h3>
      <p>Deadline: {new Date(subTask.deadline).toLocaleDateString()}</p>
      <p>Description: {subTask.description}</p>
      <p>Assigned to: {responsibleUser.name}</p>
      <p>Assigned Users: {assignedUsers.map((user: any) => <AssignedUser key={user.id} user={user} taskId={taskId} subtaskId={subTask.id} onUserClick={handleUserClick} />)}</p>
      <div>New Assigned User: 
        <AssignedUserForm userId={userId} taskId={taskId} subtaskId={subTask.id} onUserFound={handleUserFound} />
      </div>
    </div>
  );
};

export default SubTaskCard;