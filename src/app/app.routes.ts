import { Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { ExpenseHomeComponent } from './expense-home/expense-home.component';
import { GroupComponent } from './group/group.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { PaymentsByMembersComponent } from './payments-by-members/payments-by-members.component';

export const routes: Routes = [
    {path: 'History', component: ExpenseHomeComponent},
    {path: 'AddPayment', component: AddPaymentComponent},
    {path: '', redirectTo: '/Vacation', pathMatch: 'full'},
    {path: 'Friends', component: MemberComponent},
    {path: 'Vacation', component:GroupComponent},
    {path: 'Payments', component: PaymentsByMembersComponent}
];
