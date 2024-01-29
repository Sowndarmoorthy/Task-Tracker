        let startTime;
        let timerInterval;
        let timerRunning = false;

        document.getElementById('startStopButton').addEventListener('click', toggleTimer);
        document.addEventListener('keydown', handleKeyPress);

        function toggleTimer() {
            if (timerRunning) {
                stopTimer();
            } else {
                startTimer();
            }
        }

        function startTimer() {
            startTime = new Date().getTime();
            timerInterval = setInterval(updateTimer, 1000);
            timerRunning = true;
            document.getElementById('startStopButton').innerText = 'Stop';
        }

        function stopTimer() {
            clearInterval(timerInterval);
            saveTask();
            timerRunning = false;
            document.getElementById('startStopButton').innerText = 'Start';
        }

        function updateTimer() {
            const currentTime = new Date().getTime();
            const elapsedTime = new Date(currentTime - startTime);
            const hours = elapsedTime.getUTCHours();
            const minutes = elapsedTime.getUTCMinutes();
            const seconds = elapsedTime.getUTCSeconds();

            document.getElementById('timer').innerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        function saveTask() {
            const task = document.getElementById('task').value;
            const description = document.getElementById('description').value;
            const timeSpent = document.getElementById('timer').innerText;

            // Add a new row to the table with task details
            const tableBody = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
            const newRow = tableBody.insertRow(tableBody.rows.length);
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            cell1.innerHTML = task;
            cell2.innerHTML = description;
            cell3.innerHTML = timeSpent;

            // Clear the form
            document.getElementById('taskForm').reset();

            // Reset the timer display
            document.getElementById('timer').innerText = '00:00:00';
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                toggleTimer();
            }
        }
    