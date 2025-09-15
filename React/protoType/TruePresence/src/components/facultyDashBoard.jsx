import React, { useState, useEffect } from 'react';
import { InfoIcon } from './common.jsx';

// --- FACULTY DASHBOARD COMPONENTS ---
const MyClassesContent = ({ facultyData }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facultyData.classes.map(cls => (
            <div key={cls.code} className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-lg shadow-sky-900/10">
                <h3 className="text-xl font-bold text-white">{cls.name}</h3>
                <p className="text-sky-400 font-medium">{cls.code}</p>
                <p className="text-gray-400 mt-2">{cls.totalStudents} Students</p>
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-300">Average Attendance: {cls.averageAttendance}%</p>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                        <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${cls.averageAttendance}%` }}></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);
const TakeAttendanceContent = ({ facultyData }) => {
    const [sessionActive, setSessionActive] = useState(false);
    const [markedStudents, setMarkedStudents] = useState([]);

    useEffect(() => {
        let interval;
        if (sessionActive) {
            interval = setInterval(() => {
                setMarkedStudents(prev => {
                    if (prev.length < facultyData.studentsInClass.length) {
                        return [...prev, facultyData.studentsInClass[prev.length]];
                    }
                    clearInterval(interval);
                    setSessionActive(false);
                    return prev;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [sessionActive, facultyData.studentsInClass]);

    const startSession = () => {
        setMarkedStudents([]);
        setSessionActive(true);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Start a New Session</h2>
                <p className="text-gray-400 mb-6">Select a class to begin taking attendance.</p>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white mb-4">
                    {facultyData.classes.map(cls => <option key={cls.code}>{cls.name} ({cls.code})</option>)}
                </select>
                <button onClick={startSession} disabled={sessionActive} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg disabled:bg-sky-800 disabled:cursor-not-allowed">
                    {sessionActive ? 'Session in Progress...' : 'Start Live Session'}
                </button>
            </div>
            <div className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Live Feed ({markedStudents.length}/{facultyData.studentsInClass.length})</h2>
                <div className="h-64 overflow-y-auto space-y-2 pr-2">
                    {markedStudents.map((student, index) => (
                         <div key={index} className="flex items-center bg-gray-700/50 p-2 rounded-md animate-fade-in">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-gray-300">{student.name}</span>
                         </div>
                    ))}
                    {!sessionActive && markedStudents.length === 0 && <p className="text-gray-500 text-center pt-20">Start a session to see live results.</p>}
                </div>
            </div>
        </div>
    );
};
const FacultyReportsContent = ({ facultyData }) => (
     <div className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Class Attendance Reports</h2>
        <div className="space-y-6">
            {facultyData.classes.map(cls => (
                <div key={cls.code}>
                     <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-gray-300 text-lg">{cls.name}</p>
                        <p className="font-bold text-sky-400 text-lg">{cls.averageAttendance}%</p>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-4">
                        <div className="bg-sky-500 h-4 rounded-full" style={{ width: `${cls.averageAttendance}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
     </div>
);

export const FacultyDashboardPage = ({ userData, onLogout }) => {
    const [activeTab, setActiveTab] = useState('myClasses');
    
    return (
         <div className="p-4 sm:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-6">
                <div><h1 className="text-3xl font-bold text-white"><span className="text-sky-500">True</span>Presence</h1></div>
                <div className="flex items-center space-x-4">
                     <div className="text-right hidden sm:block">
                        <p className="font-semibold text-white">{userData.name}</p>
                        <p className="text-sm text-gray-400">{userData.department}</p>
                    </div>
                    <button onClick={onLogout} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">Logout</button>
                </div>
            </header>
            <nav className="border-b border-gray-700 mb-8">
                <div className="flex space-x-8">
                    <button onClick={() => setActiveTab('myClasses')} className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 text-gray-400 hover:text-sky-500 ${activeTab === 'myClasses' ? 'tab-active' : 'border-transparent'}`}>My Classes</button>
                    <button onClick={() => setActiveTab('takeAttendance')} className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 text-gray-400 hover:text-sky-500 ${activeTab === 'takeAttendance' ? 'tab-active' : 'border-transparent'}`}>Take Attendance</button>
                    <button onClick={() => setActiveTab('reports')} className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 text-gray-400 hover:text-sky-500 ${activeTab === 'reports' ? 'tab-active' : 'border-transparent'}`}>Reports</button>
                </div>
            </nav>
            <main>
                {activeTab === 'myClasses' && <MyClassesContent facultyData={userData} />}
                {activeTab === 'takeAttendance' && <TakeAttendanceContent facultyData={userData} />}
                {activeTab === 'reports' && <FacultyReportsContent facultyData={userData} />}
            </main>
        </div>
    );
};