
// 'use client';
import { auth } from '@/lib/auth';
import AssignedUser from './_components/AssignedUser';
// import React, { useEffect, useState } from 'react';

const TaskCard = async ({params}: { params: { taskId: string } }) => {
  const session = await auth()
  console.log("session-----------------------------------------------------------------------------")
  console.log(session)
  const userId = session?.user?.id;
  const taskId = params.taskId;
  console.log("taskId", taskId);
  
  // const [tasks, setTasks] = useState([]);

  // TODO: 'use client'と'use server'が被ってしまっているので、serviceフォルダにfetchの関数を分ける
  // 'https://api.example.com/...'
  const fetchTasks = async () => {
    
    const response = await fetch(`http://localhost:3000/api/users/${userId}/tasks/${taskId}`);
    // console.log(response);
    const data = await response.json();
    return data.tasks
  };

  const fetchAssignedUsers = async () => {
    
    const response = await fetch(`http://localhost:3000/api/users/${userId}/assignedUsers`);
    // console.log(response);
    const data = await response.json();
    return data.users
  };

  const tasks = await fetchTasks();
  const assignedUsers = await fetchAssignedUsers();
  
  return (
    <div>
      {tasks.map((task: any) => (
        <div key={task.id} className="task-card">
          <h2>{task.title}</h2>
          <p>Created by: {task.createUser.name}</p>
          <div className="subtasks">
            {task.subTasks.map((subTask: any) => {
              // console.log("subTask");
              // console.log(subTask);
              return (
                <div key={subTask.id} className="subtask-card">
                  <h3>{subTask.title}</h3>
                  <p>Deadline: {new Date(subTask.deadline).toLocaleDateString()}</p>
                  <p>Description: {subTask.description}</p>
                  <p>Assigned to: {subTask.responsibleUser.name}</p>
                  <p>Assigned Users: {assignedUsers.map((user: any) => <AssignedUser user={user} taskId={taskId} subtaskId={subTask.id} />)}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
