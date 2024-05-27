import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSongbookComponent } from './edit-songbook.component';

describe('EditSongbookComponent', () => {
  let component: EditSongbookComponent;
  let fixture: ComponentFixture<EditSongbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSongbookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSongbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
