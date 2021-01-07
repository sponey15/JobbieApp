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
    return this.http.post<Work>(this.baseUrl + 'work/newWork', model);
  }

  getWork(workId: any, offerId: any) {
    return this.http.get(this.baseUrl + 'work/getWork/' + workId + '/' + offerId);
  }

  newWorkTask(model: any) {
    return this.http.post(this.baseUrl + 'work/newWorkTask', model);
  }

  updateWorkTask(workTaskId: any, isComplete: any) {
    return this.http.get(this.baseUrl + 'work/updateWorkTask/' + workTaskId + '/' + isComplete);
  }

  updateWork(workId: any, model: any) {
    return this.http.put(this.baseUrl + 'work/updateWork/' + workId, model);
  }

  getCompanyWorksFromStatus(model: any) {
    return this.http.post(this.baseUrl + 'work/getCompanyWorksFromStatus', model);
  }

  getUserWorksFromStatus(model: any) {
    return this.http.post(this.baseUrl + 'work/getUserWorksFromStatus', model);
  }
}
