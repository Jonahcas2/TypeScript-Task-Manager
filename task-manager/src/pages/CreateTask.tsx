import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../contexts/TaskContext';
import TaskForm from '../components/TaskForm';
import type { TaskFormData } from '../types';

const CreateTask: React.FC = () => {
    const { user } = useAuth0();
    const { addTask } = useTaskContext();
    const navigate = useNavigate();

    const handleSubmit = (FormData: TaskFormData) => {
        if (user?.sub) {
            addTask({
                ...FormData, userId: user.sub,
            });
            navigate('/');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Create New Task</h1>
            <TaskForm onSubmit={handleSubmit}
            submitButtonText='Create Task' />
        </div>
    );
};

export default CreateTask;