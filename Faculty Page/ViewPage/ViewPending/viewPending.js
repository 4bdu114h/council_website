let sidebarOpen = false;

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const table = document.getElementById('myTable');
const filterBtn2 = document.getElementById('filter-btn-2');
const filterOptions2 = document.getElementById('filter-options-2');
const filterBtn3 = document.getElementById('filter-btn-3');
const filterOptions3 = document.getElementById('filter-options-3');

searchButton.addEventListener('click', filterAndSearchTable);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    filterAndSearchTable();
  }
});

filterBtn2.addEventListener('click', () => {
  filterOptions2.style.display = filterOptions2.style.display === 'block' ? 'none' : 'block';
});

filterBtn3.addEventListener('click', () => {
  filterOptions3.style.display = filterOptions3.style.display === 'block' ? 'none' : 'block';
});

Array.from(filterOptions2.children).forEach(child => {
  if (child.type === 'checkbox') {
    child.addEventListener('change', filterAndSearchTable);
  }
});

Array.from(filterOptions3.children).forEach(child => {
  if (child.type === 'checkbox') {
    child.addEventListener('change', filterAndSearchTable);
  }
});

function filterAndSearchTable() {
  const searchQuery = searchInput.value.toLowerCase();
  const rows = table.getElementsByTagName('tr');
  const selectedOptions2 = Array.from(filterOptions2.children)
    .filter(child => child.checked)
    .map(child => child.value);
  const selectedOptions3 = Array.from(filterOptions3.children)
    .filter(child => child.checked)
    .map(child => child.value);

  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    if (cells.length > 0) {
      const nameText = cells[0].textContent.toLowerCase();
      const col2Text = cells[1].textContent.toLowerCase();
      const col3Text = cells[2].textContent.toLowerCase();

      const matchesSearch = searchQuery === '' || nameText.includes(searchQuery);
      const matchesFilter2 = selectedOptions2.length === 0 || selectedOptions2.includes(col2Text);
      const matchesFilter3 = selectedOptions3.length === 0 || selectedOptions3.includes(col3Text);

      if (matchesSearch && matchesFilter2 && matchesFilter3) {
        rows[i].style.display = 'table-row';
      } else {
        rows[i].style.display = 'none';
      }
    }
  }
}


Array.from(filterOptions2.children).forEach(child => {
  if (child.type === 'checkbox') {
    child.addEventListener('change', filterAndSearchTable);
  }
});

Array.from(filterOptions3.children).forEach(child => {
  if (child.type === 'checkbox') {
    child.addEventListener('change', filterAndSearchTable);
  }
});

function toggleNav() {
  if (sidebarOpen) {
    document.getElementById("sidebar").style.width = "0";
    sidebarOpen = false;
  } else {
    document.getElementById("sidebar").style.width = "250px";
    sidebarOpen = true;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const viewButtons = document.querySelectorAll('.viewButton');
  const Moverlay = document.getElementById('overlay-member');
  const Coverlay = document.getElementById('overlay-certificate');
  const Aoverlay = document.getElementById('overlay-activity');
  const McloseButton = document.getElementById('closeButton-m');
  const CcloseButton = document.getElementById('closeButton-c');
  const AcloseButton = document.getElementById('closeButton-a');

  viewButtons.forEach(button => {
    button.addEventListener('click', () => {
      const row = button.parentNode.parentNode;
      const secondColumn = row.cells[1].textContent;
  
      if (secondColumn === 'Member') {
        Moverlay.style.display = 'flex';
      } else if (secondColumn === 'Certificate') {
        Coverlay.style.display = 'flex';
      } else if (secondColumn === 'Activity') {
        Aoverlay.style.display = 'flex';
      }
    });
  });

  McloseButton.addEventListener('click', function() {
      Moverlay.style.display = 'none';
  });
  AcloseButton.addEventListener('click', function() {
      Aoverlay.style.display = 'none';
  });
  CcloseButton.addEventListener('click', function() {
      Coverlay.style.display = 'none';
  });

  Aoverlay.addEventListener('click', function(event) {
      if (event.target === Aoverlay) {
          Aoverlay.style.display = 'none';
      }
  });
  Moverlay.addEventListener('click', function(event) {
      if (event.target === Moverlay) {
          Moverlay.style.display = 'none';
      }
  });
  Coverlay.addEventListener('click', function(event) {
      if (event.target === Coverlay) {
          Coverlay.style.display = 'none';
      }
  });
});
