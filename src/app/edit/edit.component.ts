import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Book } from '../shared/book.model';
import { ValidateUrl } from '../validators/validators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  id: string;
  currentBook: Book;
  submitDisabled: boolean = true;
  private sub: any;

  bookForm = this.fb.group({
    id: [null, Validators.required],
    originalTitle: [null, Validators.required],
    authors: [null, Validators.required],
    ISBN: [null, Validators.compose([
      Validators.required, Validators.minLength(9), Validators.maxLength(9)
    ])],
    ISBN13: [null, Validators.compose([
      Validators.required, Validators.minLength(13), Validators.maxLength(13)
    ])],
    originalPublicationYear: [1948, Validators.required],
    averageRating: [5, Validators.required],
    languageCode: ['eng', Validators.required],
    smallImageUrl: ['https://www.hutchinsonutilities.com/wp-content/themes/Hutchinson/images/404.jpg', Validators.compose([
      Validators.required, ValidateUrl
    ])],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id !== 'new') {
        this.bookService.fetchBook(this.id).subscribe(
          data => {
            this.currentBook = data;
            this.bookForm.patchValue(this.currentBook)
          }
        );
        this.submitDisabled = !this.bookForm.valid
      }
    })
    this.onChanges()
  }

  onChanges(): void {
    this.bookForm.valueChanges.subscribe(_ => {
      this.submitDisabled = !this.bookForm.valid
    })
  }

  onSubmit() {
    const formValues = this.bookForm.value;
    if (this.id === 'new') {
      this.bookService.createBook(formValues)
        .subscribe(data => {
          console.log(data);
          console.log(`Successfully created ${formValues}`)
        })
    } else {
      this.bookService.updateBook(this.id, this.bookForm.value)
        .subscribe(data => {
          console.log(data);
          console.log(`Successfully updated book with id: ${this.id}`)
        })
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
