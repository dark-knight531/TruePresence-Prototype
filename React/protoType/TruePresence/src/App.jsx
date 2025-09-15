import React, { useState, useEffect } from 'react';
import { mockDatabase, RoleSelectionPage, LoginPage, LoadingOverlay } from './components/common.jsx';
import { StudentDashboardPage } from './components/studentDashBoard.jsx';
import { FacultyDashboardPage } from './components/facultyDashBoard.jsx';
import { AdminDashboardPage } from './components/adminDashBoard.jsx';
import { updateMockDatabase } from './components/common.jsx';

// --- MAIN APP COMPONENT ---
export default function App() {
    const [view, setView] = useState('roleSelection');
    const [userRole, setUserRole] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Simulated API call
    const fetchUserData = (role, id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const roleKey = role.toLowerCase();
                if (mockDatabase[roleKey] && mockDatabase[roleKey][id]) {
                    resolve(mockDatabase[roleKey][id]);
                } else {
                    reject(new Error("User not found"));
                }
            }, 1500);
        });
    };

    const handleLogin = async (id) => {
        setIsLoading(true);
        try {
            const data = await fetchUserData(userRole, id);
            setUserData(data);
            setView('dashboard');
        } catch (error) {
            console.error(error);
            alert("Login failed! Please check the ID.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        setUserRole(null);
        setUserData(null);
        setView('roleSelection');
    };

    const handleBack = () => {
        setUserRole(null);
        setView('roleSelection');
    };

    const updateData = (newData) => {
        setUserData(newData);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js';
        script.crossOrigin = 'anonymous';
        script.async = true;
        document.body.appendChild(script);

        const drawingScript = document.createElement('script');
        drawingScript.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js';
        drawingScript.crossOrigin = 'anonymous';
        drawingScript.async = true;
        document.body.appendChild(drawingScript);

        const style = document.createElement('style');
        style.textContent = `
            .card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
            .card:hover { transform: translateY(-5px); }
            .progress-circle { transition: stroke-dashoffset 1s ease-out; }
            .tab-active { border-bottom-color: #0ea5e9; color: #0ea5e9; }
            @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
            .animate-fade-in { animation: fade-in 0.3s ease-out; }
            @keyframes scale-in { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
            .animate-scale-in { animation: scale-in 0.3s ease-out; }
        `;
        document.head.append(style);

        return () => {
            const scripts = document.querySelectorAll('script[src*="mediapipe"]');
            scripts.forEach(s => document.body.removeChild(s));
            style.remove();
        };
    }, []);

    const handleSelectRole = (role) => {
        setUserRole(role);
        setView('login');
    };

    const renderContent = () => {
        if (isLoading) {
            return <LoadingOverlay />;
        }
        if (view === 'roleSelection') {
            return <RoleSelectionPage onSelectRole={handleSelectRole} isDarkMode={isDarkMode} />;
        }
        if (view === 'login') {
            return <LoginPage onLogin={handleLogin} onBack={handleBack} userRole={userRole} isDarkMode={isDarkMode} />;
        }
        if (view === 'dashboard' && userData) {
            switch (userRole) {
                case 'Student':
                    return <StudentDashboardPage userData={userData} onLogout={handleLogout} updateUserData={updateData} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
                case 'Faculty':
                    return <FacultyDashboardPage userData={userData} onLogout={handleLogout} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
                case 'Administration':
                    return <AdminDashboardPage userData={userData} onLogout={handleLogout} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
                default:
                    return <RoleSelectionPage onSelectRole={handleSelectRole} isDarkMode={isDarkMode} />;
            }
        }
        return <RoleSelectionPage onSelectRole={handleSelectRole} isDarkMode={isDarkMode} />;
    };

    return (
        <div className={`min-h-screen antialiased font-sans ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-900'}`}>
            {renderContent()}
        </div>
    );
}