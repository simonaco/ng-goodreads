import { HttpClient, HttpClientModule, HttpErrorResponse } from "@angular/common/http";

import { Book } from "../shared/book.model";
import { BookService } from "./book.service";
import { of, throwError, Observable } from "rxjs";

const fixture: Book[] = [
  {
    id: "9780439023480",
    ISBN: "439023483",
    ISBN13: "9780439023480",
    authors: "Suzanne Collins",
    originalTitle: "The Hunger Games",
    originalPublicationYear: 2008,
    averageRating: 4.34,
    languageCode: "eng",
    smallImageUrl: "https://images.gr-assets.com/books/1447303603s/2767052.jpg"
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
    smallImageUrl: "https://images.gr-assets.com/books/1360206420s/11870085.jpg"
  }
];

describe("BookServiceService", () => {
  let service: BookService;
  let httpClientSpy: {
    get: jasmine.Spy,
    put: jasmine.Spy,
    post: jasmine.Spy,
    delete: jasmine.Spy
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get", "put", "post", "delete"]);
    service = new BookService(<any> httpClientSpy);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should fetch a list of books", () => {
    httpClientSpy.get.and.returnValue(of(fixture));

    service.fetchBooks().subscribe(data => expect(data).toEqual(fixture), fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it("should fetch a book by id", () => {
    const bookId = "9780525478810";
    httpClientSpy.get.and.returnValue(of(fixture[5]));

    service.fetchBook(bookId).subscribe(data => expect(data).toEqual(fixture[5]), fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it("should update a book by id", () => {
    const bookId = "9780525478810";
    const book = fixture[5];
    const updatePayload = { ...book, originalTitle: 'Meh, unused' };
    httpClientSpy.put.and.returnValue(of(updatePayload));

    service.updateBook(bookId, updatePayload).subscribe(data => expect(data).toEqual(updatePayload), fail);

    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it("should create a book", () => {
    const bookId = "9780525476610";
    const book = fixture[5];
    const createPayload = { ...book, originalTitle: 'Another title', id: bookId };
    httpClientSpy.post.and.returnValue(of(createPayload));

    service.createBook(createPayload).subscribe(data => expect(data).toEqual(createPayload), fail);

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it("should delete a book", () => {
    const bookId = "9780525478810";
    httpClientSpy.delete.and.returnValue(of(null));

    service.deleteBook(bookId).subscribe(data => expect(data).toEqual(null), fail);

    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

  it("should raise an error if a request fails", () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.get.and.returnValue(throwError({status: 404}));

    service.fetchBooks().subscribe(
      data => fail('expected error not data'),
      error => expect(error).toBe('Something bad happened; please try again later.')
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it("should raise an error if a request fails with network failure", () => {
    const errorResponse = new HttpErrorResponse({
      error: new ErrorEvent('timeout'),
      status: 408, statusText: 'Request timeout'
    });
    httpClientSpy.get.and.returnValue(throwError(errorResponse))

    service.fetchBooks().subscribe(
      data => fail('expected error not data'),
      error => expect(error).toBe('Something bad happened; please try again later.')
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
