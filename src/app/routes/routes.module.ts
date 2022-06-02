import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ShareModule } from 'src/app/share/share.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { DetailComponent } from './detail/detail.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { CountryComponent } from './country/country.component';
import { GenreComponent } from './genre/genre.component';
import { MovieListComponent } from './movie-list/movie-list.component';


@NgModule({
    declarations: [
        HomepageComponent,
        LoginComponent,
        RegisterComponent,
        VerifyComponent,
        DetailComponent,
        AddMovieComponent,
        CountryComponent,
        GenreComponent,
        MovieListComponent
    ],
    imports: [
        CommonModule,
        RoutesRoutingModule,
        ShareModule
    ]
})
export class RoutesModule { }
