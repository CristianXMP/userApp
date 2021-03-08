import { Component, OnInit } from '@angular/core';
import { PermissionService } from './../core/services/permission.service';
import { Permission } from './../core/models/permission.model';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css'],
})
export class PermissionComponent implements OnInit {
  model: Permission = new Permission();
  public permissions: Permission[];
  public show: boolean = false;
  success: boolean = false;
  message: string;
  constructor(private _service: PermissionService) {}

  ngOnInit(): void {
    this.getAllPermissions();
  }

  getAllPermissions() {
    try {
      this._service
        .getAll()
        .pipe(first())
        .subscribe(
          (data) => {
            this.permissions = data;
            console.log(this.permissions);
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
    this.model = new Permission();
    this.success = false;
    if (!this.show) {
      this.show = true;
    } else {
      this.show = false;
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
            this.permissions.push(this.model);
            this.message = 'Permiso creado con exito!';
            this.success = true;
            this.model = new Permission();
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this._service
        .update(this.model)
        .pipe(first())
        .subscribe(
          (data) => {
            if (data['success']) {
              this.permissions = this.permissions.map((x) => {
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
    }
  }
  modify(perm: Permission) {
    this.model = perm;
    this.show = true;
  }
  delete(id: number) {
    this._service
      .delete(id)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data['success']) {
            this.permissions = this.permissions.filter((x) => x.id != id);
            alert('permiso eliminado');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
