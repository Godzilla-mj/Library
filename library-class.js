class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }
}

const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295);
const lor = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1137);
const alice = new Book("Alice's Adventures in Wonderland", "Lewis Carroll", 200)
const alchemist = new Book("The Alchemist", "Paolo Coelho", 208)

let library = [hobbit, lor, alice, alchemist]

const formContainer = document.querySelector('#form-showblock')

function addToLibrary() {
  const titleForm = document.querySelector('.title')
  const authorForm = document.querySelector('.author')
  const pageForm = document.querySelector('.pages')
  const readForm = document.querySelector('.read')
  const newBook = new Book( titleForm.value,  authorForm.value,
                            pageForm.value,   readForm.value)
  library.push(newBook);
  titleForm.value = authorForm.value = pageForm.value = ''
  readForm.value = false
  render()
  formContainer.classList.toggle('form-show')
}//addToLibrary() closure

function render() {
  const bookshelf = document.querySelector('.bookshelf')
  let cover = ''
  if (library.length === 0) {
    cover = `
      <div class = "book-cover"
            <h1>No Books</h1>
      </div>
      `
    bookshelf.innerHTML = cover
  } else {
    for (let book in library) {
      cover += `
        <div class = "book-cover">
          <h3 class = "cover-title"> ${library[book].title}</h3>
          <h4 class = "cover-author"> Written By: ${library[book].author}</h4>
          <h6 class = "cover-pages"> ${library[book].pages} pages </h6>
          <button type = "button" class = "cover-read-status" data-title = "${library[book].title}">${library[book].read ? "Read" : "Unread"}</button>
          <button type = "button" class = "cover-delete" data-title = "${library[book].title}">Delete </button>
        </div>
      `
    }
    bookshelf.innerHTML = cover
    deleteBookBtns = document.querySelectorAll('.cover-delete')
    readBtns = document.querySelectorAll('.cover-read-status')
    activateBtns()
  }
}//render() closure

function activateBtns() {
  deleteBookBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let index = library.findIndex( obj => obj.title === e.target.dataset.title)
      library.splice(index, 1)
      render()
    })
  })//forEach closure
  readBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let index = library.findIndex( obj => obj.title === e.target.dataset.title)
      library[index].read = !library[index].read
      render()
    })
  })
}//activateBtns() closure

const submission = document.querySelector('.submit')
const newBookBtn = document.querySelector('.new-book-button')

submission.addEventListener('click', addToLibrary)
newBookBtn.addEventListener('click', () => formContainer.classList.toggle('form-show'))

render()
