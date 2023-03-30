import {Component, OnInit} from '@angular/core';
import {AlbumService} from "../../service/album.service";
import {Observable} from "rxjs";
import {ArtistService} from "../../service/artist.service";
import {GenreService} from "../../service/genre.service";

@Component({
  selector: 'app-show-album',
  templateUrl: './show-album.component.html',
  styleUrls: ['./show-album.component.css']
})
export class ShowAlbumComponent implements OnInit {
  albumList$!: Observable<any[]>;
  artistsList$!: Observable<any[]>;
  genresList$!: Observable<any[]>;
  artistsList: any = [];
  genresList: any = [];

  artistMap: Map<number, string> = new Map()
  genreMap: Map<number, string> = new Map()

  constructor(private albumService: AlbumService, private artistService: ArtistService, private genreService: GenreService) {
  }

  ngOnInit(): void {
    this.albumList$ = this.albumService.getAlbumList();
    this.artistsList$ = this.artistService.getArtistList();
    this.genresList$ = this.genreService.getGenreList();
    this.refreshArtistMap();
    this.refershGenreMap();
  }

  //Variables
  modalTitle: string = "";
  activateAddEditAlbumComponent: boolean = false;
  album: any;

  modalAdd() {
    this.album = {
      id: 0,
      albumName: null,
      dateReleased: null,
      artistId: null,
      genreId: null
    }
    this.modalTitle = "Add Album";
    this.activateAddEditAlbumComponent = true;
  }

  modalEdit(item: any) {
    this.album = item;
    this.modalTitle = "Edit Album";
    this.activateAddEditAlbumComponent = true;
  }

  modalDelete(item:any){
    if(confirm(`Are you sure to delete Album ${item.id}`)){
      this.albumService.deleteAlbum(item.id).subscribe(data=>{
        const closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }

        const showDeleteSuccess = document.getElementById('delete-success-alert');
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = "block";
          this.modalClose()
        }

        setTimeout(function () {
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = "none"
          }
        }, 1000);
        this.albumList$=this.albumService.getAlbumList();
      })
    }
  }

  modalClose() {
    this.activateAddEditAlbumComponent = false;
    this.albumList$ = this.albumService.getAlbumList();
  }

  refreshArtistMap() {
    this.artistService.getArtistList().subscribe(data => {
      this.artistsList = data;
      for (let i = 0; i < data.length; i++) {
        this.artistMap.set(this.artistsList[i].id, this.artistsList[i].artistName);
      }
    })
  }

  refershGenreMap() {
    this.genreService.getGenreList().subscribe(data => {
      this.genresList = data;
      for (let i = 0; i < data.length; i++) {
        this.genreMap.set(this.genresList[i].id, this.genresList[i].genreName)
      }
    })
  }

}
