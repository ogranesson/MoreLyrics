import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongbooksComponent } from './songbooks.component';

describe('SongbooksComponent', () => {
  let component: SongbooksComponent;
  let fixture: ComponentFixture<SongbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongbooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
