import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Offer } from '../_models/offer';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = environment.apiUrl;
  user: User;
  paginatedResult: PaginatedResult<Offer[]> = new PaginatedResult<Offer[]>();

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    });
  }

  addNewOffer(model: any) {
    return this.http.post(this.baseUrl + 'company/offers', model);
  }

  updateOffer(offerId: number, model: any) {
    return this.http.put(this.baseUrl + 'company/offers/' + offerId, model);
  }

  deleteOffer(offerId: number) {
    return this.http.delete(this.baseUrl + 'company/offers/' + offerId);
  }

  setOfferMainPhoto(offerId: number, photoId: number) {
    return this.http.put(this.baseUrl + 'company/set-offer-main-photo/' + offerId + '/' + photoId, {});
  }

  deleteOfferPhoto(offerId: number, photoId: number) {
    return this.http.delete(this.baseUrl + 'company/delete-offer-photo/' + offerId + '/' + photoId);
  }

  getOffer(offerId: number) {
    return this.http.get<Offer>(this.baseUrl + 'company/offers/' + offerId);
  }

  getOffersFromCompany(companyName: string, page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<Offer[]>(this.baseUrl + 'company/company-offers/' + companyName,
      {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if(response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );
  }

  getCompanyOffersFromCategory(companyName: string, offerCategory: any, page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<Offer[]>(this.baseUrl + 'company/company-offers/' + companyName + '/' + offerCategory,
      {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if(response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );
  }
}
