import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelListComponent } from './personel-list.component';

describe('PersonelListComponent', () => {
  let component: PersonelListComponent;
  let fixture: ComponentFixture<PersonelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonelListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
