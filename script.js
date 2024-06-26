const booksTable = document.getElementById('books-table')
const booksForm = document.getElementById('book-form')
const booksTableBody = booksTable.children
const booksTableEnd = document.getElementById('end-table')

let myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
	this.info = function() {
		return [title, author, pages, read]
	}
}

Book.prototype.toggleReadMethod = function() {
	if (this.read == true) {
		this.read = false
	}
	else {
		this.read = true
	}
}

function addBookToDOM(book, i) {
	let newRow = document.createElement('tr');

	let tablePosition = i

	let titleCell = document.createElement('td');
	titleCell.textContent = book.title;

	let authorCell = document.createElement('td');
	authorCell.textContent = book.author;

	let pagesCell = document.createElement('td');
	pagesCell.textContent = book.pages;

	let readCell = document.createElement('td');
	let readOrNotDiv = document.createElement('div');
	readOrNotDiv.classList.add('read-or-not');
	book.read ? null : readOrNotDiv.classList.add('not-read');
	readCell.appendChild(readOrNotDiv);
	readOrNotDiv.addEventListener('click', function (e) {
		myLibrary[tablePosition].toggleReadMethod();
		updateDOM(myLibrary)
	})

	let deleteCell = document.createElement('td');
	let deleteIcon = document.createElement('img');
	deleteIcon.classList.add('delete-icon');
	deleteIcon.dataset.position = tablePosition
	deleteIcon.src = "delete-left-solid.svg";
	deleteCell.appendChild(deleteIcon)
	deleteIcon.addEventListener('click', function (e) {
		deleteBook(e)
	})

	newRow.appendChild(titleCell);
	newRow.appendChild(authorCell);
	newRow.appendChild(pagesCell);
	newRow.appendChild(readCell);
	newRow.appendChild(deleteCell);

	booksTable.lastElementChild.insertBefore(newRow, booksTable.lastElementChild.lastElementChild);
}

function addBookToLibrary(e) {
	let book = createBook(e.target.elements.title.value, e.target.elements.author.value, e.target.elements.pages.value, e.target.elements.read.checked)
	myLibrary.push(book)
}

function updateDOM(array) {
	clearTable();
	for (let i = 0; i < array.length; i++) {
		addBookToDOM(array[i], i)
	}
}

function clearTable() {
	let tableElements = booksTable.firstElementChild.childElementCount;
	for (let i = 0; i < tableElements-2; i++) {
		booksTable.firstElementChild.removeChild(booksTable.firstElementChild.children[1])
	}
}

function createBook(title, author, pages, read) {
	let newBook = new Book(title, author, pages, read);
	return newBook
}

booksForm.addEventListener('submit', function (e) {
	e.preventDefault()
	addBookToLibrary(e);
	updateDOM(myLibrary)
})

function deleteBook(e) {
	myLibrary.splice(e.target.dataset.position,1);
	updateDOM(myLibrary)
}

const submitBtn = document.querySelector('#submit')
submitBtn.addEventListener('click', () => {
	titleValidation()
	authorValidation()
})

function titleValidation() {
	const titleInput = document.querySelector('#title')
	if (titleInput.validity.valueMissing) {
		titleInput.setCustomValidity('Please enter the title of your book')
	}
	else titleInput.setCustomValidity('')
}

function authorValidation() {
	const authorInput = document.querySelector('#author')
	if (authorInput.validity.valueMissing) {
		authorInput.setCustomValidity('Please enter the author of your book')
	}
	else authorInput.setCustomValidity('')
}
