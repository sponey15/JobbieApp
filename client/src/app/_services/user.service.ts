import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Offer } from '../_models/offer';
import { OfferParams } from '../_models/offerParams';
import { PaginatedResult } from '../_models/pagination';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  offerParams: OfferParams;

  constructor(private http: HttpClient) { 
    this.offerParams = new OfferParams;
  }

  getOfferParams() {
    return this.offerParams;
  }

  setOfferParams(params: OfferParams) {
    this.offerParams = params;
  }

  resetOfferParams() {
    this.offerParams = new OfferParams;
    return this.offerParams;
  }

  getOffersFromCategory(offerCategory: any, offerParams: OfferParams) {
    let params = getPaginationHeaders(offerParams.pageNumber, offerParams.pageSize);

    params = params.append('minPrice', offerParams.minPrice.toString());
    params = params.append('maxPrice', offerParams.maxPrice.toString());
    params = params.append('orderBy', offerParams.orderBy.toString());
    
    
    return getPaginatedResult<Offer[]>(this.baseUrl + 'user/category-offers/' + offerCategory, params, this.http)
      .pipe(map(response => {
        return response;
      }));
  }
}
