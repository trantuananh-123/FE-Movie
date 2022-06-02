import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { CountryComponent } from './country/country.component';
import { DetailComponent } from './detail/detail.component';
import { GenreComponent } from './genre/genre.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomepageComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'verify',
        component: VerifyComponent
    },
    {
        path: 'detail/:id',
        component: DetailComponent
    },
    {
        path: 'add-movie',
        component: AddMovieComponent
    },
    {
        path: 'country',
        component: CountryComponent
    },
    {
        path: 'genre',
        component: GenreComponent
    },
    {
        path: 'movie-list',
        component: MovieListComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoutesRoutingModule { }
