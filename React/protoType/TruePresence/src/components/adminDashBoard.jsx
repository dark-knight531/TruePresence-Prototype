import React, { useState } from 'react';
import { SpinnerIcon } from './common.jsx';

// --- ADMIN DASHBOARD COMPONENTS ---
const AdminAnalyticsContent = ({ adminData }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gray-800/50 p-6 rounded-2xl text-center"><h3 className="text-gray-400 text-lg">Overall Attendance</h3><p className="text-4xl font-bold text-white mt-2">{adminData.analytics.overallAttendance}%</p></div>
        <div className="card bg-gray-800/50 p-6 rounded-2xl text-center"><h3 className="text-gray-400 text-lg">Students At-Risk</h3><p className="text-4xl font-bold text-red-500 mt-2">{adminData.analytics.studentsAtRisk}</p></div>
        <div className="card bg-gray-800/50 p-6 rounded-2xl text-center"><h3 className="text-gray-400 text-lg">Total Students</h3><p className="text-4xl font-bold text-white mt-2">{adminData.analytics.totalStudents}</p></div>
        <div className="card bg-gray-800/50 p-6 rounded-2xl text-center"><h3 className="text-gray-400 text-lg">Total Faculty</h3><p className="text-4xl font-bold text-white mt-2">{adminData.analytics.totalFaculty}</p></div>
        <div className="md:col-span-2 lg:col-span-4 card bg-gray-800/50 p-6 rounded-2xl"><h3 className="text-gray-400 text-lg mb-2">Top Performing Class</h3><p className="text-xl font-bold text-sky-400">{adminData.analytics.topPerformingClass}</p></div>
    </div>
);
const ManageUsersContent = ({ adminData }) => (
    <div className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="p-3">ID</th><th className="p-3">Name</th><th className="p-3">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {adminData.allUsers.map(user => (
                        <tr key={user.id} className="border-b border-gray-700/50">
                            <td className="p-3">{user.id}</td><td className="p-3">{user.name}</td><td className="p-3"><span className={`px-2 py-1 rounded-full text-sm ${user.role === 'Student' ? 'bg-sky-900 text-sky-300' : 'bg-green-900 text-green-300'}`}>{user.role}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
const AdminReportsContent = () => (
     <div className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Institution Reports</h2>
        <p className="text-gray-400 mb-6">Generate comprehensive attendance reports for compliance and accreditation.</p>
        <button onClick={() => alert('Generating report...')} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg">
            Generate End-of-Semester Report
        </button>
     </div>
);

export const AdminDashboardPage = ({ userData, onLogout }) => {
     const [activeTab, setActiveTab] = useState('analytics');
    
    return (
         <div className="p-4 sm:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-6">
                <div><h1 className="text-3xl font-bold text-white"><span className="text-sky-500">True</span>Presence</h1></div>
                 <div className="flex items-center space-x-4">
                     <div className="text-right hidden sm:block">
                        <p className="font-semibold text-white">{userData.name}</p>
                        <p className="text-sm text-gray-400">{userData.role}</p>
                    </div>
                    <button onClick={onLogout} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">Logout</button>
                </div>
            </header>
            <nav className="border-b border-gray-700 mb-8">
                <div className="flex space-x-8">
                     <button onClick={() => setActiveTab('analytics')} className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 text-gray-400 hover:text-sky-500 ${activeTab === 'analytics' ? 'tab-active' : 'border-transparent'}`}>Analytics</button>
                     <button onClick={() => setActiveTab('manageUsers')} className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 text-gray-400 hover:text-sky-500 ${activeTab === 'manageUsers' ? 'tab-active' : 'border-transparent'}`}>Manage Users</button>
                     <button onClick={() => setActiveTab('reports')} className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 text-gray-400 hover:text-sky-500 ${activeTab === 'reports' ? 'tab-active' : 'border-transparent'}`}>Institution Reports</button>
                </div>
            </nav>
            <main>
                {activeTab === 'analytics' && <AdminAnalyticsContent adminData={userData} />}
                {activeTab === 'manageUsers' && <ManageUsersContent adminData={userData} />}
                {activeTab === 'reports' && <AdminReportsContent />}
            </main>
        </div>
    );
};