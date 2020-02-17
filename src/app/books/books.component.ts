import { Component, OnInit } from '@angular/core';
import { Book } from "../shared/book.model";
import { Search } from "../shared/search.model";
import { BookService } from "../services/book.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  searchTitle: string = '';
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  getBooks() {
    this.bookService
      .fetchBooks()
      .subscribe((books) => {
        this.books = books;
      })
  }

  ngOnInit(): void {
    this.getBooks()
  }

  doSearch(search: Search) {
    this.searchTitle = search.searchTerm;
  }

  doAdd() {
    console.log('Adding book');
  }

  doDelete(bookId: string) {
    console.log(bookId);
    this.bookService
      .deleteBook(bookId)
      .subscribe(data => {
        this.getBooks();
      })
  }

  doEdit(bookId: string) {
    console.log(bookId);
  }
}
