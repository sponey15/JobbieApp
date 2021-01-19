import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Work } from '../_models/work';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  baseUrl = environment.apiUrl;

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

  getCompanyWorksFromStatus(model: any) {
    return this.http.post(this.baseUrl + 'work/company-works/status', model);
  }

  getUserWorksFromStatus(model: any) {
    return this.http.post<Work>(this.baseUrl + 'work/user-works/status', model);
  }
}
