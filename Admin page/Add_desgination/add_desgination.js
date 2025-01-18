function addDesignation() {
    let designation = prompt("Please enter the Designation:");
    if (designation) {
        let designationList = document.getElementById('designationList');
        let newDesignation = document.createElement('p');
        newDesignation.textContent = designation;

        let deleteIcon = document.createElement('img');
        deleteIcon.src = 'delete.png';
        deleteIcon.alt = 'Delete';
        deleteIcon.onclick = function () {
            designationList.removeChild(newDesignation);
        };

        newDesignation.appendChild(deleteIcon);
        designationList.appendChild(newDesignation);
    }
}
    document.querySelector('.toggle-button').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('expanded');
    });