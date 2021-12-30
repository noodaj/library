const curTable = document.getElementById('lib-table')
const title = document.getElementById('title')
const author = document.getElementById('author')
const page = document.getElementById('page')
const pagesRead = document.getElementById('pagesRead')
const read = document.getElementById('read')
const remove = document.getElementById('remove')
const rmvTitle = document.getElementById('rmTitle')
const readHeader = document.getElementById('readHeader')

class Book {
    constructor(title, author, pagesRead, pages, read) {
        this.title = title;
        this.author = author;
        this.pagesRead = pagesRead;
        this.pages = pages
        this.read = read;
        this.index = null;
    }

    print() {
        console.log(`Book ${this.title} Author ${this.author} Pages Read ${this.pagesRead} Pages ${this.pages} ${this.read}`)
    }
}

class lib {
    constructor() {
        this.books = []
    }

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

    rmBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }

    inLib(book) {
        return this.books.some(item => item.title === book.title)
    }

    size() {
        return this.books.length
    }

    clearLib() {
        this.books = [];
    }
}

let library = new lib()

const addBook = (e) => {
    e.preventDefault()
    let book = getData()
    library.addBook(book)
    reset()
    showLib()
}

let getData = () => {
    return new Book(title.value, author.value, pagesRead.value, page.value, read.checked)
}

let reset = () => {
    curTable.innerHTML = ''
    readHeader.innerHTML = ''
}

let clear = () => {
    library.clearLib();
    curTable.innerHTML = ''
    readHeader.innerHTML = ''

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
                console.log(`${book.title} has been read`)
                let read = document.createElement('li')
                read.innerHTML = ` ${book.title}`
                readHeader.append(read)
            }
            else {
                let read = document.createElement('li')
                read.innerHTML = ` ${book.title}`
                readHeader.append(read)
            }
        }
    })
}

let findPercentage = (book) => ((Number(book.pagesRead) / Number(book.pages)) * 100).toPrecision(4)


let addBtn = document.getElementById('add').addEventListener('click', addBook)
let rmvBtn = document.getElementById('remove').addEventListener('click', console.log(rmvTitle.value))
let clearBtn = document.getElementById('clear').addEventListener('click', clear)

const book1 = new Book('Harry Potter', 'JK Rowling', 220, 223, 'true')
const book2 = new Book('Chamber of Secrets', 'JK Rowling', 120, 251, 'false')

library.addBook(book1)
library.addBook(book2)
showLib()