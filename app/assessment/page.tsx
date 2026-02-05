'use client';

import { useState } from 'react';
import SkillSelector from '../components/SkillSelector';
import TaskInterface from './TaskInterface'; // Assuming TaskInterface is in the same directory

export default function AssessmentPage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('test-user'); // Replace with actual user ID logic

  const handleDomainSelect = (domain: string) => {
    setSelectedDomain(domain);
  };

  const handleTaskComplete = () => {
    // Handle what happens when the task is complete
    console.log('Task completed!');
  };

  if (!selectedDomain) {
    return <SkillSelector onSelect={handleDomainSelect} />;
  }

  return (
    <TaskInterface
      userId={userId}
      domain={selectedDomain}
      onComplete={handleTaskComplete}
    />
  );
}
