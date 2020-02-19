import { AbstractControl } from '@angular/forms';

export function ValidateUrl(control: AbstractControl) {
  const extensions = ['jpg', 'jpeg', 'png']
  const chunks = control.value.split('.')
  const ext = chunks[chunks.length - 1]
  if (!(control.value.startsWith('https') && extensions.includes(ext))) {
    return { validUrl: true }
  }
  return null;
}
