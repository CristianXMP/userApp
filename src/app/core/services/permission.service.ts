import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Permission } from './../models/permission.model';
@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private endPoint: string;
  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}permission`;
  }
  //cargar todos los permisos
  getAll() {
    return this.http.get<Permission[]>(`${this.endPoint}`);
  }

  getById(id: number) {
    return this.http.get<Permission>(`${this.endPoint}/${id}`);
  }

  create(Permission: Permission) {
    return this.http.post<Permission>(`${this.endPoint}`, Permission);
  }

  update(Permission: Permission) {
    return this.http.patch(`${this.endPoint}`, Permission).pipe(
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
