import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component'
import { RoleComponent } from './role/role.component'
import { PermissionComponent } from './permission/permission.component'

const routes: Routes = [
  {
    path: 'home', component: AppComponent
  },
  {
    path: 'users', component: UserComponent
  },
  {
    path: 'roles', component: RoleComponent
  },
  {
    path: 'permissions', component: PermissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
