import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShowArtistComponent } from './artist/show-artist/show-artist.component';
import { AddEditArtistComponent } from './artist/add-edit-artist/add-edit-artist.component';
import { ShowGenreComponent } from './genre/show-genre/show-genre.component';
import { AddEditGenreComponent } from './genre/add-edit-genre/add-edit-genre.component';
import { AddEditAlbumComponent } from './album/add-edit-album/add-edit-album.component';
import { ShowAlbumComponent } from './album/show-album/show-album.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterLink, RouterOutlet} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    ShowArtistComponent,
    AddEditArtistComponent,
    ShowGenreComponent,
    AddEditGenreComponent,
    AddEditAlbumComponent,
    ShowAlbumComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
