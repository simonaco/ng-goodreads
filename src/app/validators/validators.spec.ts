import { FormControl } from '@angular/forms';
import { ValidateUrl } from './validators';

describe('Validators', () => {

  it('if url is image url returns falsy', () => {
    const control = new FormControl();
    control.setValue("https://testimage.jpg");
    expect(ValidateUrl(control)).toBeFalsy();
  });

  it('if url is not image url returns truthy', () => {
    const control = new FormControl();
    control.setValue("https://testimage");
    expect(ValidateUrl(control)).toEqual({ validUrl: true });
  });
})
