import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTabspace]',
  standalone: true
})
export class TabspaceDirective {
  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement;

    if (event.key === 'Tab') {
      event.preventDefault();
      const start = inputElement.selectionStart;
      const end = inputElement.selectionEnd;

      if (start === null || end === null) {
        console.error("Cursor position not available");
        return;
      }

      inputElement.value = inputElement.value.substring(0, start) + '\t' + inputElement.value.substring(end);
      inputElement.selectionStart = inputElement.selectionEnd = start + 1;
    }
  }
}
