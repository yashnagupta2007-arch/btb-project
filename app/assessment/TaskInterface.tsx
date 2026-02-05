'use client';

import { useState, useEffect } from 'react';
import { Task, TaskSubmission } from '../types';

interface TaskInterfaceProps {
  userId: string;
  domain: string;
  onComplete: () => void;
}

export default function TaskInterface({ userId, domain, onComplete }: TaskInterfaceProps) {
  const [task, setTask] = useState<Task | null>(null);
  const [submission, setSubmission] = useState<TaskSubmission>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await fetch(`/api/tasks/random?domain=${domain}`);
        if (!response.ok) {
          throw new Error('Failed to fetch task');
        }
        const data = await response.json();
        setTask(data.task);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchTask();
  }, [domain]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    try {
      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          taskId: task.id,
          submission,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit assessment');
      }

      onComplete();
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSubmission({ ...submission, code: e.target.value });
  };

  if (isLoading) {
    return <div>Loading task...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!task) {
    return <div>No task found for the selected domain.</div>;
  }

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p><strong>Time Limit:</strong> {task.timeLimit} minutes</p>
      <div dangerouslySetInnerHTML={{ __html: task.prompt }} />

      <form onSubmit={handleSubmit}>
        {task.inputType === 'code' && (
          <textarea
            value={submission.code || ''}
            onChange={handleCodeChange}
            rows={10}
            style={{ width: '100%', fontFamily: 'monospace' }}
            placeholder="Write your code here..."
          />
        )}
        {/* Add other input types as needed */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
