import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Offer } from '../_models/offer';
import { PaginatedResult } from '../_models/pagination';
import { Work } from '../_models/work';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Work[]> = new PaginatedResult<Work[]>();
  
  constructor(private http: HttpClient) { }

  newWork(model: any) {
    return this.http.post<Work>(this.baseUrl + 'work/works', model);
  }

  getWork(workId: any, offerId: any) {
    return this.http.get<Work>(this.baseUrl + 'work/works/' + workId + '/' + offerId);
  }

  newWorkTask(model: any) {
    return this.http.post(this.baseUrl + 'work/work-tasks', model);
  }

  updateWorkTask(workTaskId: any, isComplete: any) {
    return this.http.put(this.baseUrl + 'work/work-tasks/' + workTaskId + '/' + isComplete, {});
  }

  updateWork(workId: any, model: any) {
    return this.http.put(this.baseUrl + 'work/works/' + workId, model);
  }

  getCompanyWorksFromStatus(status: any, page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    
    return this.http.get<Work[]>(this.baseUrl + 'work/company-works/status/' + status, 
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

  getUserWorksFromStatus(status: any, page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<Work[]>(this.baseUrl + 'work/user-works/status/' + status,
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
