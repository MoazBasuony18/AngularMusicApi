import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from "@angular/router";
import {ShowArtistComponent} from "./artist/show-artist/show-artist.component";
import {ShowAlbumComponent} from "./album/show-album/show-album.component";
import {ShowGenreComponent} from "./genre/show-genre/show-genre.component";


const routes:Routes=[
  {
   path:'',
   redirectTo:'/albums' ,
    pathMatch:'full'
  },
  {
    path:'albums',
    component:ShowAlbumComponent
  },
  {
    path:'artists',
    component:ShowArtistComponent
  },
  {
    path:'genres',
    component:ShowGenreComponent
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
