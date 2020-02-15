import { AfterViewInit, Component, OnInit, OnChanges, Input, ViewChild, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BookTableDataSource } from './book-table-datasource';
import { Book } from '../shared/book.model';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() books: Book[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Book>;
  dataSource: BookTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'edit',
    'delete',
    'id',
    'ISBN',
    'ISBN13',
    'originalTitle',
    'authors',
    'originalPublicationYear',
    'languageCode',
    'averageRating',
    'smallImageUrl'
  ];

  constructor() {
    this.dataSource = new BookTableDataSource([]);
  }

  ngOnInit() {
    this._refresh(this.books)
  }

  _refresh(books: Book[]) {
    this.dataSource.books = books
  }

  ngOnChanges(changes: SimpleChanges) {
    this._refresh([...changes.books.currentValue]);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onDeleteBook(bookId: string) {
    console.log(bookId);
  }

  onEditBook(bookId: string) {
    console.log(bookId);
  }

  onAddBook() {
    console.log('Adding book');
  }
}
