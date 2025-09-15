import React, { useState, useEffect } from 'react';
import { InfoIcon, SpinnerIcon } from './common.jsx';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// --- MOCK DATA FOR THE NEW FEATURES ---
const mockFacultyData = {
    'FAC101': {
        name: 'Dr. Alok Sharma',
        facultyId: 'FAC101',
        department: 'Computer Science',
        allSubjects: {
            '1st Year': [
                { name: 'Introduction to Programming', code: 'CS101', type: 'Lecture', totalStudents: 60, averageAttendance: 90 },
                { name: 'Programming Lab', code: 'CS102', type: 'Lab', totalStudents: 60, averageAttendance: 95 },
            ],
            '2nd Year': [
                { name: 'Data Structures & Algorithms', code: 'CS203', type: 'Lecture', totalStudents: 55, averageAttendance: 85 },
                { name: 'Data Structures Lab', code: 'CS204', type: 'Lab', totalStudents: 55, averageAttendance: 88 },
                { name: 'Object Oriented Programming', code: 'CS205', type: 'Lecture', totalStudents: 52, averageAttendance: 76 },
            ],
            '3rd Year': [
                { name: 'Discrete Mathematics', code: 'CS301', type: 'Lecture', totalStudents: 50, averageAttendance: 72 },
                { name: 'Database Management Systems', code: 'CS302', type: 'Lecture', totalStudents: 50, averageAttendance: 78 },
            ],
            '4th Year': [
                { name: 'Artificial Intelligence', code: 'CS401', type: 'Lecture', totalStudents: 45, averageAttendance: 89 },
            ],
            'M.Tech': [
                { name: 'Advanced Algorithms', code: 'MT501', type: 'Lecture', totalStudents: 15, averageAttendance: 98 },
            ],
            'Ph.D.': [
                { name: 'Research Methodology', code: 'PHD601', type: 'Seminar', totalStudents: 5, averageAttendance: 100 },
            ],
        },
        allStudents: {
            'CS101': [
                { id: '25C001', name: 'Student 1', attendance: 90, attendanceRecord: [{ date: '2025-09-14', status: 'Present' }, { date: '2025-09-13', status: 'Present' }] },
                { id: '25C002', name: 'Student 2', attendance: 88, attendanceRecord: [{ date: '2025-09-14', status: 'Present' }, { date: '2025-09-13', status: 'Absent' }] },
            ],
            'CS203': [
                { id: '24B055', name: 'Sumit Sahu', attendance: 85, attendanceRecord: [{ date: '2025-09-14', status: 'Present' }, { date: '2025-09-13', status: 'Present' }] },
                { id: '24B056', name: 'Alia Khan', attendance: 92, attendanceRecord: [{ date: '2025-09-14', status: 'Present' }, { date: '2025-09-13', status: 'Present' }] },
                { id: '24B057', name: 'John Doe', attendance: 70, attendanceRecord: [{ date: '2025-09-14', status: 'Absent' }, { date: '2025-09-13', status: 'Present' }] },
                { id: '24B058', name: 'Jane Smith', attendance: 75, attendanceRecord: [{ date: '2025-09-14', status: 'Present' }, { date: '2025-09-13', status: 'Absent' }] },
            ],
            'CS205': [
                { id: '24B055', name: 'Sumit Sahu', attendance: 76, attendanceRecord: [{ date: '2025-09-14', status: 'Present' }, { date: '2025-09-13', status: 'Present' }] },
                { id: '24B060', name: 'Priya Mehta', attendance: 65, attendanceRecord: [{ date: '2025-09-14', status: 'Present' }, { date: '2025-09-13', status: 'Absent' }] },
                { id: '24B061', name: 'Rahul Patel', attendance: 81, attendanceRecord: [{ date: '2025-09-14', status: 'Present' }, { date: '2025-09-13', status: 'Present' }] },
            ]
        }
    }
};

// --- HELPER COMPONENTS ---
const SubjectCard = ({ subject, onClick, isDarkMode }) => {
    const cardClass = isDarkMode ? 'bg-gray-800/50 border-gray-700/50 text-gray-300' : 'bg-white border-gray-300/50 text-gray-900';
    const titleClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const subTitleClass = isDarkMode ? 'text-sky-400' : 'text-sky-600';
    const barBgClass = isDarkMode ? 'bg-gray-700' : 'bg-gray-300';
    
    return (
        <div onClick={onClick} className={`card p-6 rounded-2xl cursor-pointer hover:border-sky-500 transition-all duration-300 ${cardClass}`}>
            <h3 className={`text-xl font-bold ${titleClass}`}>{subject.name}</h3>
            <p className={`font-medium ${subTitleClass}`}>{subject.code} - {subject.type}</p>
            <p className={`text-gray-400 mt-2`}>{subject.totalStudents} Students</p>
            <div className="mt-4">
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Average Attendance: {subject.averageAttendance}%</p>
                <div className={`w-full rounded-full h-2.5 mt-1 ${barBgClass}`}>
                    <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${subject.averageAttendance}%` }}></div>
                </div>
            </div>
        </div>
    );
};

const StudentsInClassModal = ({ subject, students, onClose, isDarkMode }) => {
    const modalClass = isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-900';
    const listClass = isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200';
    
    return (
        <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div onClick={(e) => e.stopPropagation()} className={`card w-full max-w-2xl p-6 relative animate-scale-in ${modalClass}`}>
                <button onClick={onClose} className={`absolute top-3 right-3 text-gray-500 hover:text-white transition-colors duration-300`}><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                <h3 className="text-xl font-bold mb-6">{subject.name} ({subject.code})</h3>
                <p className="font-medium mb-4">{subject.totalStudents} Students Registered</p>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {students.map(student => (
                        <div key={student.id} className={`flex items-center justify-between p-3 rounded-lg ${listClass}`}>
                            <p className="font-semibold">{student.name} ({student.id})</p>
                            <p className="text-sm">{student.attendance}%</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AttendanceReportModal = ({ subject, students, onClose, isDarkMode }) => {
    const studentsAtRisk = students.filter(s => s.attendance < 75);
    const modalClass = isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-900';
    const tableHeaderClass = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
    const riskCardClass = isDarkMode ? 'bg-red-900/30 border-red-500 text-red-300' : 'bg-red-100 border-red-500 text-red-800';

    const barChartData = {
        labels: students.map(s => s.name),
        datasets: [{
            label: 'Attendance %',
            data: students.map(s => s.attendance),
            backgroundColor: students.map(s => s.attendance < 75 ? '#ef4444' : '#10b981'),
        }]
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Student Attendance Breakdown', color: isDarkMode ? '#e5e7eb' : '#4b5563' },
        },
        scales: {
            x: {
                ticks: { color: isDarkMode ? '#d1d5db' : '#4b5563' },
                grid: { color: isDarkMode ? '#374151' : '#e5e7eb' }
            },
            y: {
                min: 0,
                max: 100,
                ticks: { color: isDarkMode ? '#d1d5db' : '#4b5563' },
                grid: { color: isDarkMode ? '#374151' : '#e5e7eb' }
            },
        }
    };

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div onClick={(e) => e.stopPropagation()} className={`card w-full max-w-4xl p-6 relative animate-scale-in ${modalClass}`}>
                <button onClick={onClose} className={`absolute top-3 right-3 text-gray-500 hover:text-white transition-colors duration-300`}><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                <h3 className="text-xl font-bold mb-6">{subject.name} ({subject.code}) - Attendance Report</h3>
                
                <div className="overflow-x-auto mb-6 max-h-64 overflow-y-auto">
                    <table className="w-full text-left">
                        <thead className={`sticky top-0 ${tableHeaderClass}`}>
                            <tr className="border-b border-gray-700">
                                <th className="p-3">Student Name</th>
                                <th className="p-3">ID</th>
                                <th className="p-3">Status (2025-09-14)</th>
                                <th className="p-3">Status (2025-09-13)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id} className="border-b border-gray-700/50">
                                    <td className="p-3">{student.name}</td>
                                    <td className="p-3">{student.id}</td>
                                    {student.attendanceRecord.map((rec, index) => (
                                        <td key={index} className={`p-3 font-semibold ${rec.status === 'Present' ? 'text-green-500' : 'text-red-500'}`}>{rec.status}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="mb-6">
                    <h4 className="text-lg font-bold mb-2">Class Attendance Chart</h4>
                    <div className="p-4 rounded-lg" style={{ height: '300px' }}>
                        <Bar data={barChartData} options={barChartOptions} />
                    </div>
                </div>

                {studentsAtRisk.length > 0 && (
                    <div className={`card border-l-4 p-4 rounded-lg ${riskCardClass}`}>
                        <h4 className="text-lg font-bold mb-2">Students Below 75% Attendance</h4>
                        <ul className="space-y-1">
                            {studentsAtRisk.map(student => (
                                <li key={student.id} className="flex justify-between">
                                    <span>{student.name} ({student.id})</span>
                                    <span className="font-bold">{student.attendance}%</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- FACULTY DASHBOARD MAIN COMPONENTS ---
const MyClassesContent = ({ facultyData, isDarkMode }) => {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const titleClass = isDarkMode ? 'text-white' : 'text-gray-900';

    return (
        <div>
            <div className="space-y-8">
                {Object.entries(facultyData.allSubjects).map(([year, subjects]) => (
                    <div key={year}>
                        <h2 className={`text-2xl font-bold mb-4 ${titleClass}`}>{year}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subjects.map(subject => (
                                <SubjectCard key={subject.code} subject={subject} onClick={() => setSelectedSubject(subject)} isDarkMode={isDarkMode} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {selectedSubject && (
                <StudentsInClassModal 
                    subject={selectedSubject} 
                    students={mockFacultyData.allStudents[selectedSubject.code] || []}
                    onClose={() => setSelectedSubject(null)}
                    isDarkMode={isDarkMode}
                />
            )}
        </div>
    );
};

const TakeAttendanceContent = ({ facultyData, isDarkMode }) => {
    const [sessionActive, setSessionActive] = useState(false);
    const [markedStudents, setMarkedStudents] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [timer, setTimer] = useState(15);
    const [manualTime, setManualTime] = useState('15');

    useEffect(() => {
        let interval;
        if (sessionActive && markedStudents.length < mockFacultyData.allStudents[selectedSubject.code].length) {
            interval = setInterval(() => {
                setMarkedStudents(prev => {
                    if (prev.length < mockFacultyData.allStudents[selectedSubject.code].length) {
                        return [...prev, mockFacultyData.allStudents[selectedSubject.code][prev.length]];
                    } else {
                        clearInterval(interval);
                        setSessionActive(false);
                        return prev;
                    }
                });
            }, 2000);
        } else if (sessionActive && timer === 0) {
            setSessionActive(false);
        }
        return () => clearInterval(interval);
    }, [sessionActive, markedStudents.length, selectedSubject, timer]);

    useEffect(() => {
        let timerInterval;
        if (sessionActive) {
            timerInterval = setInterval(() => {
                setTimer(prev => {
                    if (prev === 0) {
                        clearInterval(timerInterval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerInterval);
    }, [sessionActive]);

    const startSession = () => {
        setMarkedStudents([]);
        setSessionActive(true);
        setTimer(parseInt(manualTime, 10));
    };

    const stopSession = () => {
        setSessionActive(false);
    };

    const cardClass = isDarkMode ? 'bg-gray-800/50 border-gray-700/50 text-gray-300' : 'bg-white border-gray-300/50 text-gray-900';
    const titleClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const inputClass = isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-900';
    const buttonClass = isDarkMode ? 'bg-sky-600 hover:bg-sky-700 text-white' : 'bg-sky-600 hover:bg-sky-700 text-white';
    const listClass = isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-200 text-gray-700';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`card p-8 rounded-2xl ${cardClass}`}>
                <h2 className={`text-2xl font-bold mb-4 ${titleClass}`}>Start a New Session</h2>
                <div className="space-y-4">
                    {Object.entries(facultyData.allSubjects).map(([year, subjects]) => (
                        <div key={year}>
                            <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`}>{year}</h3>
                            <div className="grid grid-cols-1 gap-2 mt-2">
                                {subjects.map(subject => (
                                    <button
                                        key={subject.code}
                                        onClick={() => setSelectedSubject(subject)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors duration-300 ${listClass} ${selectedSubject?.code === subject.code ? 'border-2 border-sky-500' : 'border-2 border-transparent'}`}
                                    >
                                        <p className="font-semibold">{subject.name} ({subject.code})</p>
                                        <p className="text-sm text-gray-400">{subject.type}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {selectedSubject && (
                    <div className="mt-6">
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Session Duration (seconds)</label>
                        <input
                            type="number"
                            value={manualTime}
                            onChange={(e) => setManualTime(e.target.value)}
                            min="1"
                            className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500 transition ${inputClass}`}
                        />
                    </div>
                )}
                <div className="mt-8 flex gap-4">
                    <button
                        onClick={startSession}
                        disabled={sessionActive || !selectedSubject}
                        className={`w-full font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg disabled:bg-gray-600 disabled:cursor-not-allowed ${buttonClass}`}
                    >
                        Start Live Session
                    </button>
                    <button
                        onClick={stopSession}
                        disabled={!sessionActive}
                        className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg disabled:bg-gray-600 disabled:cursor-not-allowed`}
                    >
                        Stop Session
                    </button>
                </div>
            </div>
            <div className={`card p-8 rounded-2xl ${cardClass}`}>
                <h2 className={`text-2xl font-bold mb-4 ${titleClass}`}>Live Feed</h2>
                {sessionActive && selectedSubject ? (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-lg font-semibold">{selectedSubject.name}</p>
                            <p className="text-xl font-bold text-sky-500">
                                {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}
                            </p>
                        </div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Marked: ({markedStudents.length}/{mockFacultyData.allStudents[selectedSubject.code].length})</p>
                        <div className="h-64 overflow-y-auto space-y-2 pr-2 mt-4">
                            {markedStudents.map((student, index) => (
                                <div key={index} className={`flex items-center p-2 rounded-md animate-fade-in ${listClass}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{student.name}</span>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className={`text-center pt-20 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {selectedSubject ? 'Press "Start Live Session" to begin.' : 'Select a subject to start.'}
                    </p>
                )}
            </div>
        </div>
    );
};

const FacultyReportsContent = ({ facultyData, isDarkMode }) => {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const cardClass = isDarkMode ? 'bg-gray-800/50 border-gray-700/50 text-gray-300' : 'bg-white border-gray-300/50 text-gray-900';
    const titleClass = isDarkMode ? 'text-white' : 'text-gray-900';

    return (
        <div>
            <div className="space-y-8">
                {Object.entries(facultyData.allSubjects).map(([year, subjects]) => (
                    <div key={year}>
                        <h2 className={`text-2xl font-bold mb-4 ${titleClass}`}>{year}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subjects.map(subject => (
                                <div key={subject.code} onClick={() => setSelectedSubject(subject)} className={`card p-6 rounded-2xl cursor-pointer hover:border-sky-500 transition-all duration-300 ${cardClass}`}>
                                    <h3 className="text-xl font-bold">{subject.name}</h3>
                                    <p className="text-sky-500 font-medium">{subject.code} - {subject.type}</p>
                                    <p className="text-gray-400 mt-2">Average Attendance: {subject.averageAttendance}%</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {selectedSubject && (
                <AttendanceReportModal 
                    subject={selectedSubject} 
                    students={mockFacultyData.allStudents[selectedSubject.code] || []}
                    onClose={() => setSelectedSubject(null)}
                    isDarkMode={isDarkMode}
                />
            )}
        </div>
    );
};

export const FacultyDashboardPage = ({ userData, onLogout, isDarkMode, toggleTheme }) => {
    const navClass = isDarkMode ? 'border-gray-700' : 'border-gray-300';
    const tabClass = isDarkMode ? 'text-gray-400 hover:text-sky-500' : 'text-gray-500 hover:text-sky-600';
    const headerTextClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const subheaderTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
    const buttonClass = isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800';
    const themeButtonClass = isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' : 'bg-gray-300 hover:bg-gray-400 text-gray-800';

    const [activeTab, setActiveTab] = useState('myClasses');

    const facultyData = { ...userData, ...mockFacultyData['FAC101'] };

    return (
        <div className={`p-4 sm:p-6 lg:p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <header className="flex justify-between items-center mb-6">
                <div><h1 className={`text-3xl font-bold ${headerTextClass}`}><span className="text-sky-500">True</span>Presence</h1></div>
                <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                        <p className={`font-semibold ${headerTextClass}`}>{facultyData.name}</p>
                        <p className={`text-sm ${subheaderTextClass}`}>{facultyData.department}</p>
                    </div>
                    <button onClick={toggleTheme} className={`font-bold py-2 px-4 rounded-lg transition-colors duration-300 ${themeButtonClass}`}>
                        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                    </button>
                    <button onClick={onLogout} className={`font-bold py-2 px-4 rounded-lg transition-colors duration-300 ${buttonClass}`}>Logout</button>
                </div>
            </header>
            <nav className={`border-b mb-8 ${navClass}`}>
                <div className="flex space-x-8">
                    <button onClick={() => setActiveTab('myClasses')} className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 ${tabClass} ${activeTab === 'myClasses' ? 'tab-active' : 'border-transparent'}`}>My Classes</button>
                    <button onClick={() => setActiveTab('takeAttendance')} className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 ${tabClass} ${activeTab === 'takeAttendance' ? 'tab-active' : 'border-transparent'}`}>Take Attendance</button>
                    <button onClick={() => setActiveTab('reports')} className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 ${tabClass} ${activeTab === 'reports' ? 'tab-active' : 'border-transparent'}`}>Reports</button>
                </div>
            </nav>
            <main>
                {activeTab === 'myClasses' && <MyClassesContent facultyData={facultyData} isDarkMode={isDarkMode} />}
                {activeTab === 'takeAttendance' && <TakeAttendanceContent facultyData={facultyData} isDarkMode={isDarkMode} />}
                {activeTab === 'reports' && <FacultyReportsContent facultyData={facultyData} isDarkMode={isDarkMode} />}
            </main>
        </div>
    );
};