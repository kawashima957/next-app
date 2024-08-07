
// 'use client';
import { auth } from '@/lib/auth';
import Link from 'next/link';
// import React, { useEffect, useState } from 'react';

const TaskCard = async () => {
  const session = await auth()
  console.log("session-----------------------------------------------------------------------------")
  console.log(session)
  const userId = session?.user?.id;
  // const [tasks, setTasks] = useState([]);

  // TODO: 'use client'と'use server'が被ってしまっているので、serviceフォルダにfetchの関数を分ける
  // 'https://api.example.com/...'
  const fetchTasks = async () => {
    
    const response = await fetch(`http://localhost:3000/api/users/${userId}/tasks`);
    // console.log(response);
    const data = await response.json();
    return data.tasks
  };

  const tasks = await fetchTasks();
  // console.log("tasks")
  // console.log(tasks);

  return (
    <div>
      {tasks.map((task: any) => (
        <Link href={`/details/${task.id}`} key={task.id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div key={task.id} className="task-card">
            <h2>{task.title}</h2>
            <p>Created by: {task.createUser.name}</p>
            <div className="subtasks">
              {task.subTasks.map((subTask: any) => {
                // console.log("subTask");
                // console.log(subTask);
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
