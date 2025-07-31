export interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progress' | 'completed';
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    picture?: string;
}

export interface TaskFormData {
    title: string;
    description: string;
    priority: Task['priority'];
    status: Task['status'];
    dueDate: string;
}

export interface AppContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    getTaskById: (id: string) => Task | undefined;
}

export interface FormErrors {
    title?: string;
    description?: string;
    dueDate?: string;
}