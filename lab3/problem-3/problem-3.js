document.addEventListener('DOMContentLoaded', () => {
    const { Subject } = rxjs;

    class Note {
        constructor(text, parent = null) {
            this.text = text;
            this.parent = parent;
            this.children = [];
            this.element = null;
            this.deleteSubject = new Subject();
        }

        createNoteElement() {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            noteDiv.textContent = this.text;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => {
                this.deleteNote();
            });

            noteDiv.appendChild(deleteButton);

            this.element = noteDiv;
            if (this.parent) {
                this.parent.deleteSubject.subscribe(() => {
                    this.deleteNote();
                });
            }

            return noteDiv;
        }

        deleteNote() {
          
            this.deleteSubject.next();

      
            this.element.remove();

   
            if (this.parent) {
                const index = this.parent.children.indexOf(this);
                if (index > -1) {
                    this.parent.children.splice(index, 1);
                }
            }

   
            this.deleteSubject.complete();
        }

        addChildNote(childNoteText) {
            const childNote = new Note(childNoteText, this);
            this.children.push(childNote);
            return childNote;
        }
    }


    const notesContainer = document.getElementById('notes-container');

    // Creating a top-level note
    const topLevelNote = new Note('This is a top-level note');
    notesContainer.appendChild(topLevelNote.createNoteElement());

    // Adding a child note to the top-level note
    const childNote = topLevelNote.addChildNote('This is a child note');
    notesContainer.appendChild(childNote.createNoteElement());
    

    // You can add more child notes in the same way
    const anotherChildNote = topLevelNote.addChildNote('This is another child note');
    notesContainer.appendChild(anotherChildNote.createNoteElement());
});
