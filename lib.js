const curTable = document.getElementById('lib-table')
const title = document.getElementById('title')
const author = document.getElementById('author')
const page = document.getElementById('page')
const pagesRead = document.getElementById('pagesRead')
const read = document.getElementById('read')
const remove = document.getElementById('remove')
const rmvTitle = document.getElementById('rmTitle')
const readHeader = document.getElementById('booksRead')
const unread = document.getElementById('unreadBooks')
const total = document.getElementById('totalBooks')

//book class 
class Book {
    constructor(title, author, pagesRead, pages, read) {
        this.title = title;
        this.author = author;
        this.pagesRead = pagesRead;
        this.pages = pages
        this.read = read;
        this.index = null;
    }
}

//library class 
class lib {
    constructor() {
        this.books = []
    }

    //checks if curr book is in lib if not adds the book 
    addBook(book) {
        if (!this.inLib(book)) {
            console.log('pushed')
            this.books.push(book);
            book.index = this.books.length
        }
        else {
            console.log('not new book')
        }
    }

    //removes a book 
    rmBook(title) { this.books = this.books.filter((book) => book.title !== title) }

    //checks if book is in lib 
    inLib(book) { return this.books.some(item => item.title === book.title)}

    size() { return this.books.length }

    clearLib() {this.books = [];}
}

//creates new lib 
let library = new lib()

const addBook = () => {
    let book = getData()
    library.addBook(book)
    reset()
    showLib()
}

let getData = () => {
    return new Book(title.value, author.value, pagesRead.value, page.value, read.checked)
}

let reset = () => {
    if(clear.onlick){
        library.clearLib();
    }
    curTable.innerHTML = ''
    readHeader.innerHTML = ''
    total.innerHTML = ''
    unread.innerHTML = ''
}

function removeBook() {
    library.rmBook(title)
}

function showLib() {
    library.books.forEach(book => {
        if (library.inLib(book)) {
            let libTable = document.createElement('tr')
            //libTable.classList.add('')
            libTable.innerHTML =
                `Title: ${book.title} 
            Author: ${book.author}
            Pages Read: ${book.pagesRead}
            Pages: ${book.pages}
            Percentage: ${findPercentage(book)}%
            Read: ${book.read}
            `
            curTable.append(libTable)

            if (book.read === 'true') {
                let read = document.createElement('li')
                read.innerHTML = `${book.title}`
                readHeader.append(read)
            }
            else if (book.read === 'false'){
                let notread = document.createElement('li')
                notread.innerHTML = `${book.title}`
                unread.append(notread)
            }

            let curBook = document.createElement('li')

            curBook.innerHTML = `${book.title} with ${findPercentage(book)}% read`
            total.append(curBook)
        }
    })
}

let findPercentage = (book) => ((Number(book.pagesRead) / Number(book.pages)) * 100).toPrecision(4)

let addBtn = document.getElementById('add').addEventListener('click', (e) => {
    e.preventDefault()
    if(title.value.length == 0 || author.value.length == 0 || pagesRead.value.length == 0 || page.value.length == 0 ){
        alert('Fill in all blanks')
    }
    else{
        addBook()
    }
    title.value = author.value = pagesRead.value = page.value = ''
})

let rmvBtn = document.getElementById('remove').addEventListener('click', console.log(rmvTitle.value))
let clearBtn = document.getElementById('clear').addEventListener('click', reset)

// testing 
const book1 = new Book('Harry Potter', 'JK Rowling', 220, 223, 'true')
const book2 = new Book('Chamber of Secrets', 'JK Rowling', 120, 251, 'false')

library.addBook(book1)
library.addBook(book2)
showLib()