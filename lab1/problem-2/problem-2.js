
function addNote() {
    const noteText = document.getElementById('note-text').value;
    const color = document.getElementById('color-selector').value;

    if (noteText) {
        const note = document.createElement('div');
        note.className = 'note';
        note.style.backgroundColor = color;
        note.innerHTML = `
            ${noteText}
            <span class="edit-btn" onclick="editNote(this)">Edit</span>
            <span class="delete-btn" onclick="deleteNote(this)">Delete</span>
        `;

        document.getElementById('notes-container').appendChild(note);
    }
}

function deleteNote(element) {
    const note = element.parentElement;
    document.getElementById('notes-container').removeChild(note);
}

function editNote(element) {
    const note = element.parentElement;
    const newText = prompt("Edit your note:", note.textContent.slice(0, -12)); // Removing the 'EditDelete' text
    if (newText) {
        note.firstChild.nodeValue = newText;
    }
}
