import {Component, OnInit} from '@angular/core';
import {GenreVM} from "../../model/genreVM";
import {GenreService} from "../../service/genre.service";

@Component({
  selector: 'app-show-genre',
  templateUrl: './show-genre.component.html',
  styleUrls: ['./show-genre.component.css']
})
export class ShowGenreComponent implements OnInit{
  genres:GenreVM[]=[];
  modalTitle: any;
  activateAddEditGenreComponent: any;
  genre:any;

  constructor(private genreService:GenreService) {
  }
  ngOnInit(): void {
    this.genreService.getGenreList().subscribe(
      (response)=>{
        this.genres=response;
      }
    )
  }
  modalAdd(){
    this.genre={
      id:0,
      GenreName:null
    }
    this.modalTitle="Add Artist";
    this.activateAddEditGenreComponent=true;
  }
  modalEdit(item: any) {
    this.genre = item;
    this.modalTitle = "Edit Album";
    this.activateAddEditGenreComponent = true;
  }

  modalDelete(item:any){
    if(confirm(`Are you sure to delete Genre ${item.id}`)){
      this.genreService.deleteGenre(item.id).subscribe(data=>{
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
        this.genreService.getGenreList().subscribe(
          (response)=>{
            this.genres=response;
          }
        )
      })
    }
  }

  modalClose() {
    this.activateAddEditGenreComponent = false;
    this.genreService.getGenreList().subscribe(
      (response)=>{
        this.genres=response;
      }
    )
  }
}
