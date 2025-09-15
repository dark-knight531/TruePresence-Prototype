import React from 'react';

// --- MOCK DATABASE (Simulates a database) ---
export const mockDatabase = {
    student: {
        '24B055': {
            name: 'Sumit Sahu',
            rollNumber: '24B055',
            branch: 'Computer Science & Engineering',
            semester: '3rd',
            email: 'sumitsahu1684@gmail.com',
            overallAttendance: 82,
            subjects: [
                { name: 'Discrete Mathematics', code: 'CS201', attendance: 92 },
                { name: 'Data Structures & Algorithms', code: 'CS203', attendance: 85 },
                { name: 'Object Oriented Programming', code: 'CS205', attendance: 76 },
                { name: 'Digital Logic Design', code: 'EE201', attendance: 71 },
                { name: 'Engineering Economics', code: 'HS201', attendance: 88 },
            ],
            recentActivity: [
                { subject: 'Discrete Mathematics', status: 'Present', date: '2025-09-14' },
                { subject: 'Data Structures & Algorithms', status: 'Present', date: '2025-09-14' },
                { subject: 'Digital Logic Design', status: 'Absent', date: '2025-09-13' },
                { subject: 'Object Oriented Programming', status: 'Present', date: '2025-09-13' },
            ]
        }
    },
    faculty: {
        'FAC101': {
            name: 'Dr. Alok Sharma',
            facultyId: 'FAC101',
            department: 'Computer Science',
            classes: [
                { name: 'Data Structures & Algorithms', code: 'CS203', totalStudents: 55, averageAttendance: 85 },
                { name: 'Object Oriented Programming', code: 'CS205', totalStudents: 52, averageAttendance: 76 },
            ],
            studentsInClass: [ {name: 'Anjali Sharma'}, {name: 'Rohan Verma'}, {name: 'Priya Singh'}, {name: 'Amit Patel'}, {name: 'Sneha Reddy'} ]
        }
    },
    administration: {
        'ADM201': {
            name: 'Mr. Rajesh Gupta',
            adminId: 'ADM201',
            role: 'Academic Administrator',
            analytics: {
                overallAttendance: 84,
                studentsAtRisk: 12,
                topPerformingClass: 'Discrete Mathematics (92%)',
                totalStudents: 1250,
                totalFaculty: 85,
            },
            allUsers: [
                { id: '24B055', name: 'Sumit Sahu', role: 'Student'},
                { id: '24B061', name: 'Neha Jain', role: 'Student'},
                { id: 'FAC101', name: 'Dr. Alok Sharma', role: 'Faculty'},
                { id: 'FAC102', name: 'Dr. Meera Desai', role: 'Faculty'},
            ]
        }
    }
};

// New function to update the mock database and return a fresh copy
export const updateMockDatabase = (role, id, newData) => {
    mockDatabase[role.toLowerCase()][id] = newData;
    return mockDatabase[role.toLowerCase()][id];
};

// --- HELPER & ICON COMPONENTS ---
export const InfoIcon = ({ isDarkMode }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const CameraIcon = ({ isDarkMode }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 mx-auto ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.55a2 2 0 01.45 2.4l-1.3 2.6a2 2 0 01-2.4 1H5a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h3a2 2 0 012 2v1z" /></svg>;
export const SpinnerIcon = () => <svg className="animate-spin h-12 w-12 text-sky-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;
export const StudentIcon = ({ isDarkMode }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 mx-auto ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
export const FacultyIcon = ({ isDarkMode }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 mx-auto ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6a4 4 0 11-8 0 4 4 0 018 0zM12 15v5a2 2 0 002 2h2a2 2 0 002-2v-5m-4 0v-5a2 2 0 012-2h2a2 2 0 012 2v5" /></svg>;
export const AdminIcon = ({ isDarkMode }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 mx-auto ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
export const BackIcon = ({ isDarkMode }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;

export const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
        <div className="text-center">
            <SpinnerIcon />
            <p className="text-sky-400 mt-4 text-lg">Loading Dashboard...</p>
        </div>
    </div>
);

export const RoleSelectionPage = ({ onSelectRole, isDarkMode }) => {
    const backgroundClass = isDarkMode ? 'bg-gradient-to-br from-gray-900 to-purple-950 text-gray-300' : 'bg-white from-gray-50 to-gray-100 text-gray-900';
    const cardClass = isDarkMode ? 'bg-gray-800/50 border-gray-700/50 text-white' : 'bg-white border-gray-300/50 text-gray-900';
    const glowClass = isDarkMode ? 'shadow-sky-900/10' : 'shadow-gray-300/10';
    const titleClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const subtitleClass = isDarkMode ? 'text-gray-300' : 'text-gray-500';

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${backgroundClass} background-animate relative overflow-hidden`}>
            {isDarkMode && (
                <>
                    <div className="absolute inset-0 z-0 opacity-40" style={{ backgroundImage: 'radial-gradient(ellipse at bottom, #2b3a6b 0%, #000 100%)' }}></div>
                    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" style={{ backgroundSize: '2px 2px', backgroundImage: 'radial-gradient(#ffffff20 1px, transparent 1px)' }}></div>
                </>
            )}
            
            <div className="w-full max-w-4xl mx-auto z-10">
                <div className="text-center mb-10">
                    <h1 className={`text-5xl sm:text-6xl font-extrabold ${titleClass} leading-tight`}>
                        <span className="text-sky-500">True</span>Presence
                    </h1>
                    <p className={`text-xl font-light mt-4 ${subtitleClass}`}>Your intelligent attendance system</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div onClick={() => onSelectRole('Student')} className={`role-card group relative overflow-hidden backdrop-blur-sm border ${cardClass} rounded-3xl p-10 text-center cursor-pointer transition-all duration-500 hover:scale-105 ${glowClass}`}>
                        <div className="absolute inset-0 z-0 bg-gradient-to-br from-cyan-500 to-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-40 rounded-3xl blur-xl"></div>
                        <div className="relative z-10">
                            <StudentIcon isDarkMode={isDarkMode} />
                            <h2 className="text-3xl font-bold mt-6">Student</h2>
                            <p className="mt-2">Track your progress</p>
                        </div>
                    </div>
                    <div onClick={() => onSelectRole('Faculty')} className={`role-card group relative overflow-hidden backdrop-blur-sm border ${cardClass} rounded-3xl p-10 text-center cursor-pointer transition-all duration-500 hover:scale-105 ${glowClass}`}>
                        <div className="absolute inset-0 z-0 bg-gradient-to-br from-fuchsia-500 to-rose-500 opacity-0 transition-opacity duration-500 group-hover:opacity-40 rounded-3xl blur-xl"></div>
                        <div className="relative z-10">
                            <FacultyIcon isDarkMode={isDarkMode} />
                            <h2 className="text-3xl font-bold mt-6">Faculty</h2>
                            <p className="mt-2">Manage your classes</p>
                        </div>
                    </div>
                    <div onClick={() => onSelectRole('Administration')} className={`role-card group relative overflow-hidden backdrop-blur-sm border ${cardClass} rounded-3xl p-10 text-center cursor-pointer transition-all duration-500 hover:scale-105 ${glowClass}`}>
                        <div className="absolute inset-0 z-0 bg-gradient-to-br from-emerald-500 to-sky-500 opacity-0 transition-opacity duration-500 group-hover:opacity-40 rounded-3xl blur-xl"></div>
                        <div className="relative z-10">
                            <AdminIcon isDarkMode={isDarkMode} />
                            <h2 className="text-3xl font-bold mt-6">Administration</h2>
                            <p className="mt-2">Oversee campus data</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const LoginPage = ({ onLogin, onBack, userRole, isDarkMode }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = e.target.elements.id.value;
        onLogin(id);
    };

    const backgroundClass = isDarkMode ? 'bg-gradient-to-br from-gray-900 to-purple-950 text-gray-300' : 'bg-white from-gray-50 to-gray-100 text-gray-900';
    const cardClass = isDarkMode ? 'bg-gray-800/50 border-gray-700/50 text-gray-300' : 'bg-white border-gray-300/50 text-gray-900';
    const titleClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const inputClass = isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-sky-500' : 'bg-gray-200 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-sky-600';
    const buttonClass = isDarkMode ? 'bg-sky-600 hover:bg-sky-700 text-white' : 'bg-sky-600 hover:bg-sky-700 text-white';

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${backgroundClass} background-animate relative overflow-hidden`}>
            {isDarkMode && (
                <>
                    <div className="absolute inset-0 z-0 opacity-40" style={{ backgroundImage: 'radial-gradient(ellipse at bottom, #2b3a6b 0%, #000 100%)' }}></div>
                    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" style={{ backgroundSize: '2px 2px', backgroundImage: 'radial-gradient(#ffffff20 1px, transparent 1px)' }}></div>
                </>
            )}
            <div className="w-full max-w-md z-10">
                <button onClick={onBack} className="absolute top-4 left-4 p-2 rounded-full z-20">
                    <BackIcon isDarkMode={isDarkMode} />
                </button>
                <div className="text-center mb-8">
                    <h1 className={`text-4xl font-bold ${titleClass}`}>
                        <span className="text-sky-500">True</span>Presence
                    </h1>
                    <p className="text-gray-400 mt-2">{userRole} Portal Login</p>
                </div>
                <div className={`card backdrop-blur-sm border rounded-2xl p-8 shadow-2xl relative ${cardClass} ${isDarkMode ? 'shadow-sky-900/20' : 'shadow-sky-500/10'}`}>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="id" className="block text-sm font-medium">
                                    {userRole === 'Student' ? 'Roll Number' : 'User ID'}
                                </label>
                                <input
                                    type="text"
                                    id="id"
                                    defaultValue={
                                        userRole === 'Student' ? '24B055' :
                                        userRole === 'Faculty' ? 'FAC101' : 'ADM201'
                                    }
                                    className={`mt-1 block w-full rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:border-transparent transition ${inputClass}`}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    defaultValue="password"
                                    className={`mt-1 block w-full rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:border-transparent transition ${inputClass}`}
                                />
                            </div>
                        </div>
                        <div className="mt-8">
                            <button
                                type="submit"
                                className={`w-full font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg ${buttonClass}`}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export const ColorKeyModal = ({ onClose, isDarkMode }) => (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 transition-opacity duration-300 animate-fade-in">
        <div onClick={(e) => e.stopPropagation()} className={`card w-full max-w-md p-6 relative transform transition-all duration-300 animate-scale-in ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
            <button onClick={onClose} className={`absolute top-3 right-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Attendance Color Key</h3>
            <ul className="space-y-4">
                <li className="flex items-center"><span className="w-5 h-5 rounded-full bg-green-500 mr-4 shadow-sm"></span><div><p className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Excellent (85%+)</p><p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Well above minimum.</p></div></li>
                <li className="flex items-center"><span className="w-5 h-5 rounded-full bg-yellow-500 mr-4 shadow-sm"></span><div><p className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Good (75%-84%)</p><p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Requirement met.</p></div></li>
                <li className="flex items-center"><span className="w-5 h-5 rounded-full bg-red-500 mr-4 shadow-sm"></span><div><p className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Low (&lt;75%)</p><p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Attendance is below minimum.</p></div></li>
            </ul>
        </div>
    </div>
);