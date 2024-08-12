'use client'

import React, { useState } from 'react'; // useStateをインポート
import AssignedUser from '../AssignedUser';

const SubTaskCard = ({ subTask, taskId, assignedUsers }: { subTask: any, taskId: string, assignedUsers: any[] }) => {
    const [responsibleUser, setResponsibleUser] = useState(subTask.responsibleUser); // responsibleUserの状態を管理

    const handleUserClick = (user: any) => {
      setResponsibleUser(user);
    };

  return (
    <div key={subTask.id} className="subtask-card">
      <h3>{subTask.title}</h3>
      <p>Deadline: {new Date(subTask.deadline).toLocaleDateString()}</p>
      <p>Description: {subTask.description}</p>
      <p>Assigned to: {responsibleUser.name}</p>
      <p>Assigned Users: {assignedUsers.map((user: any) => <AssignedUser user={user} taskId={taskId} subtaskId={subTask.id} onUserClick={handleUserClick} />)}</p> 
    </div>
  );
};

export default SubTaskCard;