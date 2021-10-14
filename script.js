console.log ('JS hooked up')

const url = 'http://localhost:3000/notes/'
const notes = document.getElementById('notes')

function listNotes() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for (let item of data) {
            renderNoteItem(item)
        }
    })
}

function renderNoteItem(noteObj) {
    const li = document.createElement('li')
    li.id = noteObj.id

    renderNoteText(li, noteObj)
    notes.appendChild(li)

}

function renderNoteText(li, noteObj) {
    li.innerHtml = `${noteObj.body}`

}

listNotes()

















// function listTodos() {
// fecth(url)
//     .then(res => JSON())
//     .then( data => {
//         for (item of data) {
//             renderTodoItem(item)

//         })
//     }
//     }

//     function renderTodoItem(todoObj) {
//         const li = document.createElement('li')
//         li.id = todoObj.id
//         li.classList.add(
//             // these string are TACHYONS class names
//             'lh-copy',
//             'pv-3',
//             'ba',
//             'bl-0',
//             'bt-0',
//             'br-0',
//             'b--dotted',
//             'b--black-3'
            
//         )

//         renderTodoText(li, todoObj)
//             todoList.appendChild
//     }

