import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  readonly GenreApiUrl="https://localhost:7259/api/genre/";
  constructor(private http:HttpClient) { }
  getGenreList():Observable<any[]>{
    return this.http.get<any>(this.GenreApiUrl);
  }
  addGenre(data:any){
    return this.http.post(this.GenreApiUrl,data);
  }
  updateGenre(id:number|string,data:any){
    return this.http.put(this.GenreApiUrl+id,data);
  }
  deleteGenre(id:number|string){
    return this.http.delete(this.GenreApiUrl+id);
  }
}
