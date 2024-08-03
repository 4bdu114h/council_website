function toggleButtons() {
    const year = document.getElementById('academic-year').value;
    const council = document.getElementById('council').value;
    const viewButton = document.getElementById('view-button');
    const editButton = document.getElementById('edit-button');
    const viewLink = document.getElementById('view-link');
    const editLink = document.getElementById('edit-link');

    if ( year && council) {
        viewButton.disabled = false;
        editButton.disabled = false;
        viewLink.href = `../ViewPage/ViewCertificate/viewCertificate.html?year=${encodeURIComponent(year)}&council=${encodeURIComponent(council)}`;
        editLink.href = `../EditPage/ApproveCertificate/approveCertificate.html?year=${encodeURIComponent(year)}&council=${encodeURIComponent(council)}`;
    } else {
        viewButton.disabled = true;
        editButton.disabled = true;
        viewLink.href = '#';
        editLink.href = '#';
    }
}