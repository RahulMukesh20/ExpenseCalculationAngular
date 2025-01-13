import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsByMembersComponent } from './payments-by-members.component';

describe('PaymentsByMembersComponent', () => {
  let component: PaymentsByMembersComponent;
  let fixture: ComponentFixture<PaymentsByMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsByMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsByMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
