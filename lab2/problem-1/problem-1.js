// let isAscendingOrder = true;

function addContact() {
 
    const errorDiv = document.getElementById('error');
    const nameInput = document.getElementById('name');
    const mobileInput = document.getElementById('mobile');
    const emailInput = document.getElementById('email');

    // Reset error
    errorDiv.innerText = '';
    
    const name = nameInput.value.trim();
    const mobile = mobileInput.value.trim();
    const email = emailInput.value.trim();

    if (!isValidName(name)) {
        errorDiv.innerText = 'Invalid name. Only alphabets and space allowed and should be <= 20 characters.';
        return;
    }

    if (!isValidMobile(mobile)) {
        errorDiv.innerText = 'Invalid mobile number. It should contain only 10 digits.';
        return;
    }

    if (!isValidEmail(email)) {
        errorDiv.innerText = 'Invalid email address or exceeds 40 characters.';
        return;
    }

    addContactToTable(name, mobile, email);
    
    // Clear the inputs
    nameInput.value = '';
    mobileInput.value = '';
    emailInput.value = '';
}

function searchContact() {
    const searchTerm = document.getElementById('search').value.trim();
    const rows = document.querySelectorAll('#contactsTable tr');
    let hasMatchingRow = false;

    rows.forEach((row, index) => {
        const mobile = row.querySelector('.mobileCell').innerText;
        if (mobile.includes(searchTerm)) {
            row.style.display = '';
            hasMatchingRow = true;
        } else {
            row.style.display = 'none';
        }
    });

    document.getElementById('noResult').style.display = hasMatchingRow ? 'none' : 'block';
}

function sortTable() {
    const tableBody = document.querySelector('#contactsTable');
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        const nameA = a.querySelector('.nameCell').innerText.toLowerCase();
        const nameB = b.querySelector('.nameCell').innerText.toLowerCase();
        
        if (nameA < nameB) return isAscendingOrder ? -1 : 1;
        if (nameA > nameB) return isAscendingOrder ? 1 : -1;
        return 0;
    });

    tableBody.innerHTML = '';
    rows.forEach(row => tableBody.appendChild(row));

    isAscendingOrder = !isAscendingOrder;
}

function isValidName(name) {
    return /^[A-Za-z\s]{1,20}$/.test(name);
}

function isValidMobile(mobile) {
    return /^\d{10}$/.test(mobile);
}

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email) && email.length <= 40;
}

function addContactToTable(name, mobile, email) {
    const row = document.createElement('tr');
    row.innerHTML = `<td class="nameCell">${name}</td><td class="mobileCell">${mobile}</td><td>${email}</td>`;
    document.querySelector('#contactsTable').appendChild(row);
}
