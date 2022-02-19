import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { HomepageComponent } from '../homepage/homepage.component';
import { ShareModule } from 'src/app/share/share.module';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';


@NgModule({
  declarations: [
    HomepageComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    ShareModule
  ]
})
export class RoutesModule { }
