import { Component, OnInit } from "@angular/core";
import { Book } from "./shared/book.model";
import { Search } from "./shared/search.model";
import { BookService } from "./services/book.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "ng-goodreads";
  searchTitle: string = "";
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  getBooks() {
    this.bookService
      .fetchBooks()
      .subscribe((books) => {
        this.books = books;
      })
  }

  ngOnInit() {
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
