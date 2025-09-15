import React from 'react';
import { useState } from 'react';

// --- EXPANDED MOCK DATA ---
const initialData = {
    faculty: [
        { id: 'FAC101', name: 'Dr. Alok Sharma', department: 'Computer Science', dob: '1975-05-20', degree: 'Ph.D. in AI', specialization: 'Machine Learning, NLP', experience: 15 },
        { id: 'FAC102', name: 'Dr. Sunita Gupta', department: 'Electrical Engineering', dob: '1980-11-12', degree: 'Ph.D. in Power Systems', specialization: 'Renewable Energy', experience: 12 },
        { id: 'FAC103', name: 'Dr. Ramesh Prasad', department: 'Computer Science', dob: '1982-02-18', degree: 'Ph.D. in Algorithms', specialization: 'Data Structures, Cryptography', experience: 10 },
    ],
    students: [
        { id: '23A011', name: 'Vikram Singh', year: '3rd Year', branch: 'CSE', dob: '2003-04-10', age: 22 },
        { id: '24B055', name: 'Anjali Sharma', year: '2nd Year', branch: 'CSE', dob: '2004-08-25', age: 21 },
        { id: '24B056', name: 'Rohan Verma', year: '2nd Year', branch: 'CSE', dob: '2004-06-15', age: 21 },
        { id: '24E032', name: 'Priya Mehta', year: '2nd Year', branch: 'EE', dob: '2004-09-30', age: 20 },
        { id: '25C001', name: 'Aarav Patel', year: '1st Year', branch: 'CSE', dob: '2005-01-20', age: 20 },
        { id: '25M101', name: 'Sameer Khan', year: '1st Year', branch: 'ME', dob: '2005-03-14', age: 20 },
    ],
    subjects: [
        { code: 'CS203', name: 'Data Structures & Algorithms', department: 'Computer Science', type: 'Lecture' },
        { code: 'CS204', name: 'Data Structures Lab', department: 'Computer Science', type: 'Lab' },
        { code: 'CS205', name: 'Object Oriented Programming', department: 'Computer Science', type: 'Lecture' },
        { code: 'EE101', name: 'Basic Electrical Engineering', department: 'Electrical Engineering', type: 'Lecture' },
        { code: 'EE102', name: 'Electrical Engineering Lab', department: 'Electrical Engineering', type: 'Lab' },
    ]
};

// --- HELPER & UI COMPONENTS ---

const DashboardCard = ({ title, value, icon, isDarkMode }) => {
    const cardClass = isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-300/50';
    return (
        <div className={`card p-6 rounded-2xl flex items-center justify-between ${cardClass}`}>
            <div>
                <p className="text-gray-400 text-sm font-medium uppercase">{title}</p>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
            </div>
            <div className={`text-4xl ${isDarkMode ? 'text-sky-500' : 'text-sky-600'}`}>{icon}</div>
        </div>
    );
};

// --- NEW DETAIL MODAL ---
const DetailModal = ({ item, isOpen, onClose, isDarkMode }) => {
    if (!isOpen || !item) return null;

    const modalClass = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300';
    const titleClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const labelClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';
    
    // Check if the item is a student or faculty to render correct details
    const isStudent = item.branch; 

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div onClick={(e) => e.stopPropagation()} className={`card w-full max-w-lg p-8 relative animate-scale-in rounded-2xl ${modalClass}`}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h3 className={`text-3xl font-bold mb-2 ${titleClass}`}>{item.name}</h3>
                <p className="text-sky-500 font-medium mb-6">{item.id || item.code}</p>

                <div className="space-y-4">
                    {isStudent ? (
                        <>
                            <div><span className={labelClass}>Year:</span> {item.year}</div>
                            <div><span className={labelClass}>Branch:</span> {item.branch}</div>
                            <div><span className={labelClass}>Date of Birth:</span> {item.dob}</div>
                            <div><span className={labelClass}>Age:</span> {item.age}</div>
                        </>
                    ) : (
                        <>
                            <div><span className={labelClass}>Department:</span> {item.department}</div>
                            <div><span className={labelClass}>Highest Degree:</span> {item.degree}</div>
                            <div><span className={labelClass}>Specialization:</span> {item.specialization}</div>
                            <div><span className={labelClass}>Experience:</span> {item.experience} years</div>
                            <div><span className={labelClass}>Date of Birth:</span> {item.dob}</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- NEW CATEGORIZED LIST VIEW ---
const AccordionItem = ({ title, children, isDarkMode }) => {
    const [isOpen, setIsOpen] = useState(true);
    const headerClass = isDarkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300';
    return (
        <div className="mb-2">
            <button onClick={() => setIsOpen(!isOpen)} className={`w-full flex justify-between items-center p-4 rounded-lg font-bold text-lg transition-colors ${headerClass}`}>
                {title}
                <svg className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && <div className="p-4">{children}</div>}
        </div>
    );
};

const CategorizedListView = ({ data, groupBy, subGroupBy, onItemClick, isDarkMode }) => {
    const groupedData = data.reduce((acc, item) => {
        const key = item[groupBy];
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});

    const itemClass = isDarkMode ? 'bg-gray-800 hover:bg-gray-700/50' : 'bg-white hover:bg-gray-100';

    return (
        <div>
            {Object.entries(groupedData).map(([key, items]) => {
                let subGroupContent;
                if (subGroupBy) {
                    const subGrouped = items.reduce((acc, item) => {
                        const subKey = item[subGroupBy];
                        if (!acc[subKey]) acc[subKey] = [];
                        acc[subKey].push(item);
                        return acc;
                    }, {});
                    subGroupContent = (
                        <div>
                            {Object.entries(subGrouped).map(([subKey, subItems]) => (
                                <div key={subKey} className="mt-4">
                                    <h4 className="font-semibold text-sky-500 mb-2">{subKey}</h4>
                                    <div className="space-y-2">
                                        {subItems.map(item => (
                                            <div key={item.id} onClick={() => onItemClick(item)} className={`p-3 rounded-lg cursor-pointer flex justify-between items-center transition-colors ${itemClass}`}>
                                                <span>{item.name}</span>
                                                <span className="text-sm text-gray-400">{item.id}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                } else {
                    subGroupContent = (
                        <div className="space-y-2">
                            {items.map(item => (
                                <div key={item.id} onClick={() => onItemClick(item)} className={`p-3 rounded-lg cursor-pointer flex justify-between items-center transition-colors ${itemClass}`}>
                                    <span>{item.name}</span>
                                    <span className="text-sm text-gray-400">{item.id}</span>
                                </div>
                            ))}
                        </div>
                    );
                }
                
                return (
                    <AccordionItem key={key} title={key} isDarkMode={isDarkMode}>
                        {subGroupContent}
                    </AccordionItem>
                );
            })}
        </div>
    );
};

const SubjectListView = ({ subjects, isDarkMode }) => {
    const cardClass = isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-300/50';
    return (
         <div className={`card p-6 rounded-2xl ${cardClass}`}>
             <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Subjects & Labs</h3>
            <div className="space-y-3">
                {subjects.map(subject => (
                    <div key={subject.code} className={`p-4 rounded-lg flex justify-between items-center ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200'}`}>
                        <div>
                            <p className="font-bold">{subject.name}</p>
                            <p className="text-sm text-gray-400">{subject.code} - {subject.department}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${subject.type === 'Lab' ? 'bg-sky-500/20 text-sky-400' : 'bg-green-500/20 text-green-400'}`}>
                            {subject.type}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- MAIN ADMIN DASHBOARD COMPONENT ---
export const AdminDashboardPage = ({ onLogout, isDarkMode, toggleTheme }) => {
    const [data, setData] = useState(initialData);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    
    const headerTextClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const subheaderTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
    const buttonClass = isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800';
    const themeButtonClass = isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' : 'bg-gray-300 hover:bg-gray-400 text-gray-800';
    const sidebarClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
    const navButtonClass = (tabName) => `w-full text-left text-lg font-medium p-4 rounded-lg transition-colors duration-300 ${activeTab === tabName ? (isDarkMode ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-500/20 text-sky-700') : (isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-200')}`;

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsDetailModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsDetailModalOpen(false);
        setSelectedItem(null);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div>
                        <h2 className={`text-3xl font-bold mb-6 ${headerTextClass}`}>Dashboard Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <DashboardCard title="Total Faculty" value={data.faculty.length} icon="🧑‍🏫" isDarkMode={isDarkMode} />
                            <DashboardCard title="Total Students" value={data.students.length} icon="🧑‍🎓" isDarkMode={isDarkMode} />
                            <DashboardCard title="Courses & Labs" value={data.subjects.length} icon="📚" isDarkMode={isDarkMode} />
                        </div>
                    </div>
                );
            case 'faculty':
                return <CategorizedListView data={data.faculty} groupBy="department" onItemClick={handleItemClick} isDarkMode={isDarkMode} />;
            case 'students':
                return <CategorizedListView data={data.students} groupBy="year" subGroupBy="branch" onItemClick={handleItemClick} isDarkMode={isDarkMode} />;
            case 'subjects':
                return <SubjectListView subjects={data.subjects} isDarkMode={isDarkMode} />;
            default:
                return null;
        }
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
            <header className={`flex justify-between items-center p-4 sm:p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                <div><h1 className={`text-3xl font-bold ${headerTextClass}`}><span className="text-sky-500">True</span>Presence <span className="text-lg font-normal text-gray-400">Admin</span></h1></div>
                <div className="flex items-center space-x-4">
                     <div className="text-right hidden sm:block">
                        <p className={`font-semibold ${headerTextClass}`}>Administrator</p>
                        <p className={`text-sm ${subheaderTextClass}`}>System Control</p>
                    </div>
                    <button onClick={toggleTheme} className={`font-bold py-2 px-4 rounded-lg transition-colors duration-300 ${themeButtonClass}`}>{isDarkMode ? '☀️' : '🌙'}</button>
                    <button onClick={onLogout} className={`font-bold py-2 px-4 rounded-lg transition-colors duration-300 ${buttonClass}`}>Logout</button>
                </div>
            </header>
            <div className="flex">
                <aside className={`w-64 p-6 hidden lg:block ${sidebarClass}`}>
                    <h2 className="text-lg font-semibold text-gray-400 uppercase mb-4">Management</h2>
                    <nav className="space-y-2">
                        <button onClick={() => setActiveTab('dashboard')} className={navButtonClass('dashboard')}>Dashboard</button>
                        <button onClick={() => setActiveTab('faculty')} className={navButtonClass('faculty')}>Faculty</button>
                        <button onClick={() => setActiveTab('students')} className={navButtonClass('students')}>Students</button>
                        <button onClick={() => setActiveTab('subjects')} className={navButtonClass('subjects')}>Subjects & Labs</button>
                    </nav>
                </aside>
                <main className="flex-1 p-6 sm:p-8 lg:p-10">
                    {renderContent()}
                </main>
            </div>

            <DetailModal 
                isOpen={isDetailModalOpen}
                onClose={handleCloseModal}
                item={selectedItem}
                isDarkMode={isDarkMode}
            />
        </div>
    );
};