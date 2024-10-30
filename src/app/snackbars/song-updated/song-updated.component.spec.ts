import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongUpdatedComponent } from './song-updated.component';

describe('SongUpdatedComponent', () => {
  let component: SongUpdatedComponent;
  let fixture: ComponentFixture<SongUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongUpdatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
