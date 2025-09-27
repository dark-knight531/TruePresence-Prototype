import React, { useState, useEffect, useRef } from 'react';
import { InfoIcon, CameraIcon, SpinnerIcon, ColorKeyModal } from './common.jsx';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Mock data for charts
const getAttendanceData = (subject) => ({
    labels: ['Weekly', 'Monthly', 'Overall'],
    datasets: [
        {
            label: 'Attendance Percentage',
            data: [subject.weeklyAttendance, subject.monthlyAttendance, subject.attendance],
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        },
    ],
});

const getSubjectBreakdownData = (subjects) => {
    const labels = subjects.map(s => s.name);
    const data = subjects.map(s => s.attendance);
    const backgroundColors = subjects.map(s => {
        if (s.attendance >= 85) return '#10b981'; // green
        if (s.attendance >= 75) return '#f59e0b'; // yellow
        return '#ef4444'; // red
    });

    return {
        labels,
        datasets: [{
            label: 'Attendance %',
            data,
            backgroundColor: backgroundColors,
        }],
    };
};

const getDoughnutData = (percentage) => ({
    labels: ['Present', 'Absent'],
    datasets: [
        {
            data: [percentage, 100 - percentage],
            backgroundColor: ['#0ea5e9', '#374151'],
            hoverBackgroundColor: ['#0ea5e9', '#374151'],
            borderWidth: 0,
        },
    ],
});


// --- STUDENT DASHBOARD COMPONENTS ---
const StudentDashboardContent = ({ studentData, onInfoClick, isDarkMode }) => {
    const [viewMode, setViewMode] = useState('list');
    const [selectedSubject, setSelectedSubject] = useState(null);

    const getStatusInfo = (percentage) => {
        if (percentage >= 85) return { color: 'text-green-500', status: "Excellent Attendance!", remark: "Great job! Keep it up." };
        if (percentage >= 75) return { color: 'text-yellow-500', status: "Good Standing", remark: "You're safe, but be mindful." };
        return { color: 'text-red-500', status: "Attendance is Low!", remark: "You are at risk for exams." };
    };

    const subjectsAtRisk = studentData.subjects.filter(s => s.attendance < 75);
    const hasLowAttendance = subjectsAtRisk.length > 0;

    const cardClass = isDarkMode ? 'bg-gray-800/50 border-gray-700/50 text-gray-300 shadow-sky-900/10' : 'bg-white border-gray-300/50 text-gray-900 shadow-gray-300/10';
    const listClass = isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-200 text-gray-700';
    const titleClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const notificationClass = isDarkMode ? 'bg-yellow-900/30 border-yellow-500 text-yellow-300' : 'bg-yellow-100 border-yellow-500 text-yellow-800';

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className={`card backdrop-blur-sm border rounded-2xl p-6 shadow-lg ${cardClass}`}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className={`text-xl font-bold ${titleClass}`}>Subject-wise Breakdown</h2>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => setViewMode('list')} className={`px-3 py-1 rounded-full text-sm font-medium ${viewMode === 'list' ? 'bg-sky-600 text-white' : 'bg-gray-700 text-gray-300'}`}>List</button>
                            <button onClick={() => setViewMode('bar')} className={`px-3 py-1 rounded-full text-sm font-medium ${viewMode === 'bar' ? 'bg-sky-600 text-white' : 'bg-gray-700 text-gray-300'}`}>Chart</button>
                        </div>
                    </div>
                    {viewMode === 'list' && (
                        <div className="space-y-4">
                            {studentData.subjects.map(subject => {
                                let barColorClass = 'bg-green-500';
                                if (subject.attendance < 75) barColorClass = 'bg-red-500';
                                else if (subject.attendance < 85) barColorClass = 'bg-yellow-500';
                                return (
                                    <div key={subject.code} onClick={() => setSelectedSubject(subject)} className={`subject-item p-4 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-[1.02] ${listClass}`}>
                                        <div className="flex justify-between items-center mb-1">
                                            <p className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{subject.name} <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>({subject.code})</span></p>
                                            <p className={`font-bold text-lg ${barColorClass.replace('bg-', 'text-')}`}>{subject.attendance}%</p>
                                        </div>
                                        <div className={`w-full bg-gray-700 rounded-full h-2.5`}>
                                            <div className={`${barColorClass} h-2.5 rounded-full`} style={{ width: `${subject.attendance}%`}}></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {viewMode === 'bar' && (
                            <div className="p-4 bg-gray-900/50 rounded-lg">
                                <Bar 
                                    data={getSubjectBreakdownData(studentData.subjects)}
                                    options={{
                                        plugins: { legend: { display: false } },
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                max: 100,
                                                ticks: { color: isDarkMode ? '#d1d5db' : '#4b5563' },
                                                grid: { color: isDarkMode ? '#374151' : '#e5e7eb' }
                                            },
                                            x: {
                                                ticks: { color: isDarkMode ? '#d1d5db' : '#4b5563' },
                                                grid: { color: isDarkMode ? '#374151' : '#e5e7eb' }
                                            }
                                        }
                                    }}
                                />
                            </div>
                    )}
                </div>

                {selectedSubject && (
                    <div className={`card backdrop-blur-sm border rounded-2xl p-6 shadow-lg ${cardClass}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className={`text-xl font-bold ${titleClass}`}>{selectedSubject.name} Attendance Analysis</h2>
                            <button onClick={() => setSelectedSubject(null)} className="text-gray-400 hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="h-56 w-56 mx-auto">
                                <Doughnut 
                                    data={getDoughnutData(selectedSubject.attendance)} 
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        cutout: '70%',
                                        plugins: { legend: { display: false } }
                                    }}
                                />
                            </div>
                            <div>
                                <h3 className={`text-2xl font-bold mb-2 ${titleClass}`}>{selectedSubject.attendance}% Overall</h3>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Weekly:</strong> {selectedSubject.weeklyAttendance}%</p>
                                    <p><strong>Monthly:</strong> {selectedSubject.monthlyAttendance}%</p>
                                </div>
                                <div className={`mt-4 bg-gray-700/50 p-3 rounded-lg flex items-center space-x-3 border ${isDarkMode ? 'border-gray-600/50' : 'border-gray-300/50'}`}>
                                    <InfoIcon isDarkMode={isDarkMode} />
                                    <p className="text-sm">Attendance in this subject is <span className="font-semibold">{getStatusInfo(selectedSubject.attendance).status.split('!')[0]}</span>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="space-y-8">
                <div className={`card backdrop-blur-sm border rounded-2xl p-6 shadow-lg ${cardClass}`}>
                    <h2 className={`text-xl font-bold mb-4 ${titleClass}`}>Recent Activity</h2>
                    <ul className="space-y-3">
                        {studentData.recentActivity.map((activity, index) => {
                            const isPresent = activity.status === 'Present';
                            const icon = isPresent ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                            return <li key={index} className="flex items-center space-x-3">{icon}<div className="flex-1"><p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{activity.subject}</p><p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{activity.date} - <span className={`${isPresent ? 'text-green-400' : 'text-red-400'} font-semibold}`}>{activity.status}</span></p></div></li>;
                        })}
                    </ul>
                </div>
                {hasLowAttendance ? (
                    <div className={`card border-l-4 p-6 ${notificationClass}`}>
                        <h2 className="text-xl font-bold mb-2">Urgent Notifications</h2>
                        <p className="mb-2">Your attendance is low in the following subjects:</p>
                        <ul className="list-disc list-inside space-y-1">
                            {subjectsAtRisk.map((subject, index) => (
                                <li key={index}>
                                    <span className="font-semibold">{subject.name}</span>: <span className="font-bold text-red-500">{subject.attendance}%</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className={`card border-l-4 p-6 ${notificationClass}`}>
                        <h2 className="text-xl font-bold mb-2">Notifications</h2>
                        <p>No new notifications.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// MARK ATTENDANCE CONTENT (CORRECTED)
// ----------------------------------------------------------------------

const MarkAttendanceContent = ({ studentData, onAttendanceMarked, isDarkMode }) => {
    const [status, setStatus] = useState('IDLE'); // IDLE, LOADING, CAMERA_ON, SCANNING, SUCCESS, ERROR
    const [statusMessage, setStatusMessage] = useState('Camera is off');
    const [selectedSubject, setSelectedSubject] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null); // To hold the media stream for cleanup

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            // Clear the canvas, removing any bounding boxes or temporary snapshots
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); 
        }
        setStatus('IDLE');
        setStatusMessage('Camera is off');
    };

    useEffect(() => {
        // Cleanup function: stop camera on component unmount
        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = async () => {
        stopCamera(); // Ensure previous stream is stopped
        setStatusMessage('Starting camera...');
        setStatus('LOADING'); 

        try {
            // Access the user's camera
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = stream; 

            if (videoRef.current) {
                // Attach the stream to the video element
                videoRef.current.srcObject = stream;
                await videoRef.current.play();

                // Update status and draw the frame
                setStatus('CAMERA_ON');
                setStatusMessage('Please keep your face within the frame.');

                if (canvasRef.current && videoRef.current) {
                    const ctx = canvasRef.current.getContext('2d');
                    // Set canvas dimensions to match the displayed size
                    canvasRef.current.width = videoRef.current.offsetWidth;
                    canvasRef.current.height = videoRef.current.offsetHeight;
                    
                    // Draw simulated face detection bounding box
                    ctx.strokeStyle = '#0ea5e9';
                    ctx.lineWidth = 4;
                    const canvasWidth = canvasRef.current.width;
                    const canvasHeight = canvasRef.current.height;
                    ctx.strokeRect(canvasWidth * 0.1, canvasHeight * 0.1, canvasWidth * 0.8, canvasHeight * 0.8);
                }
            }
        } catch (err) {
            console.error("Error accessing camera: ", err);
            setStatus('ERROR');
            setStatusMessage('Error: Could not access camera. Please check permissions.');
            setTimeout(() => setStatus('IDLE'), 5000); 
        }
    };

    const handleMarkPresence = () => {
        // Only allow marking if the camera is active
        if (!selectedSubject || status !== 'CAMERA_ON') return;

        setStatus('SCANNING');
        setStatusMessage('Verifying face...');

        // CRITICAL FIX: The camera (video element) is NOT stopped here, it continues running.

        // Optional: Take a snapshot onto the canvas to simulate a capture moment
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            // Clear bounding box and draw a snapshot for effect (optional)
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }

        // Simulate the facial recognition process delay
        setTimeout(() => {
            // After successful verification, stop the camera stream
            stopCamera(); 
            
            setStatus('SUCCESS');
            setStatusMessage(`Success! Attendance marked for ${selectedSubject.name}.`);
            // onAttendanceMarked should be called here in a real app
        }, 3000);
    };

    const cardClass = isDarkMode ? 'bg-gray-800/50 border-gray-700/50 text-gray-300 shadow-sky-900/10' : 'bg-white border-gray-300/50 text-gray-900 shadow-gray-300/10';
    const titleClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const inputClass = isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-900';
    const textClass = isDarkMode ? 'text-gray-500' : 'text-gray-400';
    const buttonClass = isDarkMode ? 'bg-sky-600 hover:bg-sky-700 text-white disabled:bg-gray-600' : 'bg-sky-600 hover:bg-sky-700 text-white disabled:bg-gray-400';
    const listClass = isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200';

    const isVideoActive = (status === 'CAMERA_ON' || status === 'SCANNING');

    return (
        <div className={`card backdrop-blur-sm border rounded-2xl p-8 shadow-lg max-w-2xl mx-auto text-center ${cardClass}`}>
            <h2 className={`text-2xl font-bold mb-2 ${titleClass}`}>Mark Today's Attendance</h2>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Select a live subject to mark your presence.
            </p>
            
            <div className="space-y-4 mb-6">
                {studentData.subjects.map(subject => (
                    <button 
                        key={subject.code} 
                        onClick={() => {
                            setSelectedSubject(subject);
                            // Stop camera if subject changes while camera is active
                            if (status !== 'IDLE') stopCamera(); 
                        }} 
                        className={`w-full text-left p-4 rounded-lg transition-colors duration-300 ${listClass} ${selectedSubject?.code === subject.code ? 'border-2 border-sky-500' : 'border-2 border-transparent'}`}
                        disabled={!subject.liveAttendance}
                    >
                        <span className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{subject.name} ({subject.code})</span>
                        {subject.liveAttendance && <span className="ml-4 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">LIVE</span>}
                    </button>
                ))}
            </div>

            {selectedSubject && (
                <>
                    <h3 className={`text-xl font-bold mb-4 ${titleClass}`}>Live Session for: {selectedSubject.name}</h3>
                    <div className={`relative w-full h-64 rounded-lg flex items-center justify-center border-2 border-dashed mb-6 overflow-hidden ${inputClass}`}>
                        
                        {/* Video element remains visible during CAMERA_ON and SCANNING */}
                        <video 
                            ref={videoRef} 
                            playsInline 
                            className="absolute top-0 left-0 w-full h-full object-cover scale-x-[-1]" 
                            style={{ display: isVideoActive ? 'block' : 'none' }}
                        ></video>
                        
                        {/* The canvas is for drawing the bounding box/overlays */}
                        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" width="640" height="480"></canvas>
                        
                        {/* Status overlays */}
                        {(status === 'IDLE' || status === 'ERROR') && (<div><CameraIcon isDarkMode={isDarkMode} /><p className={`mt-2 ${textClass}`}>{statusMessage}</p></div>)}
                        {status === 'LOADING' && (<div className="text-center z-10"><SpinnerIcon /><p className="text-sky-500 mt-4">Activating Camera...</p></div>)}
                        {status === 'SCANNING' && (<div className="text-center absolute z-20"><SpinnerIcon /><p className="text-sky-500 mt-4">Verifying...</p></div>)}
                        {status === 'SUCCESS' && (<div className="text-center z-10"><svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><p className="text-green-500 mt-4">Attendance Marked!</p></div>)}
                    </div>

                    <p className={`mt-4 h-6 font-medium ${status === 'SUCCESS' ? 'text-green-400' : isDarkMode ? 'text-sky-400' : 'text-sky-600'}`}>
                        {statusMessage}
                    </p>

                    <button
                        onClick={isVideoActive ? handleMarkPresence : startCamera}
                        disabled={!selectedSubject || status === 'SCANNING' || status === 'LOADING'}
                        className={`w-full mt-2 font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg disabled:cursor-not-allowed ${buttonClass}`}
                    >
                        {status === 'IDLE' || status === 'SUCCESS' || status === 'ERROR' ? 'Start Camera' : status === 'CAMERA_ON' ? 'Mark Presence' : 'Processing...'}
                    </button>
                </>
            )}
        </div>
    );
};

const ProfileContent = ({ studentData, isDarkMode }) => {
    const cardClass = isDarkMode ? 'bg-gray-800/50 border-gray-700/50 text-gray-300' : 'bg-white border-gray-300/50 text-gray-900';
    const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-300';
    const titleClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const profileTextClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';

    return (
        <div className={`card backdrop-blur-sm border rounded-2xl p-8 shadow-lg max-w-4xl mx-auto ${cardClass}`}>
            <h2 className={`text-2xl font-bold mb-6 ${titleClass}`}>Student Profile</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                    <img className="h-32 w-32 rounded-full object-cover border-4 border-sky-500" src="https://picsum.photos/200" alt="Student Photo" />
                </div>
                <div className="flex-1 w-full">
                    <div className="space-y-4 text-lg">
                        <div className={`flex justify-between border-b pb-2 ${borderClass}`}><strong>Name:</strong> <span className={profileTextClass}>{studentData.name}</span></div>
                        <div className={`flex justify-between border-b pb-2 ${borderClass}`}><strong>Roll Number:</strong> <span className={profileTextClass}>{studentData.rollNumber}</span></div>
                        <div className={`flex justify-between border-b pb-2 ${borderClass}`}><strong>Branch:</strong> <span className={profileTextClass}>{studentData.branch}</span></div>
                        <div className={`flex justify-between border-b pb-2 ${borderClass}`}><strong>Semester:</strong> <span className={profileTextClass}>{studentData.semester}</span></div>
                        <div className={`flex justify-between border-b pb-2 ${borderClass}`}><strong>Email:</strong> <span className={profileTextClass}>{studentData.email}</span></div>
                        <div className={`flex justify-between border-b pb-2 ${borderClass}`}><strong>Mobile:</strong> <span className={profileTextClass}>+91 9876543210</span></div>
                        <div className={`flex justify-between border-b pb-2 ${borderClass}`}><strong>DOB:</strong> <span className={profileTextClass}>2004-05-15</span></div>
                        <div className={`flex justify-between border-b pb-2 ${borderClass}`}><strong>Passing Year:</strong> <span className={profileTextClass}>2027</span></div>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h3 className={`text-xl font-bold mb-4 ${titleClass}`}>Registered Subjects for Attendance</h3>
                <ul className="space-y-2">
                    {studentData.subjects.map(subject => (
                        <li key={subject.code} className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M10 16h.01" /></svg>
                            <p className={profileTextClass}>{subject.name} ({subject.code})</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export const StudentDashboardPage = ({ userData, onLogout, updateUserData, isDarkMode, toggleTheme }) => {
    const navClass = isDarkMode ? 'border-gray-700' : 'border-gray-300';
    const tabClass = isDarkMode ? 'text-gray-400 hover:text-sky-500' : 'text-gray-500 hover:text-sky-600';
    const headerTextClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const subheaderTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
    const buttonClass = isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800';
    const themeButtonClass = isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' : 'bg-gray-300 hover:bg-gray-400 text-gray-800';
    const backgroundClass = isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-900';

    const [activeTab, setActiveTab] = useState('profile');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAttendanceMarked = (updatedData) => {
        updateUserData(updatedData);
    };

    useEffect(() => {
        if (userData) {
            const updatedSubjects = userData.subjects.map(subject => ({
                ...subject,
                weeklyAttendance: Math.floor(Math.random() * (100 - 60 + 1) + 60),
                monthlyAttendance: Math.floor(Math.random() * (100 - 70 + 1) + 70),
                liveAttendance: Math.random() > 0.5, // Simulate live attendance
            }));
            updateUserData({ ...userData, subjects: updatedSubjects });
        }
    }, []);

    return (
        <div className={`p-4 sm:p-6 lg:p-8 ${backgroundClass}`}>
            <header className="flex justify-between items-center mb-6">
                <div><h1 className={`text-3xl font-bold ${headerTextClass}`}><span className="text-sky-500">True</span>Presence</h1></div>
                <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                        <p className={`font-semibold ${headerTextClass}`}>{userData.name}</p>
                        <p className={`text-sm ${subheaderTextClass}`}>{userData.rollNumber}</p>
                    </div>
                    <button onClick={toggleTheme} className={`font-bold py-2 px-4 rounded-lg transition-colors duration-300 ${themeButtonClass}`}>
                        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                    </button>
                    <button onClick={onLogout} className={`font-bold py-2 px-4 rounded-lg transition-colors duration-300 ${buttonClass}`}>Logout</button>
                </div>
            </header>
            <nav className={`border-b mb-8 ${navClass}`}>
                <div className="flex space-x-8">
                    {['profile', 'markAttendance', 'dashboard'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 ${tabClass} ${activeTab === tab ? 'tab-active' : 'border-transparent'}`}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </nav>
            <main>
                {activeTab === 'profile' && <ProfileContent studentData={userData} isDarkMode={isDarkMode} />}
                {activeTab === 'markAttendance' && <MarkAttendanceContent studentData={userData} onAttendanceMarked={handleAttendanceMarked} isDarkMode={isDarkMode} />}
                {activeTab === 'dashboard' && <StudentDashboardContent studentData={userData} onInfoClick={() => setIsModalOpen(true)} isDarkMode={isDarkMode} />}
            </main>
            {isModalOpen && <ColorKeyModal onClose={() => setIsModalOpen(false)} isDarkMode={isDarkMode} />}
        </div>
    );
};