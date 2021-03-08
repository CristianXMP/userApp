import { Component, OnInit } from '@angular/core';
import { RoleService } from './../core/services/role.service';
import { Role } from './../core/models/role.model';
import { PermissionService } from './../core/services/permission.service';
import { Permission } from './../core/models/permission.model';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-permission',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  model: Role = new Role();
  public roles: Role[];
  permissions: Permission[];
  selectedPermissions: Permission[] = [];
  Perm: Permission;
  public show: boolean = false;
  success: boolean = false;
  message: string;
  showPerms: boolean = false;
  constructor(
    private _service: RoleService,
    private _servicePermission: PermissionService
  ) {}

  ngOnInit(): void {
    this.getAllPermissions();
    this.getAllRoles();
  }

  getAllRoles() {
    try {
      this._service
        .getAll()
        .pipe(first())
        .subscribe(
          (data) => {
            this.roles = data;
            console.log(this.roles);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.error(error);
    }
  }

  getAllPermissions() {
    try {
      this._servicePermission
        .getAll()
        .pipe(first())
        .subscribe(
          (data) => {
            if (this.model.id) {
              this.model.permissions?.forEach((perm) => {
                data = data.filter((x) => x.id != perm.id);
              });
            }
            this.permissions = data;
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.error(error);
    }
  }

  addPerm(e: any, perm: Permission) {
    console.log(e.target.checked);
    if (e.target.checked) {
      this.selectedPermissions.push(perm);
    } else {
      const i = this.selectedPermissions?.findIndex((x) => perm.id == x.id);
      this.selectedPermissions.splice(i, 1);
    }
    this.model.permissions = this.selectedPermissions;
  }

  showPermissions(role: Role) {
    this.model = role;
    this.show = false;
    if (!this.showPerms) {
      this.showPerms = true;
    }
  }

  new() {
    this.model = new Role();
    this.success = false;
    this.showPerms = false;
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
            this.roles.push(this.model);
            this.message = 'Rol creado con exito!';
            this.success = true;
            this.model = new Role();
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
              this.roles = this.roles.map((x) => {
                if (x.id == this.model.id) x = this.model;
                return x;
              });
              this.message = 'rol actualizado con exito!';
              this.success = true;
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  modify(role: Role) {
    this.getAllPermissions();
    this.model = role;
    this.show = true;
    this.showPerms = false;
  }
  delete(id: number) {
    this._service
      .delete(id)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);

          if (data['success']) {
            this.roles = this.roles.filter((x) => x.id != id);
            alert('Rol eliminado');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  deleteOnePermissio(roleId: number, permissionId: number) {
    this._service
      .deleteOnePermissio(roleId, permissionId)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          if (data['success']) {
            this.model.permissions = this.model.permissions.filter(
              (x) => x.id != permissionId
            );
            alert('Permiso eliminado del rol');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
