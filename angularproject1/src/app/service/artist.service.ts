import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ArtistVM} from "../model/ArtistVM";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
readonly artistApiUrl="https://localhost:7259/api/artist/";
  constructor(private http:HttpClient) { }
  getArtistList():Observable<ArtistVM[]>{
    return this.http.get<any>(this.artistApiUrl);
  }
  search(searchString:string):Observable<any[]>{
    return this.http.get<any>(this.artistApiUrl+searchString);
  }
  addArtist(data:any){
    return this.http.post(this.artistApiUrl,data);
  }
  updateArtist(id:number|string,data:any){
    return this.http.put(this.artistApiUrl+id,data);
  }
  deleteArtist(id:number|string){
    return this.http.delete(this.artistApiUrl+id);
  }
}
