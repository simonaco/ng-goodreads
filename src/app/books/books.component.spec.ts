import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FilterSearchPipe } from '../shared/filter-search.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchBoxComponent } from '../search-box/search-box.component';
import { BooksComponent } from './books.component';
import { BookTableComponent } from '../book-table/book-table.component';
import { Book } from '../shared/book.model';
import { BookService } from '../services/book.service';
import { of, throwError, Observable } from "rxjs";

const fixtureBooks: Book[] = [
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

fdescribe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let bookService: BookService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksComponent, BookTableComponent, SearchBoxComponent, FilterSearchPipe ],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        AppRoutingModule,
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    bookService = TestBed.get(BookService);
    spyOn(bookService, 'fetchBooks').and.returnValue(of(fixtureBooks));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
