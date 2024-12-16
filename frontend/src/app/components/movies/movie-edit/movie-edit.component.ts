import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MovieService} from "../../../services/movie.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-movie-edit',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css'
})
export class MovieEditComponent implements OnInit{
  @Input("id") id!:string;
  private readonly movieService: MovieService = inject(MovieService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  protected formMovie: FormGroup = this.formBuilder.group({
    _id: [],
    title: ['', [Validators.required,
      Validators.minLength(2)]],
    year:[new Date().getFullYear(),
      [ Validators.required,
        Validators.min(1880),
        Validators.max(new Date().getFullYear())]
    ],
    director: [''],
    plot: [''],
    genres:[],
    poster: [''],
    imdb: this.formBuilder.group({
      rating: [0],
      votes: [0]
    })
  });

  myNewGenre: FormGroup = this.formBuilder.group({
    newGenre: ['']
  });
  editar = false;
  genresList: string[] = [];

  /* FIN DE DECLARACIÓN DE VARIABLES */
  ngOnInit(): void {
    this.loadMovie();
  }

  get title(): any{
    return this.formMovie.get('title');
  }
  get year(): any{
    return this.formMovie.get('year');
  }  get director(): any{
    return this.formMovie.get('director');
  }  get plot(): any{
    return this.formMovie.get('plot');
  }  get poster(): any{
    return this.formMovie.get('poster');
  }  get genres(): any{
    return this.formMovie.get('genres');
  }  get rating(): any{
    return this.formMovie.get('imdb.rating');
  }  get votes(): any{
    return this.formMovie.get('imdb.votes');
  }
  get newGenre(): any{
    return this.myNewGenre.get('newGenre');
  }

  private loadMovie() {
    if(this.id){
      // EDITAMOS PELÍCULA. RELLENAMOS FORMULARIO
      this.editar = true;
      this.movieService.getMovie(this.id).subscribe(
        {
          next: value => {
            this.formMovie.setValue(value.status);
          },
          complete: () => {
            console.log('Movie loaded successfully')
          },
          error: err => {
            console.error(err);
          }
        }
      )
    }else {
      // AÑADIMOS PELÍCULA NUEVA. VACIAMOS FORMULARIO
      this.formMovie.reset();
      this.editar = false;
    }
    this.movieService.getGenres().subscribe(
      {
        next: value => {
          console.log(value);
          this.genresList = value.status;
        },
        error: err => {
          console.error(err);
        },
        complete: () => {
          console.log('Genres loaded');
        }
      }
    )
  }


  addMovie() {
    if (this.editar){
      // SI editamos ACTUALIZAMOS
      this.movieService.updateMovie(this.formMovie.getRawValue()).subscribe(
        {
          next: value =>  {
            console.log(value);
            this.router.navigateByUrl('/movies/list');
          },
          error: err => {
            console.error(err);
          }
        }
      )

    }else {
      // Si no editamos AÑADIMOS
      this.movieService.addMovie(this.formMovie.getRawValue()).subscribe(
        {
          next: value =>  {
            console.log(value);
            this.router.navigateByUrl('/movies/list');
          },
          error: err => {
            console.error(err);
          }
        }
      )
    }

  }

  addNewGenre() {
    // Maquetar la función para usarla con
    // TODOS los géneros de la BD
    let newGenres;
    if(!this.editar){
      this.genresList.push(this.newGenre.value);
    }else{
      newGenres = this.genres.value;
      newGenres.push(this.newGenre.value);
      this.genresList.push(this.newGenre.value);
      this.formMovie.setControl(
        'genres', new FormControl(newGenres)
      )
    }
    this.myNewGenre.reset();
  }
}
