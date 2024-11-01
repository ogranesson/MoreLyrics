import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLyricsComponent } from './view-lyrics.component';

describe('ViewLyricsComponent', () => {
  let component: ViewLyricsComponent;
  let fixture: ComponentFixture<ViewLyricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLyricsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLyricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
