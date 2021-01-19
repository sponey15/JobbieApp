import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Offer } from '../_models/offer';
import { User } from '../_models/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = environment.apiUrl;
  user: User;

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

  getOffersFromCategory(model: any) {
    return this.http.get(this.baseUrl + 'company/category-offers', model);
  }

  getOffersFromCompany(companyName: string) {
    return this.http.get(this.baseUrl + 'company/company-offers/' + companyName);
  }

  getCompanyOffersFromCategory(companyName: string, model: any) {
    return this.http.post(this.baseUrl + 'company/company-offers/' + companyName + '/categories', model);
  }
}
