let facultyCount = 1;
let staffCount = 0;

function validateForm() {
    // Check if the email and mobile number inputs meet the requirements
    const emails = document.querySelectorAll('[id^="facultyEmail"], [id^="staffEmail"]');
    const mobiles = document.querySelectorAll('[id^="facultyMobile"], [id^="staffMobile"]');
    
    for (const email of emails) {
        if (!email.value.endsWith('@somaiya.edu')) {
            alert('All faculty and staff emails must end with @somaiya.edu');
            return false;
        }
    }

    for (const mobile of mobiles) {
        if (!/^\d{10}$/.test(mobile.value)) {
            alert('All mobile numbers must be exactly 10 digits long');
            return false;
        }
    }

    return true;
}

function addFaculty() {
    facultyCount++;
    const facultyContainer = document.getElementById('facultyContainer');
    const newFacultyGroup = document.createElement('div');
    newFacultyGroup.className = 'faculty-input-group';
    newFacultyGroup.innerHTML = `
        <h4>Faculty ${facultyCount}</h4>
        <div class="input-group">
            <label for="facultyInCharge${facultyCount}">Faculty in-Charge:</label>
            <input type="text" id="facultyInCharge${facultyCount}" name="facultyInCharge${facultyCount}" required>
        </div>
        <div class="input-group">
            <label for="facultyMobile${facultyCount}">Mobile Number:</label>
            <input type="text" id="facultyMobile${facultyCount}" name="facultyMobile${facultyCount}" required pattern="\\d{10}" title="Mobile number must be 10 digits long">
        </div>
        <div class="input-group">
            <label for="facultyEmail${facultyCount}">Email ID:</label>
            <input type="email" id="facultyEmail${facultyCount}" name="facultyEmail${facultyCount}" required pattern=".+@somaiya\\.edu$" title="Email must be in the format: example@somaiya.edu">
        </div>
        <div class="member-checkbox">
            <label for="facultyMember${facultyCount}">Member</label>
            <input type="checkbox" id="facultyMember${facultyCount}" name="facultyMember${facultyCount}">
        </div>
    `;
    facultyContainer.appendChild(newFacultyGroup);
}

function addStaff() {
    staffCount++;
    const staffContainer = document.getElementById('staffContainer');
    const newStaffGroup = document.createElement('div');
    newStaffGroup.className = 'faculty-input-group';
    newStaffGroup.innerHTML = `
        <h4>Staff ${staffCount}</h4>
        <div class="input-group">
            <label for="staffInCharge${staffCount}">Staff in-Charge:</label>
            <input type="text" id="staffInCharge${staffCount}" name="staffInCharge${staffCount}" required>
        </div>
        <div class="input-group">
            <label for="staffMobile${staffCount}">Mobile Number:</label>
            <input type="text" id="staffMobile${staffCount}" name="staffMobile${staffCount}" required pattern="\\d{10}" title="Mobile number must be 10 digits long">
        </div>
        <div class="input-group">
            <label for="staffEmail${staffCount}">Email ID:</label>
            <input type="email" id="staffEmail${staffCount}" name="staffEmail${staffCount}" required pattern=".+@somaiya\\.edu$" title="Email must be in the format: example@somaiya.edu">
        </div>
    `;
    staffContainer.appendChild(newStaffGroup);
}

document.querySelector('.toggle-button').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('expanded');
});