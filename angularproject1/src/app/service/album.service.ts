import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  readonly albumApiUrl="https://localhost:7259/api/album/";

  constructor(private http:HttpClient) { }
  getAlbumList():Observable<any[]>{
    return this.http.get<any>(this.albumApiUrl);
  }
  search(searchString:string):Observable<any[]>{
    return this.http.get<any>(this.albumApiUrl);
  }
  addAlbum(data:any){
    return this.http.post(this.albumApiUrl,data);
  }
  updateAlbum(id:number|string,data:any){
    return this.http.put(this.albumApiUrl+id,data);
  }
  deleteAlbum(id:number|string){
    return this.http.delete(this.albumApiUrl+id);
  }
}
