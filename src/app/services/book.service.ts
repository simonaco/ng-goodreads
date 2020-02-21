import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Book } from '../shared/book.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  fetchBooks() {
    return this.http.get<Book[]>('/api/books', httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
  }

  fetchBook(bookId: string) {
    return this.http.get<Book>(`/api/books/${bookId}`, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
  }

  createBook(book: Book) {
    return this.http.post<Book>('/api/books', book, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateBook(bookId: string, book: Book) {
    return this.http.put<Book>(`/api/books/${bookId}`, book, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteBook(bookId: string) {
    return this.http.delete<Book>(`/api/books/${bookId}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
}
