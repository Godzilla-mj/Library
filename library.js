
//DOM assignemnts
const bookshelf = document.querySelector('.bookshelf')
const newBookBtn = document.querySelector('.new-book-button')
const formContainer = document.querySelector('#form-showblock')
const submission = document.querySelector('#submit')
const bookForm = document.querySelector('.book-form1')
const titleForm = document.querySelector('#title')
const authorForm = document.querySelector('#author')
const pageForm = document.querySelector('#pages')
const readForm = document.querySelector('#read')

//Starter library
const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295);
const lor = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1137);
const alice = new Book("Alice's Adventures in Wonderland", "Lewis Carroll", 200)
const alchemist = new Book("The Alchemist", "Paolo Coelho", 208)

let library = [hobbit, lor, alice, alchemist];

function Book(title, author, pages, read = false) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(e) {
  const newBook = new Book( titleForm.value,
                            authorForm.value,
                            pageForm.value,
                            readForm.value)
  library.push(newBook);
  titleForm.value = ""
  authorForm.value = ""
  pageForm.value = ""
  readForm.checked = false
  render()
  formContainer.classList.toggle('form-show')
}

function render() {
  let cover = ''
  if (library.length === 0){
    cover = `
      <div class = "book-cover"
            <h1>No Books</h1>
      </div>
      `
  }else {
    for (let i = 0; i < library.length; i++) {
      cover += `
        <div class = "book-cover">
          <h3 class = "cover-title"> ${library[i].title}</h4>
          <h4 class = "cover-author"> Written By: ${library[i].author}</h6>
          <h6 class = "cover-pages"> ${library[i].pages} pages </h6>
          <button type = "button" class = "cover-read-status" data-title = "${library[i].title}">${library[i].read ? "Read" : "Unread"}</button>
          <button type = "button" class = "cover-delete" data-title = "${library[i].title}">Delete </button>
        </div>
      `
    }
    bookshelf.innerHTML = cover
    deleteBookBtns = document.querySelectorAll('.cover-delete')
    readBtns = document.querySelectorAll('.cover-read-status')
    activateBtns()
  }
}

function deleteBookFromLibrary(index) {
  library.splice(index, 1)
  render()
  setTimeout(render, 100)
}

function activateBtns() {
  deleteBookBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let index = library.findIndex( obj => obj.title === e.target.dataset.title)
      deleteBookFromLibrary(index)
    })
  })
  readBtns.forEach((btn) => {
    btn.addEventListener('click', e => {
      let index = library.findIndex( obj => obj.title === e.target.dataset.title)
      library[index].read = !library[index].read
      render()
    })
  })
}

submission.addEventListener('click', addBookToLibrary)
newBookBtn.addEventListener('click', () => formContainer.classList.toggle('form-show'))


render()
