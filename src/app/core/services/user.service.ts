import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endPoint: string;
  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}user`;
  }
  //cargar todos los permisos
  getAll() {
    return this.http.get<User[]>(`${this.endPoint}`);
  }

  getById(id: number) {
    return this.http.get<User>(`${this.endPoint}/${id}`);
  }

  create(User: User) {
    return this.http.post<User>(`${this.endPoint}`, User);
  }

  update(User: User) {
    return this.http.patch(`${this.endPoint}`, User).pipe(
      map((x) => {
        return x;
      })
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.endPoint}/${id}`).pipe(
      map((x) => {
        return x;
      })
    );
  }
}
