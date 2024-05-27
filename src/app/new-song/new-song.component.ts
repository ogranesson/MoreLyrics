import { Component } from '@angular/core';
import { TitleBarComponent } from '../title-bar/title-bar.component';
import { DataService } from '../data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { youtubeLinkValidator } from '../validators/youtube-link-validator';
import { TabspaceDirective } from '../directives/tabspace.directive';

@Component({
  selector: 'app-new-song',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, TitleBarComponent, TabspaceDirective],
  templateUrl: './new-song.component.html',
  styleUrl: './new-song.component.css',
  providers: [DataService]
})
export class NewSongComponent {
  songForm!: FormGroup;
  title: string = "Add a new song"

  constructor(private fb: FormBuilder, private dataService: DataService, private http: HttpClient) { }

  ngOnInit() {
    this.songForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      link: ['', [Validators.required, youtubeLinkValidator()]],
      lyrics: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.songForm.valid) {
      this.dataService.addSong(this.songForm.value).subscribe({
        next: response => {
          console.log('Song added successfully!', response);
        },
        error: error => {
          console.error('Error adding song:', error);
        }
      });
    }
  }
}
