import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { MembersService } from '../../Services/members.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Friends } from '../Models/Friends';
import { Category } from '../Models/Category';
import { History } from '../Models/History';
import { CategoryWise } from '../Models/CategoryWise';
import { Paymenttype } from '../Models/PaymentType';

@Component({
  selector: 'app-expense-home',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './expense-home.component.html',
  styleUrl: './expense-home.component.css'
})
export class ExpenseHomeComponent implements OnInit {

  addAlert: boolean = false;
  errorMessage: any;
  friendsCount: number = 10;
  trip!: any;



  totalAmount: number = 0;

  PaidBy: any;

  friends!: Friends[];
  friendsName!: string[];
  category!: Category[];
  categoryNames!: string[];
  paymentHistory!: History[];
  categoryAmount!: CategoryWise[];
  amountCollected!: Paymenttype[];
  advisorPayments!: Paymenttype[];
  tripAdvisor!: Friends;


  GroupId: any;

  constructor(private memberService: MembersService, private toastr: ToastrService, private router: Router) { }

  myfunction() {
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

  GetPayments() {
    this.memberService.GetPayments(this.GroupId).subscribe(res => {
      this.paymentHistory = res;
    });
  }

  GetCategoryAmount() {
    this.memberService.GetAmountSpentCategory(this.GroupId).subscribe(res => {
      this.categoryAmount = res;
      this.totalAmount = this.categoryAmount.reduce((accumulator, current) => accumulator + current.amountSpent, 0);
    })
  }

  GetPaymentCollected() {
    this.memberService.GetAmountCollectedByType(this.GroupId).subscribe(res => {
      this.amountCollected = res;
    })
  }



  TripAdvisorTransactions() {
    this.memberService.TripAdvisorPayments(this.GroupId).subscribe(res => {
      this.advisorPayments = res;
    });
  }

  DeletePayment(paymentId: number) {
    this.memberService.DeletePayment(paymentId).subscribe(res => {
      if (res.includes("Success")) {
        this.toastr.success("Deleted Successfully", "", { positionClass: 'toast-bottom-right' });
        document.location.reload();
      }
      else {
        this.toastr.error("failed", "", { positionClass: 'toast-bottom-right' });
      }
    })
  }

  TripAdvisor() {
    this.memberService.GetTripAdvisor(this.GroupId).subscribe(res => {
      this.tripAdvisor = res;
      console.log(res)
    })
  }

  GoToPaymentPage() {
    this.TripAdvisor();
    sessionStorage.setItem('memberId', this.tripAdvisor.memberId.toString());
    this.router.navigate(['/Payments']);
  }


  ngOnInit(): void {

    this.trip = sessionStorage.getItem('GroupName');
    this.GroupId = sessionStorage.getItem('GroupId');
    console.log(this.trip);
    console.log(this.GroupId);
    this.GetFriends();
    this.GetCategory();
    this.GetPayments();
    this.GetCategoryAmount();
    this.GetPaymentCollected();

    this.TripAdvisorTransactions();
    this.TripAdvisor();

  }


}
