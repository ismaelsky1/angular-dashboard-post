import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Task } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  dashboard(): Observable<Task[]> {
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/todos`).pipe(
      map(response => response)
    );
  }

}