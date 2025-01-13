import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersService } from '../../Services/members.service';
import { ToastrService } from 'ngx-toastr';
import { FilterPipe } from "../Pipes/filter.pipe";
import { FormsModule } from '@angular/forms';
import { Group } from '../Models/Group';
import { Router } from '@angular/router';



@Component({
  selector: 'app-group',
  imports: [CommonModule, FilterPipe, FormsModule],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit {

  title = 'angular-text-search-highlight';
  searchText = '';

  group!: Group[];
  gname!: string[];
  groupName: any;

  constructor(private memberService: MembersService, private toastr: ToastrService, private router: Router) { }

  AddGroup() {
    let groupName: string = (<HTMLInputElement>document.getElementById("GroupName")).value;
    this.memberService.AddGroup(groupName).subscribe(res => {
      console.log(res)
      if (res.includes("Success")) {
        this.toastr.success("Added Successfully", "", { positionClass: 'toast-bottom-right' });
        document.location.reload();
      }
      else {
        this.toastr.error("failed", "", { positionClass: 'toast-bottom-right' });
      }
    })
    this.GetAllGroup();
    //document.location.reload();
  }

  GetAllGroup() {
    this.memberService.GetGroup().subscribe(res => {
      console.log(res)
      this.group = res;
      console.log(this.group)
    })
  }

  OpenExpense(groupId: string, groupName: string) {

    sessionStorage.setItem('GroupId', groupId);
    sessionStorage.setItem('GroupName', groupName);

    console.log(sessionStorage.getItem('GroupId'));
    console.log(sessionStorage.getItem('GroupName'));

    this.router.navigate(['/History']);
  }

  DeleteGroup(groupId: string) {
    this.memberService.DeleteGroup(groupId).subscribe(res => {
      if (res.includes("Success")) {
        this.toastr.success("Added Successfully", "", { positionClass: 'toast-bottom-right' });
        document.location.reload()
      }
      else {
        this.toastr.error("failed", "", { positionClass: 'toast-bottom-right' });
      }
    })
    this.GetAllGroup();
    document.location.reload();
  }

  ngOnInit(): void {

    sessionStorage.clear();

    this.GetAllGroup();

    console.log(sessionStorage.getItem('GroupId'));
  }
}
