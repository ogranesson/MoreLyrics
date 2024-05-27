import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLyricsComponent } from './edit-lyrics.component';

describe('EditLyricsComponent', () => {
  let component: EditLyricsComponent;
  let fixture: ComponentFixture<EditLyricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLyricsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLyricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
