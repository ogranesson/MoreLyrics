import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function youtubeLinkValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null; 
    }
    const youtubeRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(value) ? null : { invalidYoutubeLink: true };
  };
}