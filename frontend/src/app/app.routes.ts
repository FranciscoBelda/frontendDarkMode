import { Routes } from '@angular/router';
import {MovieListComponent} from "./components/movies/movie-list/movie-list.component";
import {MovieEditComponent} from "./components/movies/movie-edit/movie-edit.component";

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'movies/list',
    pathMatch: "full"
  },
  {
    path: 'movies/list',
    component: MovieListComponent
  },
  {
    path: 'movies/add',
    component: MovieEditComponent
  },
  {
    path: 'movies/edit/:id',
    component: MovieEditComponent
  },
  {
    path: '**',
    redirectTo: 'movies',
    pathMatch: "full"
  }
];
