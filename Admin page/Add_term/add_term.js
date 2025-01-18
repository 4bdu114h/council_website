function populateDropdown() {
    const termDropdown = document.getElementById('termDropdown');
    const currentYear = new Date().getFullYear();
    const numberOfYears = 5; // You can adjust this to the number of future years you want to display

    for (let i = 0; i < numberOfYears; i++) {
        const year = currentYear + i;
        const option = document.createElement('option');
        option.value = `${year}-${year + 1}`;
        option.textContent = `${year}-${year + 1}`;
        termDropdown.appendChild(option);
    }
}

function addTerm() {
    const termDropdown = document.getElementById('termDropdown');
    const selectedTerm = termDropdown.value;
    const termList = document.getElementById('termList');
    const newTerm = document.createElement('div');
    newTerm.className = 'term-item';
    newTerm.innerHTML = `<p>${selectedTerm}</p> <a href="view_year.html?term=${selectedTerm}"><img src="view_icon.png" alt="View Term"></a>`;
    termList.appendChild(newTerm);
}

window.onload = populateDropdown;

document.querySelector('.toggle-button').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('expanded');
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.style.display = sidebar.classList.contains('expanded') ? 'flex' : 'none';
});