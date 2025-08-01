import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../contexts/TaskContext';
import TaskForm from '../components/TaskForm';
import type { TaskFormData } from '../types';

const EditTask: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const { getTaskById, updateTask } = useTaskContext();
    const navigate = useNavigate();

    const task = id ? getTaskById(id) : undefined;

    if (!task) {
        return <div>Task not found</div>;
    }

    const initialData: TaskFormData = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate,
    };

    const handleSubmit = (formData: TaskFormData) => {
        if (id) {
            updateTask(id,formData);
            navigate('/');
        }
    };

    return (
        <div style={{padding: '20px'}}>
            <h1>Edit Task</h1>
            <TaskForm
            initialData={initialData}
            onSubmit={handleSubmit}
            submitButtonText='Update Task' />
        </div>
    );
};

export default EditTask;
