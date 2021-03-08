import { Component, OnInit } from '@angular/core';
import { UserService } from './../core/services/user.service';
import { RoleService } from './../core/services/role.service';
import { User } from './../core/models/user.model';
import { first } from 'rxjs/operators';
import { Role } from '../core/models/role.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  model: User = new User();
  users: User[];
  role: Role = new Role();
  roles: Role[];
  public show: boolean = false;
  success: boolean = false;
  message: string;
  constructor(
    private _service: UserService,
    private _rolService: RoleService
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
    this.getAllUsers();
  }
  getAllUsers() {
    try {
      this._service
        .getAll()
        .pipe(first())
        .subscribe(
          (data) => {
            this.users = data;
            console.log(this.users);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.error(error);
    }
  }
  getAllRoles() {
    try {
      this._rolService
        .getAll()
        .pipe(first())
        .subscribe(
          (data) => {
            if (this.model.id) {
              data = data.filter((x) => x.id != this.model.role.id);
            }
            this.roles = data;
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.error(error);
    }
  }
  new() {
    this.model = new User();
    this.success = false;
    if (!this.show) {
      this.show = true;
    } else {
      this.show = false;
    }
  }
  addRol(e: any, role: Role) {
    if (e.target.checked) {
      this.model.role = role;
    }
  }
  save() {
    if (!this.model.id) {
      this._service
        .create(this.model)
        .pipe(first())
        .subscribe(
          (data) => {
            this.model = data;
            this.users.push(this.model);
            this.message = 'Permiso creado con exito!';
            this.success = true;
            this.model = new User();
          },
          (error) => {
            console.log(error);
          }
        );
      this.show = false;
    } else {
      this._service
        .update(this.model)
        .pipe(first())
        .subscribe(
          (data) => {
            if (data['success']) {
              this.users = this.users.map((x) => {
                if (x.id == this.model.id) x = this.model;
                return x;
              });
              this.message = 'Permiso actualizado con exito!';
              this.success = true;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      this.show = false;
    }
  }
  modify(user: User) {
    this.model = user;
    this.show = true;
    this.getAllRoles();
  }
  delete(id: number) {
    this._service
      .delete(id)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data['success']) {
            this.users = this.users.filter((x) => x.id != id);
            alert('permiso eliminado');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
