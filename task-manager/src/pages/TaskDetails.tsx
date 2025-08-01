import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTaskContext } from '../contexts/TaskContext';

const TaskDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getTaskById } = useTaskContext();

    const task = id ? getTaskById(id) : undefined;

    if (!task) {
        return (
            <div style={{padding: '20px'}}>
                <h1>Task not found</h1>
                <Link to="/">Back to Dashboard</Link>
            </div>
        );
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return '#ff4444';
            case 'medium': return '#ffaa00';
            case 'low': return '#44ff44';
            default: return '#888';
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>{task.title}</h1>

            <div style={{ marginBottom: '20px' }}>
                <span style={{
                    backgroundColor: getPriorityColor(task.priority),
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: '15px',
                    fontSize: '14px',
                    marginRight: '10px',
                }}>{task.priority.toUpperCase()}PRIORITY</span>
                <span style={{
                    backgroundColor: task.status === 'completed' ? '#28a745' : task.status === 'in-progress' ? '#007bff' : '#6c757d',
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: '15px',
                    fontSize: '14px'
                }}>
                    {task.status.toUpperCase().replace('-', ' ')}
                </span>
            </div>

            <div style={{backgroundColor: '#f8f9fa', padding: '20px', 
                borderRadius: '8px', marginBottom: '20px'}}>
                    <h3>Description</h3>
                    <p>{task.description}</p>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
                <div>
                    <h4>Due Date</h4>
                    <p>{new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                <div>
                    <h4>Created</h4>
                    <p>{new Date(task.createdAt).toLocaleDateString()}</p>
                </div>
            </div>

            <div style={{display: 'flex', gap: '10px'}}>
                <Link to={`/edit-task/${task.id}`}>
                    <button style={{padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px'}}>
                        Back to Dashboard
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TaskDetails;