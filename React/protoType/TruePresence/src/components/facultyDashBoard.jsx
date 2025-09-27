import React, { useState, useEffect, useMemo } from 'react';
import { InfoIcon, SpinnerIcon } from './common.jsx';

// --- FACULTY DASHBOARD COMPONENTS ---
const MyClassesContent = ({ facultyData, isDarkMode }) => {
    const classes = facultyData?.classes || [];
    
    // Theme-based class definitions
    const cardClass = isDarkMode 
        ? 'bg-gray-800/50 border-gray-700/50 text-gray-300 shadow-sky-900/10' 
        : 'bg-white border-gray-300/50 text-gray-900 shadow-gray-300/10';
    const titleClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const subTitleClass = isDarkMode ? 'text-sky-400' : 'text-sky-600';
    const textClass = isDarkMode ? 'text-gray-400' : 'text-gray-700';
    const progressBgClass = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
    const progressBarClass = 'bg-sky-500';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map(cls => (
                <div key={cls.code} className={`card backdrop-blur-sm border rounded-2xl p-6 shadow-lg ${cardClass}`}>
                    <h3 className={`text-xl font-bold ${titleClass}`}>{cls.name}</h3>
                    <p className={`font-medium ${subTitleClass}`}>{cls.code}</p>
                    <p className={`mt-2 ${textClass}`}>{cls.totalStudents || 'N/A'} Students</p>
                    <div className="mt-4">
                        <p className={`text-sm font-medium ${textClass}`}>Average Attendance: {cls.averageAttendance || 0}%</p>
                        <div className={`w-full rounded-full h-2.5 mt-1 ${progressBgClass}`}>
                            <div className={`${progressBarClass} h-2.5 rounded-full`} style={{ width: `${cls.averageAttendance || 0}%` }}></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ----------------------------------------------------------------------

const TakeAttendanceContent = ({ facultyData, isDarkMode }) => {
    const classes = facultyData?.classes || []; 
    const [sessionActive, setSessionActive] = useState(false);
    const [markedStudents, setMarkedStudents] = useState([]);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const initialClassCode = classes.length > 0 ? classes[0].code : '';
    const [selectedClassCode, setSelectedClassCode] = useState(initialClassCode);
    
    const maxAttendanceLimit = 10; 

    const selectedClass = classes.find(cls => cls.code === selectedClassCode);
    
    // Simulate student list for the selected class (since facultyData structure is simplified)
    const studentsInClass = selectedClass?.students || [
        { name: "Rohaan Sahu", rollNumber: "S001" },
        { name: "Kumar Vishawas", rollNumber: "S002" },
        { name: "Vanshika Singh", rollNumber: "S003" },
        { name: "Ojas chauhan", rollNumber: "S004" },
        { name: "Sumit Sahu", rollNumber: "S005" },
        { name: "Shivansh Sahu", rollNumber: "S006" },
        { name: "Harsh Kumar Singh", rollNumber: "S007" },
        { name: "Isha Rana", rollNumber: "S008" },
        { name: "Samuel Jackson", rollNumber: "S009" },
        { name: "Bhola bhandari", rollNumber: "S010" },
    ];
    
    // Memoize the students to mark for a stable list during the session
    const studentsToMark = useMemo(() => {
        const shuffled = [...studentsInClass].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(shuffled.length, maxAttendanceLimit));
    }, [selectedClassCode, studentsInClass.length]);

    useEffect(() => {
        if (!sessionActive || studentsToMark.length === 0) return;

        let studentIndex = 0;
        const interval = setInterval(() => {
            if (studentIndex < studentsToMark.length) {
                setMarkedStudents(prev => [...prev, studentsToMark[studentIndex]]);
                studentIndex++;
            } else {
                setSessionActive(false); 
                setShowSuccessPopup(true);
                clearInterval(interval);
            }
        }, 1000); 
        
        return () => clearInterval(interval); 
    }, [sessionActive, studentsToMark]);

    const startSession = () => {
        if (!selectedClassCode) return;
        setMarkedStudents([]); 
        setShowSuccessPopup(false);
        setSessionActive(true);
    };
    
    const displayTotal = studentsToMark.length; 

    // Theme-based class definitions
    const cardClass = isDarkMode 
        ? 'bg-gray-800/50 border-gray-700/50 text-gray-300 shadow-sky-900/10' 
        : 'bg-white border-gray-300/50 text-gray-900 shadow-gray-300/10';
    const titleClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const textClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
    const inputClass = isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-900';
    const itemClass = isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100';
    const liveFeedTextClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';

    const startButtonClass = sessionActive 
        ? 'bg-red-600 hover:bg-red-700 text-white' 
        : (isDarkMode ? 'bg-sky-600 hover:bg-sky-700 text-white disabled:bg-sky-800' : 'bg-sky-600 hover:bg-sky-700 text-white disabled:bg-sky-400');
    
    const popupBgClass = isDarkMode ? 'bg-gray-900/70 backdrop-blur-sm' : 'bg-gray-500/50 backdrop-blur-sm';
    const popupCardClass = isDarkMode ? 'bg-gray-800 border-sky-500 text-gray-300' : 'bg-white border-sky-500 text-gray-900';
    const popupTitleClass = 'text-green-500';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Control Panel Card */}
            <div className={`card backdrop-blur-sm border rounded-2xl p-8 text-center ${cardClass}`}>
                <h2 className={`text-2xl font-bold mb-2 ${titleClass}`}>Start a New Session</h2>
                <p className={`mb-6 ${textClass}`}>Select a class to begin taking attendance.</p>
                <select 
                    value={selectedClassCode}
                    onChange={(e) => setSelectedClassCode(e.target.value)}
                    className={`w-full rounded-md py-3 px-4 mb-4 ${inputClass}`}
                    disabled={sessionActive}
                >
                    {classes.map(cls => <option key={cls.code} value={cls.code}>{cls.name} ({cls.code})</option>)}
                </select>
                <button
                    onClick={sessionActive ? () => setSessionActive(false) : startSession}
                    disabled={!selectedClassCode}
                    className={`w-full font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg disabled:cursor-not-allowed ${startButtonClass}`}
                >
                    {sessionActive ? 'End Session' : 'Start Live Session'}
                </button>
            </div>
            
            {/* Live Feed Card */}
            <div className={`card backdrop-blur-sm border rounded-2xl p-8 relative ${cardClass}`}>
                <h2 className={`text-2xl font-bold mb-4 ${titleClass}`}>Live Feed ({markedStudents.length}/{displayTotal})</h2>
                <div className="h-64 overflow-y-auto space-y-2 pr-2">
                    {sessionActive && (
                        <div className="flex items-center text-sky-500 mb-4 animate-pulse">
                            <SpinnerIcon className="h-5 w-5 mr-3" />
                            <span className="font-semibold">Scanning and Marking Attendance...</span>
                        </div>
                    )}
                    {markedStudents.filter(Boolean).map((student, index) => (
                        <div key={student.rollNumber || index} className={`flex items-center p-2 rounded-md animate-fade-in ${itemClass}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className={liveFeedTextClass}>{student.name}</span>
                        </div>
                    ))}
                    {!sessionActive && markedStudents.length === 0 && <p className={`text-center pt-20 ${textClass}`}>Select a class and start a session.</p>}
                </div>

                {/* Success Pop-up */}
                {showSuccessPopup && (
                    <div className={`absolute inset-0 flex items-center justify-center rounded-2xl animate-fade-in ${popupBgClass}`}>
                        <div className={`border rounded-lg p-8 text-center shadow-2xl max-w-sm mx-4 ${popupCardClass}`}>
                            <h3 className={`text-2xl font-bold mb-3 ${popupTitleClass}`}>Success! ✅</h3>
                            <p className="mb-6">
                                Attendance for {markedStudents.length}/{displayTotal} students has been marked successfully.
                            </p>
                            <button 
                                onClick={() => setShowSuccessPopup(false)}
                                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-8 rounded-lg transition-colors"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------

const FacultyReportsContent = ({ facultyData, isDarkMode }) => {
    const classes = facultyData?.classes || [];
    
    // Theme-based class definitions
    const cardClass = isDarkMode 
        ? 'bg-gray-800/50 border-gray-700/50 text-gray-300 shadow-sky-900/10' 
        : 'bg-white border-gray-300/50 text-gray-900 shadow-gray-300/10';
    const titleClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const textClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
    const progressBgClass = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
    const progressTextClass = isDarkMode ? 'text-sky-400' : 'text-sky-600';
    const progressBarClass = 'bg-sky-500';
    const itemClass = isDarkMode ? 'border-gray-700' : 'border-gray-300';
    
    return (
        <div className={`card backdrop-blur-sm border rounded-2xl p-8 shadow-lg max-w-4xl mx-auto ${cardClass}`}>
            <h2 className={`text-2xl font-bold mb-6 ${titleClass}`}>Class Attendance Reports</h2>
            <div className="space-y-6">
                {classes.map(cls => (
                    <div key={cls.code} className={`border-b pb-4 ${itemClass}`}>
                        <div className="flex justify-between items-center mb-1">
                            <p className={`font-semibold text-lg ${textClass}`}>{cls.name}</p>
                            <p className={`font-bold text-lg ${progressTextClass}`}>{cls.averageAttendance || 0}%</p>
                        </div>
                        <div className={`w-full rounded-full h-4 ${progressBgClass}`}>
                            <div className={`${progressBarClass} h-4 rounded-full`} style={{ width: `${cls.averageAttendance || 0}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------

export const FacultyDashboardPage = ({ userData, onLogout, isDarkMode, toggleTheme }) => {
    const [activeTab, setActiveTab] = useState('myClasses');
    
    // Theme-based class definitions for the main structure
    const navClass = isDarkMode ? 'border-gray-700' : 'border-gray-300';
    const tabClass = isDarkMode ? 'text-gray-400 hover:text-sky-500' : 'text-gray-500 hover:text-sky-600';
    const tabActiveClass = isDarkMode ? 'border-sky-500 text-sky-500' : 'border-sky-600 text-sky-600';
    const headerTextClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const subheaderTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
    const buttonClass = isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800';
    const themeButtonClass = isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' : 'bg-gray-300 hover:bg-gray-400 text-gray-800';
    const backgroundClass = isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-900';

    if (!userData || !userData.classes) {
        // Apply dark/light theme to the loading state as well
        return <div className={`p-8 text-center ${backgroundClass}`}>Loading faculty data...</div>;
    }

    return (
        <div className={`p-4 sm:p-6 lg:p-8 min-h-screen ${backgroundClass}`}>
            <header className="flex justify-between items-center mb-6">
                <div><h1 className={`text-3xl font-bold ${headerTextClass}`}><span className="text-sky-500">True</span>Presence</h1></div>
                <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                        <p className={`font-semibold ${headerTextClass}`}>{userData.name}</p>
                        <p className={`text-sm ${subheaderTextClass}`}>{userData.department}</p>
                    </div>
                    {/* Theme Toggle Button */}
                    <button onClick={toggleTheme} className={`font-bold py-2 px-4 rounded-lg transition-colors duration-300 ${themeButtonClass}`}>
                        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                    </button>
                    <button onClick={onLogout} className={`font-bold py-2 px-4 rounded-lg transition-colors duration-300 ${buttonClass}`}>Logout</button>
                </div>
            </header>
            <nav className={`border-b mb-8 ${navClass}`}>
                <div className="flex space-x-8">
                    {['myClasses', 'takeAttendance', 'reports'].map(tab => (
                        <button 
                            key={tab} 
                            onClick={() => setActiveTab(tab)} 
                            className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 ${tabClass} ${activeTab === tab ? tabActiveClass : 'border-transparent'}`}
                        >
                            {tab.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </button>
                    ))}
                </div>
            </nav>
            <main>
                {activeTab === 'myClasses' && <MyClassesContent facultyData={userData} isDarkMode={isDarkMode} />}
                {activeTab === 'takeAttendance' && <TakeAttendanceContent facultyData={userData} isDarkMode={isDarkMode} />}
                {activeTab === 'reports' && <FacultyReportsContent facultyData={userData} isDarkMode={isDarkMode} />}
            </main>
        </div>
    );
};