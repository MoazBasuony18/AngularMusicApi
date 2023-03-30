import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AlbumService} from "../../service/album.service";
import {ArtistService} from "../../service/artist.service";
import {GenreService} from "../../service/genre.service";

@Component({
  selector: 'app-add-edit-album',
  templateUrl: './add-edit-album.component.html',
  styleUrls: ['./add-edit-album.component.css']
})
export class AddEditAlbumComponent implements OnInit {
  albumList$!: Observable<any[]>;
  genresList$!: Observable<any[]>;
  artistsList$!: Observable<any[]>

  constructor(private albumService: AlbumService, private artistService: ArtistService, private genreService: GenreService) {
  }

  @Input() album: any;
  id: number = 0;
  albumName: string = "";
  dateReleased: string = "";
  artistId!: number
  genreId!: number

  ngOnInit(): void {
    this.id = this.album.id;
    this.albumName = this.album.albumName;
    this.dateReleased = this.album.dateReleased;
    this.artistId = this.album.artistId;
    this.genreId = this.album.genreId;
    this.albumList$ = this.albumService.getAlbumList();
    this.artistsList$ = this.artistService.getArtistList();
    this.genresList$ = this.genreService.getGenreList();
  }

  addAlbum() {
    const album = {
      albumName: this.albumName,
      dateReleased: this.dateReleased,
      artistId: this.artistId,
      genreId: this.genreId
    };
    this.albumService.addAlbum(album).subscribe(res => {
      const closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }

      const showAddSuccess = document.getElementById('add-success-alert');
      if (showAddSuccess) {
        showAddSuccess.style.display = "block";
      }

      setTimeout(function () {
        if (showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    })

  }

  updateAlbum() {
    const album = {
      id: this.id,
      albumName: this.albumName,
      dateReleased: this.dateReleased,
      artistId: this.album.artistId,
      genreId: this.album.genreId
    };
    const id = this.id;
    this.albumService.updateAlbum(this.album.id, album).subscribe(res => {
      const closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }

      const showUpdateSuccess = document.getElementById('update-success-alert');
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }

      setTimeout(function () {
        if (showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    })
  }

}
