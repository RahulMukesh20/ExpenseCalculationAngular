import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MembersService } from '../../Services/members.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MemberPayment } from '../Models/MemberPayment';
import { History } from '../Models/History';
import { PaymentsByMembersComponent } from "../payments-by-members/payments-by-members.component";
import { Group } from '../Models/Group';

@Component({
  selector: 'app-member',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent implements OnInit {

  trip: any;
  friendName: any;
  GroupId: any;
  memberAmount!: MemberPayment[];
  memberPayments!: History[];
  id!: number;
  shareAmount!: number;
  totalMembers!: number;
  groupAmount!: number;
  group!: Group[];

  constructor(private memberService: MembersService, private toastr: ToastrService, private router: Router) { }

  responsiveToggle() {
    const menu: any = document.querySelector('.menu')
    const menuList: any = document.querySelector('nav ul')
    menuList.classList.toggle('showmenu')
  }

  AddFriend(addFriendForm: NgForm) {
    this.friendName = addFriendForm.form.get('friendName')?.value.toString();

    this.memberService.AddFriend(this.GroupId, this.friendName).subscribe(res => {
      if (res.includes("Success")) {
        this.GetMemberAmount();
        document.location.reload();
        this.toastr.success("Added Successfully", "", { positionClass: 'toast-bottom-right' });
      }
      else {
        this.toastr.error("failed", "", { positionClass: 'toast-bottom-right' });
      }
      console.log(res);
      addFriendForm.reset();


    })
  }

  GetGroupShare() {
    this.memberService.GetShareAmount(this.GroupId).subscribe(res => {
      this.groupAmount = res;
      console.log(this.groupAmount);
    })
  }

  GetMemberAmount() {
    this.memberService.GetAmountSpentMember(this.GroupId).subscribe(res => {
      this.memberAmount = res;
      this.totalMembers = this.memberAmount.length;

      this.GetGroupShare();
    })

  }

  GoToPaymentPage(memberId: string) {
    sessionStorage.setItem('memberId', memberId);
    this.router.navigate(['/Payments']);
  }

  DeleteMember(memberId: number) {
    this.memberService.DeleteMember(memberId).subscribe(res => {
      if (res.includes("Success")) {
        this.toastr.success("Deleted Successfully", "", { positionClass: 'toast-bottom-right' });
      }
      else {
        this.toastr.error("failed", "", { positionClass: 'toast-bottom-right' });
      }
    })
    this.GetMemberAmount();
    document.location.reload();
  }

  UpdateGroupShare() {
    let shareAmount: any = (<HTMLInputElement>document.getElementById("shareAmount")).value;
    this.memberService.UpdateGroupShare(this.GroupId, shareAmount).subscribe(res => {
      if (res.includes("Success")) {
        this.toastr.success("Updated Successfully", "", { positionClass: 'toast-bottom-right' });
        document.location.reload();
      }
      else {
        this.toastr.error("failed", "", { positionClass: 'toast-bottom-right' });
      }
    })
    this.GetMemberAmount();

  }

  ngOnInit(): void {
    sessionStorage.removeItem('memberId');

    this.trip = sessionStorage.getItem('GroupName');
    this.GroupId = sessionStorage.getItem('GroupId');
    this.GetGroupShare();
    this.GetMemberAmount();
  }
}
