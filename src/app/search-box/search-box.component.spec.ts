import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBoxComponent ],
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets searchTerm to input value', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('');

    input.value = 'simple';
    input.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.searchTerm).toBe('simple');
  })

  it('fires search when button clicked', () => {
    spyOn(fixture.componentInstance.searchFired, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));

    expect(fixture.componentInstance.searchFired.emit).toHaveBeenCalledWith({ searchTerm: '' });
  })
});
