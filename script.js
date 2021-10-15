console.log('JS hooked up')

const url = 'http://localhost:3000/notes/'

const notes = document.getElementById('notes-list')

const form = document.querySelector('#notes-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    // the .value at the end didn't autocomplete
    const noteText = document.getElementById('note-text').value
    console.log(noteText)
    createNote(noteText)
    form.reset()
})

notes.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        console.log('Note deleted!')
        deleteNote(e.target)
    }
    if (e.target.classList.contains('edit')) {
        console.log('editing note')
        updateNote(e.target)
    }
})

function renderNoteItem(noteObj) {
    // renders list item specifically
    const li = document.createElement('li')

    li.id = noteObj.id
    li.classList.add(
        'lh-copy',
        'pv3',
        'ba',
        'bl-0',
        'bt-0',
        'br-0',
        'b--dotted',
        'b--black-3'
    )
    // runs the function on li, noteObj
    renderNoteText(li, noteObj)
    notes.appendChild(li)

}

function renderNoteText(li, noteObj) {
    li.innerHtml = `
    <span class="dib w-60">${noteObj.body}</span>${noteObj.updated_at ? (noteObj.updated_at).format('MMM DD,YYYY') : ""
}<i class="ml2 dark-red fas fa-times delete" ></i > <i class="ml3 fas fa-edit edit"></i>
`

}

listNotes()

// holds fetch request that gets notes already in database
// console log in the 2nd response so you can see your data
function listNotes() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // for loop goes through whole array
            for (let item of data) {
                renderNoteItem(item)
            }
        })
}

function createNote(noteText) {
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: noteText,
            body: noteText,
            created_at: moment().format()
        })
    })
    .then(res => res.json())
    .then(data => renderNoteItem(data))
}

function deleteNote(noteEl) {
    fetch(url + '/' + `${noteEl}`, {
        method: 'DELETE'
    }).then(() => noteEl.parentElement.remove())
}

function updateNote(noteEl) {
    const noteText = document.getElementById('note-text').value
    fetch(url + '/' + `${noteEl.parentElement.id} `,{
        method: 'PUT',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
            title: noteText,
            body: noteText,
            updated_at: moment().format()
    })
})
        .then(res => res.json())
        .then(data => {
            renderNoteText(noteEl.parentElement, data)
        })
}








