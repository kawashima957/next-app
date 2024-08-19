
'use client';

import { auth } from '@/lib/auth';
import Link from 'next/link';
import TaskCreationForm from './_components/TaskCreationForm';
// import React, { useEffect, useState } from 'react';

const TaskCard = async () => {
  const session = await auth()
  const userId = session?.user?.id;
  // const [tasks, setTasks] = useState([]);

  // TODO: 'use client'と'use server'が被ってしまっているので、serviceフォルダにfetchの関数を分ける
  // 'https://api.example.com/...'
  const fetchTasks = async () => {
    
    const response = await fetch(`http://localhost:3000/api/users/${userId}/tasks`);
    const data = await response.json();
    return data.tasks
  };

  const tasks = await fetchTasks();

  const onTaskCreate = async () => {
    console.log("onTaskCreate")
  }

  return (
    <div>
      {userId && <TaskCreationForm userId={userId} onCreateTask={onTaskCreate}/>}
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
