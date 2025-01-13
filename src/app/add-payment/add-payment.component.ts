import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../Services/members.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { Payment } from '../Models/Payment';
import { Friends } from '../Models/Friends';
import { Category } from '../Models/Category';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-add-payment',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.css'
})
export class AddPaymentComponent implements OnInit {
  trip!: any;
  GroupId: any;
  PaymentDate!: string;
  CategoryId!: number;
  PaymentType!: string;
  MemberId!: number;
  Notes!: string;
  Amount!: number;
  payment!: Payment;
  friends!: Friends[];
  category!: Category[];

  constructor(private memberService: MembersService, private toastr: ToastrService) { }

  responsiveToggle() {
    const menu: any = document.querySelector('.menu')
    const menuList: any = document.querySelector('nav ul')
    menuList.classList.toggle('showmenu')
  }

  GetFriends() {
    this.memberService.getFriends(this.GroupId).subscribe(res => {
      this.friends = res;
    });
  }

  GetCategory() {
    this.memberService.GetCategory().subscribe(res => {
      this.category = res;
    });
  }

  AddPaymentDetails(addPaymentForm: NgForm) {
    this.PaymentDate = addPaymentForm.form.get('PaymentDate')?.value;
    this.CategoryId = addPaymentForm.form.get('category')?.value;
    this.PaymentType = addPaymentForm.form.get('PaymentType')?.value.toString();
    this.MemberId = addPaymentForm.form.get('friends')?.value;
    this.Notes = addPaymentForm.form.get('Notes')?.value.toString();
    this.Amount = addPaymentForm.form.get('Amount')?.value;

    this.payment = new Payment(this.CategoryId, this.MemberId, this.GroupId, this.PaymentDate, this.PaymentType, this.Amount, this.Notes);
    console.log("categoryId:", this.payment.categoryId, "\nmemberId:", this.payment.paymentDate, "\npaymentDate:", this.payment.paymentDate,
      "\npaymentType:", this.payment.paymentType, "\namount:", this.payment.amount, "\nnotes:", this.payment.notes
    );

    this.memberService.AddPayment(this.payment).subscribe(res => {
      if (res.includes("Success")) {
        this.toastr.success("Added Successfully", "", { positionClass: 'toast-bottom-right' });
        addPaymentForm.reset();
      }
      else {
        this.toastr.error("failed", "", { positionClass: 'toast-bottom-right' });
        addPaymentForm.reset();
      }
    })

  }

  ngOnInit(): void {
    this.trip = sessionStorage.getItem('GroupName');
    this.GroupId = sessionStorage.getItem('GroupId');

    this.GetFriends();
    this.GetCategory();
  }



}
