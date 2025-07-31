import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Task Management App</h1>
            <button onClick={() => loginWithRedirect()}>Log In</button>
        </div>
    );
};

export default LoginPage;