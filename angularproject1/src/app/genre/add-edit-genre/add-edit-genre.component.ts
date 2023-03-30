import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GenreService} from "../../service/genre.service";

@Component({
  selector: 'app-add-edit-genre',
  templateUrl: './add-edit-genre.component.html',
  styleUrls: ['./add-edit-genre.component.css']
})
export class AddEditGenreComponent implements OnInit{
  genreList$!:Observable<any[]>;

  @Input() genre:any;
  id:number=0;
  genreName:string="";

  constructor(private genreService:GenreService) {
  }

  ngOnInit(): void {
    this.id=this.genre.id;
    this.genreName=this.genre.genreName;
    this.genreList$=this.genreService.getGenreList();
  }
  addGenre() {
    const genre = {
      genreName: this.genreName
    };
    this.genreService.addGenre(genre).subscribe(data => {
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

  updateGenre() {
    const genre = {
      id: this.id,
      genreName: this.genreName
    };
    const id = this.id;
    this.genreService.updateGenre(this.genre.id, genre).subscribe(data => {
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
