import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Friends } from '../app/Models/Friends';
import { Category } from '../app/Models/Category';
import { Payment } from '../app/Models/Payment';
import { History } from '../app/Models/History';
import { Group } from '../app/Models/Group';
import { CategoryWise } from '../app/Models/CategoryWise';
import { MemberPayment } from '../app/Models/MemberPayment';
import { Paymenttype } from '../app/Models/PaymentType';
import * as config from '../UrlPaths.json'

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient) { }

  private handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg = '';
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status + " " + err.message;
      console.log(errMsg);
    }
    return throwError(() => errMsg);
  }
  
  path : any = config;

  getFriends(groupId: number): Observable<Friends[]> {
    let urlPath= this.path['getAllFriends'];
    const params = new HttpParams().append('id', groupId);
    return this.http.get<Friends[]>(urlPath, { params }).pipe(
      map((res) => {
        const friends = [];
        for (const key in res) {
          friends.push({ ...res[key] })
        }
        return friends;
      }));
  }

  GetCategory(): Observable<Category[]> {
    let urlPath= this.path['getAllCategories'];
    return this.http.get<Category[]>(urlPath).pipe(
      map((res) => {
        const category = [];
        for (const key in res) {
          category.push({ ...res[key] })
        }
        return category;
      }));
  }

  GetPayments(groupId: number): Observable<History[]> {
    let urlPath= this.path['getPayment'];
    const params = new HttpParams().append('groupId', groupId);
    return this.http.get<History[]>(urlPath, { params }).pipe(
      map((res) => {
        const paymentDetails = [];
        for (const key in res) {
          paymentDetails.push({ ...res[key] })
        }
        return paymentDetails;
      }));
  }

  GetGroup(): Observable<Group[]> {
    let urlPath= this.path['getAllGroups'];
    return this.http.get<Group[]>(urlPath).pipe(
      map((res) => {
        const groupDetails = [];
        for (const key in res) {
          groupDetails.push({ ...res[key] })
        }
        return groupDetails;
      }));
  }

  GetAmountSpentCategory(groupId: number): Observable<CategoryWise[]> {
    let urlPath= this.path['getAmountCategory'];
    const params = new HttpParams().append('id', groupId);
    return this.http.get<CategoryWise[]>(urlPath, { params }).pipe(
      map((res) => {
        const amountSpentCategory = [];
        for (const key in res) {
          amountSpentCategory.push({ ...res[key] })
        }

        return amountSpentCategory;

      })
    )
  }

  GetAmountSpentMember(groupId: number): Observable<MemberPayment[]> {
    let urlPath= this.path['getAmountSpentByMembers'];
    const params = new HttpParams().append('id', groupId);
    return this.http.get<MemberPayment[]>(urlPath, { params }).pipe(
      map((res) => {
        const amountSpentMember = [];
        for (const key in res) {
          amountSpentMember.push({ ...res[key] })
        }
        return amountSpentMember;
      })
    )
  }

  GetPaymentDetailsByMember(groupId: number, memberId: number): Observable<History[]> {
    let urlPath= this.path['getMemberPaymentDetails'];
    const params = new HttpParams().append("groupId", groupId).append("memberId", memberId);
    return this.http.get<History[]>(urlPath, { params }).pipe(
      map((res) => {
        const memberPayments = [];
        for (const key in res) {
          memberPayments.push({ ...res[key] })
        }
        return memberPayments;
      })
    )
  }

  GetAmountCollectedByType(groupId: number): Observable<Paymenttype[]> {
    let urlPath= this.path['getAmountCollectedByType'];
    const params = new HttpParams().append('groupId', groupId);
    return this.http.get<Paymenttype[]>(urlPath, { params }).pipe(
      map((res) => {
        const amountCollected = [];
        for (const key in res) {
          amountCollected.push({ ...res[key] })
        }
        return amountCollected;
      })
    )
  }

  GetTripAdvisor(groupId: number): Observable<Friends> {
    let urlPath= this.path['getTripAdvisor'];
    const params = new HttpParams().append('groupId', groupId);
    return this.http.get<Friends>(urlPath, { params })

  }

  GetShareAmount(groupId : number) : Observable<number> {
    let urlPath= this.path['getGroupShare'];
    const params = new HttpParams().append('id', groupId);
    return this.http.get<number>(urlPath, { params })
  }

  TripAdvisorPayments(groupId: number): Observable<Paymenttype[]> {
    let urlPath= this.path['advisorPayments'];
    const params = new HttpParams().append('groupId', groupId);
    return this.http.get<Paymenttype[]>(urlPath, { params }).pipe(
      map((res) => {
        const amountTP = [];
        for (const key in res) {
          amountTP.push({ ...res[key] })
        }
        console.log(amountTP);
        return amountTP;
      })
    )
  }

  AddFriend(groupId: any, friendName: string): Observable<any> {
    let urlPath= this.path['addFriend'];
    let id = Number.parseInt(groupId);
    let params = new HttpParams().append("groupId", id).append("friendName", friendName);
    console.log(params.toString());
    return this.http.post(urlPath, params, {
      responseType: 'text'
    }).pipe(
      catchError(this.handleError));
  }

  AddCategory(categoryName: string): Observable<any> {
    let urlPath= this.path['addCategory'];
    let params = new HttpParams().set("categoryName", categoryName);
    return this.http.post(urlPath, params, {
      responseType: 'text'
    }).pipe(
      tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  AddPayment(payment: Payment): Observable<string> {
    let urlPath= this.path['addPayment'];
    return this.http.post(urlPath, payment, {
      responseType: 'text'
    }).pipe(
      catchError(this.handleError));
  }

  AddGroup(groupName: string): Observable<string> {
    let urlPath= this.path['addGroup'];
    let params = new HttpParams().set("groupName", groupName);
    return this.http.post(urlPath, params, {
      responseType: 'text'
    }).pipe(
      catchError(this.handleError));
  }

  DeleteGroup(groupId: string): Observable<string> {
    let urlPath= this.path['deleteGroup'];
    let id = Number.parseInt(groupId);
    let params = new HttpParams().set("id", id);
    return this.http.delete(urlPath, { params, responseType: 'text' }).pipe(
      catchError(this.handleError));
  }

  DeleteMember(memberId: number): Observable<string> {
    let urlPath= this.path['deleteFriend'];
    let params = new HttpParams().set("id", memberId);
    return this.http.delete(urlPath, { params, responseType: 'text' }).pipe(
      catchError(this.handleError)
    )
  }

  DeletePayment(paymentId: number): Observable<string> {
    let urlPath= this.path['deletePayment'];
    let params = new HttpParams().set("id", paymentId);
    return this.http.delete(urlPath, { params, responseType: 'text' }).pipe(
      catchError(this.handleError))
  }

  UpdateGroupShare(groupId: any, sharePrice: any): Observable<any> {
    let urlPath= this.path['updateGroupShare'];
    console.log(groupId, sharePrice);
    let id = Number.parseInt(groupId);
    let amount = Number.parseInt(sharePrice);
    let params = new HttpParams().append("groupId", id).append("sharePrice", amount);
    return this.http.put(urlPath, params, {
      responseType: 'text'
    }).pipe(
      catchError(this.handleError));
  }

}
