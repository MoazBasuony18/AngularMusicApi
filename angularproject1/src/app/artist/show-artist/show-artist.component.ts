import {Component, OnInit} from '@angular/core';
import {ArtistService} from "../../service/artist.service";
import {ArtistVM} from "../../model/ArtistVM";

@Component({
  selector: 'app-show-artist',
  templateUrl: './show-artist.component.html',
  styleUrls: ['./show-artist.component.css']
})
export class ShowArtistComponent implements OnInit{

  artists:ArtistVM[]=[]

  filters={
    keyword:'',
    sortBY:'Name'
  }
  modalTitle: any;
  activateAddEditArtistComponent: any;
  artist:any;
  constructor(private artistService:ArtistService) {
  }
  getAllArtists():void {
    this.artistService.getArtistList().subscribe(
      data => this.artists = data
    );
  }
  ngOnInit(): void {
    this.getAllArtists();
  }

  modalAdd(){
    this.artist={
      id:0,
      artistName:null
    }
    this.modalTitle="Add Artist";
    this.activateAddEditArtistComponent=true;
  }
  modalEdit(item: any) {
    this.artist = item;
    this.modalTitle = "Edit Album";
    this.activateAddEditArtistComponent = true;
  }

  modalDelete(item:any){
    if(confirm(`Are you sure to delete Artist ${item.id}`)){
      this.artistService.deleteArtist(item.id).subscribe(data=>{
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
        this.artistService.getArtistList().subscribe(
          (response)=>{
            this.artists=response;
          }
        )
      })
    }
  }

  modalClose() {
    this.activateAddEditArtistComponent = false;
    this.artistService.getArtistList().subscribe(
      (response)=>{
        this.artists=response;
      }
    )
  }
}
