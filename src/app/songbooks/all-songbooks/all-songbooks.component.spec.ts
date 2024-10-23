import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSongbooksComponent } from './all-songbooks.component';

describe('AllSongbooksComponent', () => {
  let component: AllSongbooksComponent;
  let fixture: ComponentFixture<AllSongbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSongbooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllSongbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
