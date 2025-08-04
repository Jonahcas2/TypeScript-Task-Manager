import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './contexts/TaskContext';
import { auth0Config } from './auth/auth0-config';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import CallbackPage from './pages/CallbackPage';

const App: React.FC = () => {
  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: auth0Config.redirectUri,
      }}
    >
      <TaskProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/callback" element={<CallbackPage />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/task/:id" element={
                <ProtectedRoute>
                  <TaskDetails />
                </ProtectedRoute>
              } />
              <Route path="/create-task" element={
                <ProtectedRoute>
                  <CreateTask />
                </ProtectedRoute>
              } />
              <Route path="/edit-task/:id" element={
                <ProtectedRoute>
                  <EditTask />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </TaskProvider>
    </Auth0Provider>
  );
};

export default App;