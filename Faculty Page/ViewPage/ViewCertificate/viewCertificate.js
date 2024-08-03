let sidebarOpen = false;

document.addEventListener('DOMContentLoaded', function() {
  const viewButtons = document.querySelectorAll('.viewButton');
  const overlay = document.getElementById('overlay');
  const closeButton = document.getElementById('closeButton');

  viewButtons.forEach(button => {
      button.addEventListener('click', function() {
          overlay.style.display = 'flex';
      });
  });

  closeButton.addEventListener('click', function() {
      overlay.style.display = 'none';
  });

  overlay.addEventListener('click', function(event) {
      if (event.target === overlay) {
          overlay.style.display = 'none';
      }
  });
});

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const table = document.getElementById('myTable');

searchButton.addEventListener('click', searchTable);
searchInput.addEventListener('keypress', (e) => {
if (e.key === 'Enter') {
  searchTable();
}
});

function searchTable() {
const searchQuery = searchInput.value.toLowerCase();
const rows = table.getElementsByTagName('tr');

for (let i = 0; i < rows.length; i++) {
  const nameCell = rows[i].getElementsByTagName('td')[1];

  if (nameCell) {
    const nameText = nameCell.textContent.toLowerCase();

    if (nameText.includes(searchQuery)) {
      rows[i].style.display = 'table-row';
    } else {
      rows[i].style.display = 'none';
    }
  }
}
}

function toggleNav() {
  if (sidebarOpen) {
    document.getElementById("sidebar").style.width = "0";
    sidebarOpen = false;
  } else {
    document.getElementById("sidebar").style.width = "250px";
    sidebarOpen = true;
  }
  }
