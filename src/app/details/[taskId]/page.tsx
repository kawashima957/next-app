'use server';

import { auth } from '@/lib/auth';
import SubTaskCard from './_components/SubTaskCard'; // SubTaskCardをインポート
// import React, { useEffect, useState } from 'react';

const TaskCard = async ({params}: { params: { taskId: string } }) => {
  const session = await auth()
  console.log("session-----------------------------------------------------------------------------")
  console.log(session)
  const userId = session?.user?.id;
  const taskId = params.taskId;
  

  // TODO: 'use client'と'use server'が被ってしまっているので、serviceフォルダにfetchの関数を分ける
  // 'https://api.example.com/...'
  const fetchTasks = async () => {
    
    const response = await fetch(`http://localhost:3000/api/users/${userId}/tasks/${taskId}`);
    const data = await response.json();
    return data.tasks
  };

  const fetchAssignedUsers = async () => {
    
    const response = await fetch(`http://localhost:3000/api/users/${userId}/assignedUsers`);
    const data = await response.json();
    return data.users
  };

  const tasks: any[] = await fetchTasks();
  const initialAssignedUsers: any[] = await fetchAssignedUsers();
  
  return (
    <div>
      {tasks.map((task: any) => (
        <div key={task.id} className="task-card">
          <h2>{task.title}</h2>
          <p>Created by: {task.createUser.name}</p>
          <div>
            {tasks.map((task: any) => (
              <div key={task.id} className="task-card">
                <h2>{task.title}</h2>
                <p>Created by: {task.createUser.name}</p>
                <div className="subtasks">
                  {task.subTasks.map((subTask: any) => (
                    userId && <SubTaskCard key={subTask.id} userId={userId} subTask={subTask} taskId={taskId} initialAssignedUsers={initialAssignedUsers} /> // SubTaskCardコンポーネントを使用
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
