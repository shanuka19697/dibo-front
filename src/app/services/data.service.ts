import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Studata } from '../models/studata.model';
import { AddDataResponse } from '../models/add-data-response.model';
import { getDataResponse } from '../models/get-stu-response.model';




@Injectable({
  providedIn: 'root'
})
export class DataService {
  //http://localhost:5000/
  //https://dibo-back-production.up.railway.app/
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  addSData(stdata: Studata): Observable<AddDataResponse> {
    return this.http.post<AddDataResponse>(
      this.baseUrl + '/api/student-data/',
      stdata,
      this.httpOptions
    );
  }
  getSData(): Observable<getDataResponse> {
    return this.http.get<getDataResponse>(this.baseUrl + '/api/student-data');
  }

  deleteSData(Id: string): Observable<AddDataResponse> {
    return this.http.delete<AddDataResponse>(`${this.baseUrl}/api/student-data/${Id}`);
  }
  updateSData(id: string, stdata: Studata): Observable<AddDataResponse> {
    return this.http.put<AddDataResponse>(
      `${this.baseUrl}/api/student-data/${id}`,
      stdata,
      this.httpOptions
    );
  }
}
