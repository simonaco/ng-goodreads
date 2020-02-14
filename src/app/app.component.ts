import { Component } from "@angular/core";
import { Book } from "./shared/book.model";
import { Search } from "./shared/search.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ng-goodreads";
  searchTitle: string = "";
  books: Book[] = [
    {
      id: "9780439023480",
      ISBN: "439023483",
      ISBN13: "9780439023480",
      authors: "Suzanne Collins",
      originalTitle: "The Hunger Games",
      originalPublicationYear: 2008,
      averageRating: 4.34,
      languageCode: "eng",
      smallImageUrl:
        "https://images.gr-assets.com/books/1447303603s/2767052.jpg"
    },
    {
      id: "9780439554930",
      ISBN: "439554934",
      ISBN13: "9780439554930",
      authors: "J.K. Rowling, Mary GrandPré",
      originalTitle: "Harry Potter and the Philosopher's Stone",
      originalPublicationYear: 1997,
      averageRating: 4.44,
      languageCode: "eng",
      smallImageUrl: "https://images.gr-assets.com/books/1474154022s/3.jpg"
    },
    {
      id: "9780316015840",
      ISBN: "316015849",
      ISBN13: "9780316015840",
      authors: "Stephenie Meyer",
      originalTitle: "Twilight",
      originalPublicationYear: 2005,
      averageRating: 3.57,
      languageCode: "en-US",
      smallImageUrl: "https://images.gr-assets.com/books/1361039443s/41865.jpg"
    },
    {
      id: "9780061120080",
      ISBN: "61120081",
      ISBN13: "9780061120080",
      authors: "Harper Lee",
      originalTitle: "To Kill a Mockingbird",
      originalPublicationYear: 1960,
      averageRating: 4.25,
      languageCode: "eng",
      smallImageUrl: "https://images.gr-assets.com/books/1361975680s/2657.jpg"
    },
    {
      id: "9780743273560",
      ISBN: "743273567",
      ISBN13: "9780743273560",
      authors: "F. Scott Fitzgerald",
      originalTitle: "The Great Gatsby",
      originalPublicationYear: 1925,
      averageRating: 3.89,
      languageCode: "eng",
      smallImageUrl: "https://images.gr-assets.com/books/1490528560s/4671.jpg"
    },
    {
      id: "9780525478810",
      ISBN: "525478817",
      ISBN13: "9780525478810",
      authors: "John Green",
      originalTitle: "The Fault in Our Stars",
      originalPublicationYear: 2012,
      averageRating: 4.26,
      languageCode: "eng",
      smallImageUrl:
        "https://images.gr-assets.com/books/1360206420s/11870085.jpg"
    }
  ];

  doSearch(search: Search) {
    this.searchTitle = search.searchTerm;
  }
}
