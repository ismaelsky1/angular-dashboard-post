import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
// import { todos } from './dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  findAll(params: string): Observable<Post[]> {
    params = params !== '' ? `?userId=${params}` : '';

    return this.http
      .get<any>(`https://jsonplaceholder.typicode.com/posts${params}`)
      .pipe(map((response) => response));
  }

  update(post: Post): Observable<Post> {
    return this.http
      .put<Post>(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post)
      .pipe(map((response) => response));
  }
}
