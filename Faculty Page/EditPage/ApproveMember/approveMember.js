let sidebarOpen = false;

// document.addEventListener('DOMContentLoaded', function() {
//   const viewButtons = document.querySelectorAll('.viewButton');
//   const overlay = document.getElementById('overlay');
//   const closeButton = document.getElementById('closeButton');

//   viewButtons.forEach(button => {
//       button.addEventListener('click', function() {
//           overlay.style.display = 'flex';
//       });
//   });

//   closeButton.addEventListener('click', function() {
//       overlay.style.display = 'none';
//   });

//   // overlay.addEventListener('click', function(event) {
//   //     if (event.target === overlay) {
//   //         overlay.style.display = 'none';
//   //     }
//   // });
// });

document.addEventListener('DOMContentLoaded', function () {
  const viewButtons = document.querySelectorAll('.viewButton');
  const overlay = document.getElementById('overlay');
  const closeButton = document.getElementById('closeButton');
  const approveButton = document.getElementById('approveButton');
  const declineButton = document.getElementById('declineButton');
  const overlayReject = document.getElementById('overlay-reject');
  const cancelBtn = document.getElementById('cancelBtn');
  const declineBtn = document.getElementById('declineBtn');
  const reasonInput = document.getElementById('reason');

  let currentRow = null; 

  viewButtons.forEach((button) => {
    button.addEventListener('click', function () {
      overlay.style.display = 'flex';
      currentRow = this.closest('tr');
    });
  });

  closeButton.addEventListener('click', function () {
    overlay.style.display = 'none';
  });

  approveButton.addEventListener('click', function () {
    if (currentRow) {
      currentRow.remove();
      overlay.style.display = 'none';
    }
  });

  declineButton.addEventListener('click', function () {
    overlayReject.style.display = 'flex';
  });

  cancelBtn.addEventListener('click', function () {
    overlayReject.style.display = 'none'; 
  });

  declineBtn.addEventListener('click', function () {
    const reason = reasonInput.value.trim();
    if (reason === '') {
      alert('Please provide a reason for decline.');
      return;
    }

    if (currentRow) {
      currentRow.remove(); 
      overlay.style.display = 'none'; 
      overlayReject.style.display = 'none'; 
    }
  });
});

document.getElementById('approve-btn').addEventListener('click', function() {
  const table = document.getElementById('myTable').getElementsByTagName('tbody')[0];
  const rows = Array.from(table.rows);
  
  rows.forEach(row => {
      const checkbox = row.cells[0].querySelector('input[type="checkbox"]');
      if (checkbox && checkbox.checked) {
          table.deleteRow(row.rowIndex - 1);
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