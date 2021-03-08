import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Role } from './../models/role.model';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private endPoint: string;
  constructor(private http: HttpClient) {
    this.endPoint = `${environment.apiUrl}role`;
  }
  //cargar todos los permisos
  getAll() {
    return this.http.get<Role[]>(`${this.endPoint}`);
  }

  getById(id: number) {
    return this.http.get<Role>(`${this.endPoint}/${id}`);
  }

  create(Role: Role) {
    return this.http.post<Role>(`${this.endPoint}`, Role);
  }

  update(Role: Role) {
    return this.http.patch(`${this.endPoint}`, Role).pipe(
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
  deleteOnePermissio(roleId: number, permissionId: number) {
    return this.http.delete(`${this.endPoint}/${roleId}/${permissionId}`).pipe(
      map((x) => {
        return x;
      })
    );
  }
}
