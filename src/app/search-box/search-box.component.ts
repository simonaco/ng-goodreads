import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Search } from '../shared/search.model';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  searchTerm: string = '';
  @Output() searchFired = new EventEmitter<Search>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(value: string) {
    this.searchTerm = value;
  }

  onSearch() {
    this.searchFired.emit({
      searchTerm: this.searchTerm
    })
  }
}
