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

// --- HELPER & ICON COMPONENTS ---
export const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.55a2 2 0 01.45 2.4l-1.3 2.6a2 2 0 01-2.4 1H5a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h3a2 2 0 012 2v1z" /></svg>;
export const SpinnerIcon = () => <svg className="animate-spin h-12 w-12 text-sky-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;
export const StudentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
export const FacultyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6a4 4 0 11-8 0 4 4 0 018 0zM12 15v5a2 2 0 002 2h2a2 2 0 002-2v-5m-4 0v-5a2 2 0 012-2h2a2 2 0 012 2v5" /></svg>;
export const AdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

export const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
        <div className="text-center">
            <SpinnerIcon />
            <p className="text-sky-400 mt-4 text-lg">Loading Dashboard...</p>
        </div>
    </div>
);

export const RoleSelectionPage = ({ onSelectRole }) => (
    <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-white"><span className="text-sky-500">True</span>Presence</h1>
                <p className="text-gray-400 mt-3 text-lg">Please select your role to continue</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div onClick={() => onSelectRole('Student')} className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center cursor-pointer hover:border-sky-500 hover:bg-gray-800/70 transition-all duration-300">
                    <StudentIcon />
                    <h2 className="text-2xl font-bold text-white mt-4">Student</h2>
                </div>
                <div onClick={() => onSelectRole('Faculty')} className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center cursor-pointer hover:border-sky-500 hover:bg-gray-800/70 transition-all duration-300">
                    <FacultyIcon />
                    <h2 className="text-2xl font-bold text-white mt-4">Faculty</h2>
                </div>
                <div onClick={() => onSelectRole('Administration')} className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center cursor-pointer hover:border-sky-500 hover:bg-gray-800/70 transition-all duration-300">
                    <AdminIcon />
                    <h2 className="text-2xl font-bold text-white mt-4">Administration</h2>
                </div>
            </div>
        </div>
    </div>
);

export const LoginPage = ({ onLogin, userRole }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = e.target.elements.id.value;
        onLogin(id);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white"><span className="text-sky-500">True</span>Presence</h1>
                    <p className="text-gray-400 mt-2">{userRole} Portal Login</p>
                </div>
                <div className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-sky-900/20">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="id" className="block text-sm font-medium text-gray-300">{userRole === 'Student' ? 'Roll Number' : 'User ID'}</label>
                                <input type="text" id="id" defaultValue={
                                    userRole === 'Student' ? '24B055' :
                                    userRole === 'Faculty' ? 'FAC101' : 'ADM201'
                                } className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                                <input type="password" id="password" defaultValue="password" className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition" />
                            </div>
                        </div>
                        <div className="mt-8">
                            <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export const ColorKeyModal = ({ onClose }) => (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 transition-opacity duration-300 animate-fade-in">
        <div onClick={(e) => e.stopPropagation()} className="card bg-gray-800 border border-gray-700 w-full max-w-md p-6 relative transform transition-all duration-300 animate-scale-in">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors duration-300"><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
            <h3 className="text-xl font-bold text-white mb-6">Attendance Color Key</h3>
            <ul className="space-y-4">
                <li className="flex items-center"><span className="w-5 h-5 rounded-full bg-green-500 mr-4 shadow-sm"></span><div><p className="font-semibold text-gray-200">Excellent (85%+)</p><p className="text-sm text-gray-400">Well above minimum.</p></div></li>
                <li className="flex items-center"><span className="w-5 h-5 rounded-full bg-yellow-500 mr-4 shadow-sm"></span><div><p className="font-semibold text-gray-200">Good (75%-84%)</p><p className="text-sm text-gray-400">Requirement met.</p></div></li>
                <li className="flex items-center"><span className="w-5 h-5 rounded-full bg-red-500 mr-4 shadow-sm"></span><div><p className="font-semibold text-gray-200">Low (&lt;75%)</p><p className="text-sm text-gray-400">Attendance is below minimum.</p></div></li>
            </ul>
        </div>
    </div>
);