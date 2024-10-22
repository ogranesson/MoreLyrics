import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appTabspace]',
  standalone: true
})
export class TabspaceDirective {
  @HostListener('keydown', ['$event']) // required for listening to events
  handleKeyDown(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement;

    if (event.key === 'Tab') {
      event.preventDefault();
      const start = inputElement.selectionStart;
      const end = inputElement.selectionEnd; // when multiple characters not selected, these values are the same

      if (start === null || end === null) {
        console.error("Cursor position not available");
        return;
      }

      // substring(0, start) gets text before the cursor position, adds tabspace, and substring(end) gets the rest of the text
      inputElement.value = inputElement.value.substring(0, start) + '\t' + inputElement.value.substring(end);

      // since start + 1 is the tabspace, this puts the cursor after the tabspace
      inputElement.selectionStart = inputElement.selectionEnd = start + 1;
    }
  }
}