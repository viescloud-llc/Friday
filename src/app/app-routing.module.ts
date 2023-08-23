import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrganizationCreationComponent } from './organization/organization-creation/organization-creation.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { OrganizationJoinComponent } from './organization/organization-join/organization-join.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [async () => !inject(AuthGuard).isLogin()],
  },
  {
    path: 'organization',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create',
        component: OrganizationCreationComponent
      },
      {
        path: 'join',
        component: OrganizationJoinComponent
      }
    ]
  },
  { // default path
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
