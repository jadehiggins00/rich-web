document.addEventListener('DOMContentLoaded', () => {
    const { fromEvent } = rxjs;

    const addNoteButton = document.getElementById('addNoteButton');
    const noteText = document.getElementById('note-text');
    const colorSelector = document.getElementById('color-selector');
    const notesContainer = document.getElementById('notes-container');

    const addNoteStream = fromEvent(addNoteButton, 'click');

    
    addNoteStream.subscribe(() => {
        const note = document.createElement('div');
        note.classList.add('note'); 
        note.textContent = noteText.value;
        note.style.backgroundColor = colorSelector.value;
        notesContainer.appendChild(note);
        noteText.value = ''; 
    });
});
