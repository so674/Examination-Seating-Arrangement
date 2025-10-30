let students = [];
const ROOM_CAPACITY = 50;
const TOTAL_ROOMS = 5;

// ✅ Validation Function
function validateInputs(enrollmentNo, rollNo, name, section, course, subject) {
    // Enrollment number → exactly 14 digits and numeric
    if (enrollmentNo.length !== 14 || isNaN(enrollmentNo)) {
        showError("Please give valid data: Enrollment number must be 14 digits and numeric.");
        return false;
    }

    // Roll number → numeric only
    if (isNaN(rollNo) || rollNo.trim() === "") {
        showError("Please give valid data: Roll number must be numeric.");
        return false;
    }

    // Name → must not contain digits
    if (/\d/.test(name) || name.trim() === "") {
        showError("Please give valid data: Name must not contain numbers.");
        return false;
    }

    // Section → must not contain digits
    if (/\d/.test(section) || section.trim() === "") {
        showError("Please give valid data: Section must not contain numbers.");
        return false;
    }

    // Course → must not contain digits
    if (/\d/.test(course) || course.trim() === "") {
        showError("Please give valid data: Course must not contain numbers.");
        return false;
    }

    // Subject → must not contain digits
    if (/\d/.test(subject) || subject.trim() === "") {
        showError("Please give valid data: Subject must not contain numbers.");
        return false;
    }

    // ✅ All good
    return true;
}

// ✅ Add Student Function
function addStudent() {
    const enrollmentNo = document.getElementById('enrollmentNo').value.trim();
    const rollNo = document.getElementById('rollNo').value.trim();
    const name = document.getElementById('name').value.trim();
    const section = document.getElementById('section').value.trim();
    const course = document.getElementById('course').value.trim();
    const subject = document.getElementById('subject').value.trim();

    // Empty field check
    if (!enrollmentNo || !rollNo || !name || !section || !course || !subject) {
        showError('Please fill all fields!');
        return;
    }

    // ✅ Validate all inputs first
    if (!validateInputs(enrollmentNo, rollNo, name, section, course, subject)) {
        return; // stop if invalid
    }

    // Duplicate enrollment number
    if (students.some(s => s.enrollmentNo === enrollmentNo)) {
        showError('Enrollment number already exists!');
        return;
    }

    // Room capacity check
    if (students.length >= ROOM_CAPACITY * TOTAL_ROOMS) {
        showError('All rooms are full! Maximum 250 students allowed.');
        return;
    }

    // ✅ If everything is valid → store data
    const roomNo = Math.floor(students.length / ROOM_CAPACITY) + 1;
    const seatNo = (students.length % ROOM_CAPACITY) + 1;

    const student = {
        enrollmentNo,
        rollNo,
        name,
        section,
        course,
        subject,
        roomNo,
        seatNo
    };

    students.push(student);
    showSuccess(`✅ Student added successfully! Assigned to Room ${roomNo}, Seat ${seatNo}`);
    clearForm();
    updateStats();
}
function searchStudent() {
    const enrollmentNo = document.getElementById('searchEnrollment').value.trim();

    if (!enrollmentNo) {
        showError('Please enter an Enrollment Number to search.');
        return;
    }

    // Find student by enrollment number
    const student = students.find(s => s.enrollmentNo === enrollmentNo);

    const resultCard = document.getElementById('resultCard');
    const resultDetails = document.getElementById('resultDetails');

    if (student) {
        resultCard.style.display = 'block';
        resultDetails.innerHTML = `
            <p><b>Enrollment No:</b> ${student.enrollmentNo}</p>
            <p><b>Name:</b> ${student.name}</p>
            <p><b>Roll No:</b> ${student.rollNo}</p>
            <p><b>Section:</b> ${student.section}</p>
            <p><b>Course:</b> ${student.course}</p>
            <p><b>Subject:</b> ${student.subject}</p>
            <p><b>Room No:</b> ${student.roomNo}</p>
            <p><b>Seat No:</b> ${student.seatNo}</p>
        `;
    } else {
        resultCard.style.display = 'block';
        resultDetails.innerHTML = `<p style="color:red;">❌ No student found with this enrollment number.</p>`;
    }
}


// ✅ Supporting Functions
function clearForm() {
    document.getElementById('enrollmentNo').value = '';
    document.getElementById('rollNo').value = '';
    document.getElementById('name').value = '';
    document.getElementById('section').value = '';
    document.getElementById('course').value = '';
    document.getElementById('subject').value = '';
}

function showError(message) {
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = message;
    errorMsg.classList.add('show');
    setTimeout(() => errorMsg.classList.remove('show'), 3000);
}

function showSuccess(message) {
    const successMsg = document.getElementById('successMsg');
    successMsg.textContent = message;
    successMsg.classList.add('show');
    setTimeout(() => successMsg.classList.remove('show'), 3000);
}

function updateStats() {
    const statsDiv = document.getElementById('stats');
    const roomCounts = {};

    for (let i = 1; i <= TOTAL_ROOMS; i++) {
        roomCounts[i] = 0;
    }

    students.forEach(s => {
        roomCounts[s.roomNo]++;
    });

    statsDiv.innerHTML = '';
    for (let i = 1; i <= TOTAL_ROOMS; i++) {
        statsDiv.innerHTML += `
            <div class="stat-card">
                <h4>Room ${i}</h4>
                <p>${roomCounts[i]}/${ROOM_CAPACITY}</p>
            </div>
        `;
    }

    statsDiv.innerHTML += `
        <div class="stat-card" style="border-left-color: #2ecc71;">
            <h4>Total Students</h4>
            <p>${students.length}</p>
        </div>
    `;
}
// --- NEW FUNCTION TO SAVE DATA ---
function saveData() {
    const taskList = document.getElementById("taskList");
    localStorage.setItem("data", taskList.innerHTML);
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    const taskList = document.getElementById("taskList");
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();

    taskDiv.innerHTML = `
        <div>
            <strong>${taskValue}</strong>
            <small>${dateString} - ${timeString}</small>
        </div>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(taskDiv);
    taskInput.value = ""; // clear input
    
    // Call save function after adding a task
    saveData();
}

function deleteTask(button) {
    button.parentElement.remove();
    
    // Call save function after deleting a task
    saveData();
}

// --- NEW FUNCTION TO SHOW DATA ON LOAD ---
function showTask() {
    const taskList = document.getElementById("taskList");
    // Load the data into the list container
    taskList.innerHTML = localStorage.getItem("data");
}

// Execute this when the script runs to load any existing data
showTask();
