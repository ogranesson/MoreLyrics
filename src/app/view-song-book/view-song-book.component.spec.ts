import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSongBookComponent } from './view-song-book.component';

describe('ViewSongBookComponent', () => {
  let component: ViewSongBookComponent;
  let fixture: ComponentFixture<ViewSongBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSongBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSongBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
