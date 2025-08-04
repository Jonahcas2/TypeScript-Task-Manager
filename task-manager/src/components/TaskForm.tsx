import React, { useState } from 'react';
import type { TaskFormData, FormErrors } from '../types';

interface TaskFormProps {
  initialData?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
  submitButtonText: string;
}

// Helper function to format date for HTML date input (YYYY-MM-DD)
const formatDateForInput = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
};

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const TaskForm: React.FC<TaskFormProps> = ({ 
  initialData, 
  onSubmit, 
  submitButtonText 
}) => {
  const [formData, setFormData] = useState<TaskFormData>(() => {
    if (initialData) {
      return {
        ...initialData,
        dueDate: formatDateForInput(initialData.dueDate),
      };
    }
    return {
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending',
      dueDate: '',
    };
  });

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
      newErrors.dueDate = 'Due date is required';
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Convert date back to ISO string for storage
      const submitData: TaskFormData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : '',
      };
      onSubmit(submitData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
        {errors.title && <span style={{ color: 'red', fontSize: '14px' }}>{errors.title}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          style={{ width: '100%', padding: '8px', marginTop: '5px', resize: 'vertical' }}
        />
        {errors.description && <span style={{ color: 'red', fontSize: '14px' }}>{errors.description}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          min={getTodayDate()}
          style={{ 
            width: '100%', 
            padding: '8px', 
            marginTop: '5px',
            fontSize: '16px' // Prevents zoom on mobile
          }}
        />
        {errors.dueDate && <span style={{ color: 'red', fontSize: '14px' }}>{errors.dueDate}</span>}
      </div>

      <button 
        type="submit" 
        style={{ 
          padding: '12px 24px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default TaskForm;