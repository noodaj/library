class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages
        this.read = read;
    }

    print(){
        console.log(`Book ${this.title} Author ${this.author} Pages ${this.pages} ${this.read}`)
    }
}

class lib{
    constructor(){
        this.books = []
    }

    addBook(book){
        if(!this.inLib(book)){
            this.books.push(book);
        }
    }

    rmBook(title){
        this.books = this.books.filter((book) => book.title !== title)
    }

    inLib(book){
        return this.books.some(item => item.title === book.title)
    }
}

let library = new lib()
const addbtn = document.getElementById('add')
addbtn.onclick(addBook())

let getData = () => {
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let page = document.getElementById('page').value
    let read = document.getElementById('read').checked
    return new Book(title, author, page, read)
}

let test = new Book('Your mom', 'your dad', 20, 'read')
test.print();

function removeBook(){
    lib.rmBook(title)
}

function showLib(){

}

const addBook = (e) => {
    let book = getData()
    library.addBook(book)

}