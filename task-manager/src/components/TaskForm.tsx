import React, { useState } from 'react';
import type { TaskFormData, FormErrors } from '../types';

interface TaskFormProps {
    initialData?: TaskFormData;
    onSubmit: (data: TaskFormData) => void;
    submitButtonText: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
    initialData,
    onSubmit,
    submitButtonText
}) => {
    const [formData, setFormData] = useState<TaskFormData>(
        initialData || {
            title: '',
            description: '',
            priority: 'medium',
            status: 'pending',
            dueDate: '',
        }
    );

    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.dueDate) {
            newErrors.dueDate = "Due date is required";
        } else if (new Date(formData.dueDate) < new Date()) {
            newErrors.dueDate = "Due date cannot be in the past";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData)
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="title">Title:</label>
                <input type="text"
                id='title' name='title'
                value={formData.title}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
                {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
            </div>

            <div style={{marginBottom: '15px'}}>
                <label htmlFor="description">Description:</label>
                <textarea name="description" id="description"
                value={formData.description}
                onChange={handleChange} rows={4}
                style={{width: '100%', padding: '8px', marginTop: '5px'}} />
                {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
            </div>

            <div style={{marginBottom: '15px'}}>
                <label htmlFor="priority">Priority:</label>
                <select name="priority" id="priority"
                value={formData.priority} onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div style={{marginBottom: '15px'}}>
                <label htmlFor="status">Status:</label>
                <select name="status" id="status"
                value={formData.status} onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div style={{marginBottom: '15px'}}>
                <label htmlFor="dueDate">Due Date:</label>
                <input type="date" id='dueDate' 
                value={formData.dueDate} onChange={handleChange}
                style={{width: '100%', padding: '8px', marginTop: '5px'}} />
                {errors.dueDate && <span style={{ color: 'red' }}>{errors.dueDate}</span>}
            </div>

            <button type='submit' style={{ padding: '10px 20px', backgroundColor: '#007bff', 
                color: 'white', border: 'none', borderRadius: '4px' }}>
                    {submitButtonText}
                </button>
        </form>
    );
};

export default TaskForm;