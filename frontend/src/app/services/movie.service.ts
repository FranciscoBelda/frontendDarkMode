import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponseMovie, ApiResponseMovies, Movie} from "../common/interfaces";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly http: HttpClient=inject(HttpClient);
  private readonly urlBase =
    'http://localhost:3000/api/v1/movies/';
  constructor() { }
  getMovies():Observable<ApiResponseMovies>{
    return this.http.get<ApiResponseMovies>(this.urlBase);
  }
  getMovie(id:string):Observable<ApiResponseMovie>{
    return this.http.get<ApiResponseMovie>(
      this.urlBase+'movie/'+id);
  }
  // Nuevo en la segunda evaluación
  addMovie(movie: Movie): Observable<ApiResponseStatus>{
    return this.http.post<ApiResponseStatus>(
      this.urlBase,movie);
  }
  updateMovie(movie: Movie): Observable<ApiResponseStatus>{
    return this.http.put<ApiResponseStatus>(
      this.urlBase+movie._id,movie);
  }
  deleteMovie(id: string):Observable<ApiResponseStatus>{
    return this.http.delete<ApiResponseStatus>(
      this.urlBase+id);
  }
  getGenres():Observable<ApiResponseGenres>{
    return this.http.get<ApiResponseGenres>(this.urlBase+'genres');
  }
}
export interface ApiResponseStatus{
  status: string;
}

export interface ApiResponseGenres{
  status: string[];
}
