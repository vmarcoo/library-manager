const myLibrary = []
const myCovers = []

if (localStorage.length !== 0){
  let locallyStoredBooks = localStorage.getItem("Books")
  let currentShelf = JSON.parse(locallyStoredBooks)
  currentShelf.forEach((element) => myLibrary.push(element))
}

class Book {
    constructor(title, author, pages, read, cover) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.cover = cover;
    }
}

const addBtn = document.querySelector("#addBtn")
const addBook = document.querySelector("#addBook")
const modal = document.querySelector(".modal")
const cancelBtn = document.querySelector("#cancelBtn")
const saveBtn = document.querySelector("#saveBtn")
const allInputs = document.querySelectorAll("input")
const bookName = document.querySelector("#bookName")
const bookAuthor = document.querySelector("#bookAuthor")
const bookPages = document.querySelector("#bookPages")
const readInput = document.querySelector("#read")
const notReadInput = document.querySelector("#notRead")
const bookSubmit = document.querySelector("#bookSubmit")
const main = document.querySelector("main")
const cardsSection = document.querySelector("#main")

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none"
  }
});

addBtn.addEventListener("click", () => {
  modal.style.display = "flex"
})

addBtn.addEventListener("click", () => {
  addBook.style.display = "flex"
})

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none"
  allInputs.forEach((input) => {
    input.value = null;
    input.checked = null;
  })
})

createCards()

bookSubmit.addEventListener("submit", (e) => {
  submitForm(e)
})

function submitForm(e){

  e.preventDefault(e)
  let isRead;
  if (readInput.checked && !notReadInput.checked) isRead = true
  if (!readInput.checked && notReadInput.checked) isRead = false
  
  if (myLibrary.length === 0) {

    const book = new Book(bookName.value, bookAuthor.value, bookPages.value, isRead)  
    myLibrary.push(book)
    localStorage.setItem("Books", JSON.stringify(myLibrary))
    let locallyStoredBooks = localStorage.getItem("Books")
    let currentShelf = JSON.parse(locallyStoredBooks)
    myLibrary.length = 0
    currentShelf.forEach((element) => myLibrary.push(element))

    allInputs.forEach((input) => {
      input.value = null;
      input.checked = null;
    })
    modal.style.display = "none"    
    
    createCards();
    return
  }

  let isTitleAvailable = true
  let wantedTitle = bookName.value

  myLibrary.forEach((item) => {
    let storedTitle = item.title
    if (storedTitle.toUpperCase() === wantedTitle.toUpperCase()){
      isTitleAvailable = false
    }
  })

  if (isTitleAvailable){
    const book = new Book(bookName.value, bookAuthor.value, bookPages.value, isRead)  
    myLibrary.push(book)
    localStorage.clear()
    localStorage.setItem("Books", JSON.stringify(myLibrary))
    let locallyStoredBooks = localStorage.getItem("Books")
    let currentShelf = JSON.parse(locallyStoredBooks)
    myLibrary.length = 0
    currentShelf.forEach((element) => myLibrary.push(element))

    allInputs.forEach((input) => {
      input.value = null;
      input.checked = null;
    })
    modal.style.display = "none"    
    
    createCards();
    return
  }
  
  return alert("This book is already in your library!")
}

function createCards() {

  myLibrary.forEach((book) => {
    const card = document.createElement("div")
    card.setAttribute("id", `_${(book.title).replace(/[:.-\s]/g, "").toLowerCase()}`)
    card.classList.add("card")
    const cardExists = document.querySelector(`#_${(book.title).replace(/[:.-\s]/g, "").toLowerCase()}`)

    let bookWasRead;

    if (book.read) {
      bookWasRead = "Read"
    }

    else {
      bookWasRead = "Not read"
    }
    
    if (cardsSection.contains(cardExists)) {
      return
    }

    else {
      card.innerHTML = `
      <div id="imageFrame">
        <img id="cover-img" alt="">

        <div id="addImgBtn">
          <label for="cover-img-input">Change cover</label>
          <input type="file" id="cover-img-input" class="_${(book.title).replace(/[:.-\s]/g, "").toLowerCase()}" name="img" accept="image/*">
        </div>  
      </div>

      <div id="cardParagraphs">
        <p id="cardTitle">${book.title}</p>
        <p id="cardAuthor">${book.author}</p>
        <p id="cardPages">${book.pages}&nbsppages</p>
      </div>
        
      <div id="cardButtons">
        <button id="cardRead">${bookWasRead}</button>
        <button id="cardEdit">Edit</button>
        <button id="cardRemove">Remove</button>
      </div>`

      cardsSection.append(card)
      const cardReadBtn = document.querySelectorAll("#cardRead")
      cardReadBtn.forEach((button) => {
        if (button.textContent === "Read") {button.classList.add("readBtnBg")}
        else {button.classList.add("notReadBtnBg")}
      })
    }
  })
}

const coverInput = document.querySelectorAll("#cover-img-input")
coverInput.forEach((input) => {
  input.addEventListener("change", () => {
    const reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    
    reader.addEventListener("load", () => {
      myLibrary.forEach((book) => {
        if(`_${book.title.replace(/[:.-\s]/g, "").toLowerCase()}` == input.classList){

        }

        
      })
    });

    const newCover = document.querySelector("#cover-img");
  
    newCover.src = localStorage.getItem("cover");
  });  
})