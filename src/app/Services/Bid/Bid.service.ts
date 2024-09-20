import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environment/environment';
import { Bid } from 'src/app/Models/model';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private apiUrl = `${environment.apiUrl}Bid`;

  constructor(private http: HttpClient) { }

  placeBid(bid: Bid): Observable<Bid> {
    return this.http.post<Bid>(this.apiUrl, bid);
  }
  getHighestBid(productId: number): Observable<Bid> {
    return this.http.get<Bid>(`${this.apiUrl}/highest/${productId}`)
  }

  getBiddingHistory(userId: number): Observable<Bid[]> {
    return this.http.get<Bid[]>(`${this.apiUrl}/bids/${userId}`);
  }

}
