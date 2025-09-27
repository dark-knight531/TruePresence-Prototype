// src/mockdata.jsx

const userData = {
    name: "Dr. Anya Sharma",
    department: "Computer Science",
    classesByYear: {
        '1st Yr': [
            { 
                code: 'CS101', 
                name: 'Intro to Programming', 
                totalStudents: 60, 
                averageAttendance: 78, 
                students: [
                    { name: "Alice Johnson", rollNumber: "R001" },
                    { name: "Bob Smith", rollNumber: "R002" },
                    { name: "Charlie Brown", rollNumber: "R003" },
                    { name: "Diana Prince", rollNumber: "R004" },
                    { name: "Ethan Hunt", rollNumber: "R005" },
                    { name: "Fiona Glenn", rollNumber: "R006" },
                    { name: "George King", rollNumber: "R007" },
                    { name: "Hannah Lee", rollNumber: "R008" },
                    { name: "Ivan Rossi", rollNumber: "R009" },
                    { name: "Jasmine Kaur", rollNumber: "R010" },
                    // NOTE: Add more student objects here to match totalStudents: 60
                ] 
            },
            // ... more 1st Yr classes
        ],
        '2nd Yr' : [
                { 
                code: 'CS202', 
                name: 'Data Structures And Algorithms', 
                totalStudents: 60, 
                averageAttendance: 78, 
                students: [
                    { name: "Alice Johnson", rollNumber: "R001" },
                    { name: "Bob Smith", rollNumber: "R002" },
                    { name: "Charlie Brown", rollNumber: "R003" },
                    { name: "Diana Prince", rollNumber: "R004" },
                    { name: "Ethan Hunt", rollNumber: "R005" },
                    { name: "Fiona Glenn", rollNumber: "R006" },
                    { name: "George King", rollNumber: "R007" },
                    { name: "Hannah Lee", rollNumber: "R008" },
                    { name: "Ivan Rossi", rollNumber: "R009" },
                    { name: "Jasmine Kaur", rollNumber: "R010" },
                    // NOTE: Add more student objects here to match totalStudents: 60
                ] 
            },
        ],
        'M.Tech': [
            { 
                code: 'MT801', 
                name: 'Adv Algorithms', 
                totalStudents: 20, 
                averageAttendance: 95, 
                students: [
                    { name: "Mandy Moore", rollNumber: "R101" },
                    { name: "Noah Carter", rollNumber: "R102" },
                    // NOTE: Add 8 more students to ensure the live feed simulation works properly!
                ] 
            },
        ],
        // ... other years/programs
    }
};

// Use named export
export const facultyMockData = userData; 

// OR (less common but simpler):
// export default userData;