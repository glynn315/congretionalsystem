import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingsHistoryComponent } from './fundings-history.component';

describe('FundingsHistoryComponent', () => {
  let component: FundingsHistoryComponent;
  let fixture: ComponentFixture<FundingsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundingsHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundingsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
