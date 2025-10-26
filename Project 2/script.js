alert("Examination Seating Arrangement")
  let students = [];
        const ROOM_CAPACITY = 50;
        const TOTAL_ROOMS = 5;

        function addStudent() {
            const enrollmentNo = document.getElementById('enrollmentNo').value.trim();
            const rollNo = document.getElementById('rollNo').value.trim();
            const name = document.getElementById('name').value.trim();
            const section = document.getElementById('section').value.trim();
            const course = document.getElementById('course').value.trim();
            const subject = document.getElementById('subject').value.trim();

            if (!enrollmentNo || !rollNo || !name || !section || !course || !subject) {
                showError('Please fill all fields!');
                return;
            }

            if (students.some(s => s.enrollmentNo === enrollmentNo)) {
                showError('Enrollment number already exists!');
                return;
            }

            if (students.length >= ROOM_CAPACITY * TOTAL_ROOMS) {
                showError('All rooms are full! Maximum 250 students allowed.');
                return;
            }

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
            showSuccess(`Student added successfully! Assigned to Room ${roomNo}, Seat ${seatNo}`);
            clearForm();
            updateStats();
        }

        function searchStudent() {
            const searchValue = document.getElementById('searchEnrollment').value.trim();
            
            if (!searchValue) {
                showError('Please enter an enrollment number!');
                return;
            }

            const student = students.find(s => s.enrollmentNo === searchValue);
            
            if (student) {
                displayResult(student);
            } else {
                showError('Student not found! Please check the enrollment number.');
                document.getElementById('resultCard').classList.remove('show');
            }
        }

        function displayResult(student) {
            const resultDetails = document.getElementById('resultDetails');
            resultDetails.innerHTML = `
                <div class="result-item">
                    <strong>Enrollment No</strong>
                    <span>${student.enrollmentNo}</span>
                </div>
                <div class="result-item">
                    <strong>Roll No</strong>
                    <span>${student.rollNo}</span>
                </div>
                <div class="result-item">
                    <strong>Name</strong>
                    <span>${student.name}</span>
                </div>
                <div class="result-item">
                    <strong>Section</strong>
                    <span>${student.section}</span>
                </div>
                <div class="result-item">
                    <strong>Course</strong>
                    <span>${student.course}</span>
                </div>
                <div class="result-item">
                    <strong>Subject</strong>
                    <span>${student.subject}</span>
                </div>
                <div class="result-item" style="grid-column: 1 / -1; background: rgba(255,255,255,0.3); font-size: 1.2em;">
                    <strong>📍 Room Location</strong>
                    <span>Room ${student.roomNo} - Seat ${student.seatNo}</span>
                </div>
            `;
            document.getElementById('resultCard').classList.add('show');
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

        updateStats();