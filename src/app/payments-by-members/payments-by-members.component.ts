import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MembersService } from '../../Services/members.service';
import { History } from '../Models/History';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-payments-by-members',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './payments-by-members.component.html',
  styleUrl: './payments-by-members.component.css'
})
export class PaymentsByMembersComponent implements OnInit {

  memberId: any;
  groupId: any;
  memberPayments!: History[];
  trip: any;

  constructor(private memberService: MembersService) { }

  responsiveToggle() {
    const menu: any = document.querySelector('.menu')
    const menuList: any = document.querySelector('nav ul')
    menuList.classList.toggle('showmenu')
  }

  GetMemberPayment() {
    this.memberId = sessionStorage.getItem('memberId');
    this.groupId = sessionStorage.getItem('GroupId');

    this, this.memberService.GetPaymentDetailsByMember(this.groupId, this.memberId).subscribe(res => {
      this.memberPayments = res;
      console.log(this.memberPayments);
    })

  }
  ngOnInit(): void {

    this.trip = sessionStorage.getItem('GroupName');
    this.GetMemberPayment();

  }
}
