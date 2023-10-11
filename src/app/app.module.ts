import { ChangeDetectorRef, Injector, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgEssentialModule } from './shared/module/ng-essential.module';
import { NgMaterialModule } from './shared/module/ng-material.module';
import { NgComponentModule } from './shared/module/ng-component.module';
import { NgDialogModule } from './shared/module/ng-dialog.module ';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/guards/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { SideDrawerComponent } from './side-drawer/side-drawer.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OrganizationCreationComponent } from './organization/organization-creation/organization-creation.component';
import { OrganizationJoinComponent } from './organization/organization-join/organization-join.component';
import { OrganizationProfileComponent } from './organization/organization-profile/organization-profile.component';
import { OrganizationHomeComponent } from './organization/organization-home/organization-home.component';
import { OrganizationSmtpComponent } from './organization/organization-smtp/organization-smtp.component';
import { OrganizationRoleComponent } from './organization/organization-role/organization-role.component';
import { OrganizationUserComponent } from './organization/organization-user/organization-user.component';
import { GeneralSettingComponent } from './setting/general-setting/general-setting.component';

export const defaultTextColor = 'black';

const DASH_BOARD = [
  AppComponent,
  HeaderComponent,
  SideDrawerComponent,
  HomeComponent,
  RegisterComponent,
  LoginComponent
]

const ORGANIZATION = [
  OrganizationCreationComponent,
  OrganizationJoinComponent,
  OrganizationProfileComponent,
  OrganizationHomeComponent,
  OrganizationSmtpComponent,
  OrganizationRoleComponent,
  OrganizationUserComponent
]

const SETTING = [
  GeneralSettingComponent
]

@NgModule({
  declarations: [
    ... DASH_BOARD,
    ... ORGANIZATION,
    ... SETTING
  ],
  imports: [
    NgEssentialModule,
    NgMaterialModule,
    NgComponentModule,
    NgDialogModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
