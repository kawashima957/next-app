
'use server';

import { auth } from '@/lib/auth';
import Link from 'next/link';
import TaskCreationForm from './_components/TaskCreationForm';
// import React, { useEffect, useState } from 'react';

const TaskCard = async () => {
  const session = await auth()
  const userId = session?.user?.id;

  const fetchTasks = async () => {
    
    const response = await fetch(`https://main.d3kknqrhe7d2sh.amplifyapp.com/api/users/${userId}/tasks`);
    const data = await response.json();
    return data.tasks
  };

  const tasks = await fetchTasks();

  return (
    <div>
      {userId && <TaskCreationForm userId={userId}/>}
      {tasks.map((task: any) => (
        <Link href={`/details/${task.id}`} key={task.id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div key={task.id} className="task-card">
            <h2>{task.title}</h2>
            <p>Created by: {task.createUser.name}</p>
            <div className="subtasks">
              {task.subTasks.map((subTask: any) => {
                // TODO: アサインするユーザをモーダルメニューで選択できるようにする
                return (
                  <div key={subTask.id} className="subtask-card">
                    <h3>{subTask.title}</h3>
                    <p>Deadline: {new Date(subTask.deadline).toLocaleDateString()}</p>
                    <p>Description: {subTask.description}</p>
                    <p>Assigned to: {subTask.responsibleUser.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TaskCard;
