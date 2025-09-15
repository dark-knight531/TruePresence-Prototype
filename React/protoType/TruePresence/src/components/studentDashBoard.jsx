import React, { useState, useEffect, useRef } from 'react';
import { InfoIcon, CameraIcon, SpinnerIcon, ColorKeyModal } from './Common.jsx';

// --- STUDENT DASHBOARD COMPONENTS ---
const StudentDashboardContent = ({ studentData, onInfoClick }) => {
    const [offset, setOffset] = useState(2 * Math.PI * 45);
    const overallPercentage = studentData.overallAttendance;

    useEffect(() => {
        const radius = 45;
        const circumference = 2 * Math.PI * radius;
        const newOffset = circumference - (overallPercentage / 100) * circumference;
        const timer = setTimeout(() => setOffset(newOffset), 100);
        return () => clearTimeout(timer);
    }, [overallPercentage]);

    const getStatusInfo = (percentage) => {
        if (percentage >= 85) return { color: 'text-green-500', status: "Excellent Attendance!", remark: "Great job! Keep it up." };
        if (percentage >= 75) return { color: 'text-yellow-500', status: "Good Standing", remark: "You're safe, but be mindful." };
        return { color: 'text-red-500', status: "Attendance is Low!", remark: "You are at risk for exams." };
    };

    const { color, status, remark } = getStatusInfo(overallPercentage);
    const notification = overallPercentage < 75 ? `Urgent: Overall attendance is ${overallPercentage}%. Please consult your advisor.` : "No new notifications.";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-lg shadow-sky-900/10">
                    <div className="relative w-40 h-40">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle className="text-gray-700" strokeWidth="10" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                            <circle className={`progress-circle ${color}`} strokeWidth="10" strokeLinecap="round" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', strokeDasharray: 2 * Math.PI * 45, strokeDashoffset: offset }} />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">{overallPercentage}%</div>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-white">{status}</h2>
                        <p className="text-gray-400 mt-2">{remark}</p>
                        <div className="mt-4 bg-gray-700/50 p-3 rounded-lg flex items-center justify-center sm:justify-start space-x-3 border border-gray-600/50">
                            <InfoIcon />
                            <p className="text-sm text-gray-300">Minimum <strong>75%</strong> required.</p>
                        </div>
                    </div>
                </div>
                <div className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-lg shadow-sky-900/10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-white">Subject-wise Breakdown</h2>
                        <button onClick={onInfoClick} className="text-gray-500 hover:text-sky-500 transition-colors duration-300" title="Show color key"><InfoIcon /></button>
                    </div>
                    <div className="space-y-4">
                        {studentData.subjects.map(subject => {
                            let barColorClass = 'bg-green-500';
                            if (subject.attendance < 75) barColorClass = 'bg-red-500';
                            else if (subject.attendance < 85) barColorClass = 'bg-yellow-500';
                            return (
                                <div key={subject.code} className="subject-item">
                                    <div className="flex justify-between items-center mb-1"><p className="font-semibold text-gray-300">{subject.name} <span className="text-sm text-gray-500">({subject.code})</span></p><p className={`font-bold ${barColorClass.replace('bg-', 'text-')}`}>{subject.attendance}%</p></div>
                                    <div className="w-full bg-gray-700 rounded-full h-2.5"><div className={`${barColorClass} h-2.5 rounded-full`} style={{ width: `${subject.attendance}%`}}></div></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="space-y-8">
                <div className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-lg shadow-sky-900/10">
                    <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                    <ul className="space-y-3">
                        {studentData.recentActivity.map((activity, index) => {
                            const isPresent = activity.status === 'Present';
                            const icon = isPresent ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                            return <li key={index} className="flex items-center space-x-3">{icon}<div className="flex-1"><p className="font-medium text-gray-200">{activity.subject}</p><p className="text-sm text-gray-500">{activity.date} - <span className={`${isPresent ? 'text-green-400' : 'text-red-400'} font-semibold}`}>{activity.status}</span></p></div></li>;
                        })}
                    </ul>
                </div>
                <div className="card bg-yellow-900/30 border-l-4 border-yellow-500 p-6">
                     <h2 className="text-xl font-bold text-yellow-300 mb-2">Notifications</h2>
                     <p className="text-yellow-300">{notification}</p>
                </div>
            </div>
        </div>
    );
};
const MarkAttendanceContent = () => {
    const [status, setStatus] = useState('IDLE');
    const [statusMessage, setStatusMessage] = useState('Camera is off');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const faceMeshRef = useRef(null);
    const animationFrameId = useRef(null);

    const loadFaceMesh = async () => {
        if (!window.FaceMesh) return;
        faceMeshRef.current = new window.FaceMesh({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });
        faceMeshRef.current.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });
    };

    const startCamera = async () => {
        setStatusMessage('');
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
                if (videoRef.current) videoRef.current.srcObject = stream;
                setStatus('CAMERA_ON');
                setStatusMessage('Please blink to verify...');
            } catch (err) {
                setStatusMessage('Camera access denied. Please check permissions.');
            }
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    };

    const onResults = (results) => {
        if (!canvasRef.current || !results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
            return;
        }
        const canvasCtx = canvasRef.current.getContext('2d');
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const landmarks = results.multiFaceLandmarks[0];
        window.drawConnectors(canvasCtx, landmarks, window.FACEMESH_TESSELATION, { color: '#C0C0C070', lineWidth: 1 });
        window.drawConnectors(canvasCtx, landmarks, window.FACEMESH_RIGHT_EYE, { color: '#FF3030' });
        window.drawConnectors(canvasCtx, landmarks, window.FACEMESH_LEFT_EYE, { color: '#30FF30' });

        const leftEye = [362, 385, 387, 263, 373, 380].map(i => landmarks[i]);
        const rightEye = [33, 160, 158, 133, 153, 144].map(i => landmarks[i]);
        const eyeAspectRatio = (eye) => {
            const A = Math.hypot(eye[1].x - eye[5].x, eye[1].y - eye[5].y);
            const B = Math.hypot(eye[2].x - eye[4].x, eye[2].y - eye[4].y);
            const C = Math.hypot(eye[0].x - eye[3].x, eye[0].y - eye[3].y);
            return (A + B) / (2.0 * C);
        };
        const ear = (eyeAspectRatio(leftEye) + eyeAspectRatio(rightEye)) / 2.0;

        if (ear < 0.2 && status === 'CAMERA_ON') {
            setStatus('BLINK_DETECTED');
            setStatusMessage('Blink detected! You can now mark presence.');
        }
        canvasCtx.restore();
    };

    useEffect(() => {
        loadFaceMesh();
        const detectionLoop = async () => {
            if (faceMeshRef.current && videoRef.current && videoRef.current.readyState >= 3) {
                await faceMeshRef.current.send({ image: videoRef.current });
            }
            animationFrameId.current = requestAnimationFrame(detectionLoop);
        };
        if (status === 'CAMERA_ON' || status === 'BLINK_DETECTED') {
            faceMeshRef.current.onResults(onResults);
            detectionLoop();
        } else {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        }
        return () => {
            stopCamera();
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [status]);

    const handleMarkPresence = () => {
        setStatus('SCANNING');
        setStatusMessage('');
        setTimeout(() => {
            setStatus('SUCCESS');
            setStatusMessage('Success! Attendance marked for Data Structures.');
            stopCamera();
        }, 3000);
    };

    return (
        <div className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-lg shadow-sky-900/10 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Mark Today's Attendance</h2>
            <p className="text-gray-400 mb-6">Your next class is <strong className="text-sky-400">Data Structures & Algorithms</strong>.</p>

            <div className="relative w-full h-64 bg-gray-900/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600 mb-6 overflow-hidden">
                <video ref={videoRef} autoPlay playsInline className="absolute top-0 left-0 w-full h-full object-cover scale-x-[-1]" style={{ display: status === 'IDLE' || status === 'SUCCESS' ? 'none' : 'block' }}></video>
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" width="640" height="480"></canvas>

                {status === 'IDLE' && (<div><CameraIcon /><p className="text-gray-500 mt-2">Camera is off</p></div>)}
                {status === 'SCANNING' && (<div className="text-center z-10"><SpinnerIcon /><p className="text-sky-400 mt-4">Verifying...</p></div>)}
            </div>

            <p className={`mt-4 h-6 font-medium ${status === 'BLINK_DETECTED' ? 'text-green-400' : 'text-sky-400'}`}>{statusMessage}</p>

            <button
                onClick={status === 'IDLE' || status === 'SUCCESS' ? startCamera : handleMarkPresence}
                disabled={status === 'CAMERA_ON' || status === 'SCANNING'}
                className="w-full mt-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                {status === 'IDLE' || status === 'SUCCESS' ? 'Start Camera' : 'Mark Presence'}
            </button>
        </div>
    );
};
const ProfileContent = ({ studentData }) => (
    <div className="card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-lg shadow-sky-900/10 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Student Profile</h2>
        <div className="space-y-4 text-gray-300 text-lg">
            <div className="flex justify-between border-b border-gray-700 pb-2"><strong>Name:</strong> <span>{studentData.name}</span></div>
            <div className="flex justify-between border-b border-gray-700 pb-2"><strong>Roll Number:</strong> <span>{studentData.rollNumber}</span></div>
            <div className="flex justify-between border-b border-gray-700 pb-2"><strong>Branch:</strong> <span>{studentData.branch}</span></div>
            <div className="flex justify-between border-b border-gray-700 pb-2"><strong>Semester:</strong> <span>{studentData.semester}</span></div>
            <div className="flex justify-between border-b border-gray-700 pb-2"><strong>Email:</strong> <span>{studentData.email}</span></div>
        </div>
    </div>
);

export const StudentDashboardPage = ({ userData, onLogout }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-6">
                <div><h1 className="text-3xl font-bold text-white"><span className="text-sky-500">True</span>Presence</h1></div>
                <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                        <p className="font-semibold text-white">{userData.name}</p>
                        <p className="text-sm text-gray-400">{userData.rollNumber}</p>
                    </div>
                    <button onClick={onLogout} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">Logout</button>
                </div>
            </header>
            <nav className="border-b border-gray-700 mb-8">
                <div className="flex space-x-8">
                    {['dashboard', 'markAttendance', 'profile'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 text-gray-400 hover:text-sky-500 ${activeTab === tab ? 'tab-active' : 'border-transparent'}`}>
                            {tab === 'markAttendance' ? 'Mark Attendance' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </nav>
            <main>
                {activeTab === 'dashboard' && <StudentDashboardContent studentData={userData} onInfoClick={() => setIsModalOpen(true)} />}
                {activeTab === 'markAttendance' && <MarkAttendanceContent />}
                {activeTab === 'profile' && <ProfileContent studentData={userData} />}
            </main>
            {isModalOpen && <ColorKeyModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};