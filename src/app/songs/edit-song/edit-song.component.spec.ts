import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditSongComponent } from './edit-song.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirestoreService } from '../../firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LyricsFormatPipe } from '../../pipes/lyrics-format.pipe';
import { TabspaceDirective } from '../../directives/tabspace.directive';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditSongComponent', () => {
  let component: EditSongComponent;
  let fixture: ComponentFixture<EditSongComponent>;
  let firestoreService: FirestoreService;
  let router: Router;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        EditSongComponent,
        TabspaceDirective,
        LyricsFormatPipe,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: FirestoreService, useClass: MockFirestoreService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
        { provide: MatSnackBar, useClass: MockMatSnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditSongComponent);
    component = fixture.componentInstance;

    firestoreService = TestBed.inject(FirestoreService);
    router = TestBed.inject(Router);
    snackBar = TestBed.inject(MatSnackBar);
  });

  // Positive Test Cases

  it('should initialize and load song data correctly', () => {
    // Arrange: Spy on the getSong method of the FirestoreService
    const getSongSpy = spyOn(firestoreService, 'getSong').and.callThrough();

    // Act: Initialize the component
    component.ngOnInit();
    fixture.detectChanges();

    // Verify that getSong was called with the correct song ID
    expect(getSongSpy).toHaveBeenCalledWith('testSongId');

    // Check that the song data is loaded into the component
    expect(component.song).toBeDefined();
    expect(component.song.id).toEqual('testSongId');

    // Check that the form controls have the expected values
    expect(component.songForm.value.title).toEqual('Mock Title');
    expect(component.songForm.value.author).toEqual('Mock Author');
    expect(component.songForm.value.tuning).toEqual('Mock Tuning');
    expect(component.songForm.value.capo).toEqual('Mock Capo');
    expect(component.songForm.value.link).toEqual('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    expect(component.songForm.value.lyrics).toEqual('Mock Lyrics');

    const lyricsTextarea = fixture.nativeElement.querySelector('textarea[name="lyrics"]');
    expect(lyricsTextarea.value).toContain('Mock Lyrics');
  });

  it('should submit valid form, update song, and navigate to home', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    const snackBarSpy = spyOn(snackBar, 'openFromComponent').and.callThrough();
    const updateSongSpy = spyOn(firestoreService, 'updateSong').and.returnValue(of(void 0));

    component.ngOnInit();
    fixture.detectChanges();

    component.songForm.setValue({
      title: 'Updated Title',
      author: 'Updated Author',
      tuning: 'Updated Tuning',
      capo: 'Updated Capo',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      lyrics: 'Updated Lyrics',
    });

    component.onSubmit();
    tick(); // Simulate time passing

    expect(component.saved).toBeTrue();
    expect(updateSongSpy).toHaveBeenCalledWith(jasmine.any(Object), 'testSongId');
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
    expect(snackBarSpy).toHaveBeenCalled();
  }));

  it('should return true from canDeactivate when saved is true', () => {
    // Arrange: Set the saved flag to true
    component.saved = true;

    const result = component.canDeactivate();

    expect(result).toBeTrue();
  });

  // Negative Test Cases

  it('should have invalid form when required fields are empty', () => {
    component.ngOnInit();
    fixture.detectChanges();

    // Empty required fields
    component.songForm.controls['title'].setValue('');
    component.songForm.controls['author'].setValue('');
    component.songForm.controls['tuning'].setValue('');
    component.songForm.controls['capo'].setValue('');
    component.songForm.controls['lyrics'].setValue('');

    fixture.detectChanges();

    expect(component.songForm.invalid).toBeTrue();
    expect(component.songForm.controls['title'].hasError('required')).toBeTrue();
    expect(component.songForm.controls['author'].hasError('required')).toBeTrue();
    expect(component.songForm.controls['tuning'].hasError('required')).toBeTrue();
    expect(component.songForm.controls['capo'].hasError('required')).toBeTrue();
    expect(component.songForm.controls['lyrics'].hasError('required')).toBeTrue();
  });

  it('should prompt confirmation when canDeactivate is called and saved is false', () => {
    const confirmSpy = spyOn(window, 'confirm').and.returnValue(false);
    component.saved = false;

    const result = component.canDeactivate();

    expect(confirmSpy).toHaveBeenCalledWith('Do you want to discard the changes made?');
    expect(result).toBeFalse();
  });
});

// Mock classes

class MockFirestoreService {
  getSong(songId: string) {
    // Return an observable with mock song data
    return of({
      id: songId,
      title: 'Mock Title',
      author: 'Mock Author',
      tuning: 'Mock Tuning',
      capo: 'Mock Capo',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      lyrics: 'Mock Lyrics',
    });
  }

  updateSong(song: any, songId: string) {
    // Return an observable indicating the update was successful
    return of(void 0);
  }
}

class MockRouter {
  navigate(commands: any[]) {
    // Simulate successful navigation
    return Promise.resolve(true);
  }
}

class MockActivatedRoute {
  params = of({ songId: 'testSongId' });
}

class MockMatSnackBar {
  openFromComponent(component: any, config: any) {
  }
}