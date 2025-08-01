import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTaskContext } from '../contexts/TaskContext';
import { Link } from 'react-router-dom';
import type { Task } from '../types';

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth0();
    const { tasks, deleteTask } = useTaskContext();

    const handleDeleteTask = (id: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTask(id);
        }
    };

    const getTasksByStatus = (status: Task['status']) => {
        return tasks.filter(task => task.status === status);
    };

    const getPriorityColor = (priority: Task['priority']) => {
        switch (priority) {
            case 'high': return '#ff4444';
            case 'medium': return '#ffaa00';
            case 'low': return '#44ff44';
            default: return '#888';
        }
    };

    return (
        <div style={{padding: '20px'}}>
            <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
                <h1>Task Dashboard</h1>
                <div>
                    <span>Welcome, {user?.name}</span>
                    <button
                    onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}
                    style={{marginLeft: '10px', padding: '5px 10px'}}>Logout</button>
                </div>
            </header>

            <div style={{marginBottom: '20px'}}>
                <Link to="/create-task">
                    <button style={{padding: '10px 20px', 
                        backgroundColor: '#28a745', color: 'white', 
                        border: 'none', borderRadius: '4px'}}>Create New Task
                    </button>
                </Link>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
                <div>
                    <h3>Pending ({getTasksByStatus('pending').length})</h3>
                    {getTasksByStatus('pending').map(task => (
                        <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
                    ))}
                </div>

                <div>
                    <h3>In Progress ({getTasksByStatus('in-progress').length})</h3>
                    {getTasksByStatus('in-progress').map(task => (
                        <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
                    ))}
                </div>

                <div>
                    <h3>Completed ({getTasksByStatus('completed').length})</h3>
                    {getTasksByStatus('completed').map(task => (
                        <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
                    ))}
                </div>
            </div>
        </div>
    );
};

interface TaskCardProps {
    task: Task;
    onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({task, onDelete}) => {
    const getPriorityColor = (priority: Task['priority']) => {
        switch (priority) {
            case 'high': return '#ff4444';
            case 'medium': return '#ffaa00';
            case 'low': return '#44ff44';
            default: return '#888';
        }
    };

    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '10px',
            backgroundColor: '#f9f9f9'
        }}>
            <h4 style={{marginTop: '0'}}>{task.title}</h4>
            <p style={{color: '#666', fontSize: '14px'}}>{task.description}</p>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px'}}>
                <span style={{
                    backgroundColor: getPriorityColor(task.priority),
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px'
                }}>
                    {task.priority.toUpperCase()}
                </span>
                <span style={{fontSize: '12px', color: '#666'}}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
            </div>
            <div style={{marginTop: '10px', display: 'flex', gap: '5px'}}>
                <Link to={`/task/${task.id}`}>
                    <button style={{padding: '5px 10px', fontSize: '12px'}}>View</button>
                </Link>
                <Link to={`/edit-task/${task.id}`}>
                    <button style={{padding: '5px 10px', fontSize: '12px'}}>Edit</button>
                </Link>
                <button 
                onClick={() => onDelete(task.id)}
                style={{padding: '5px 10px', fontSize: '12px', backgroundColor: '#dc3545', color: 'white', border: 'none'}}>Delete</button>
            </div>
        </div>
    );
};

export default Dashboard;