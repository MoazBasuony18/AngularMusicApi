import {Component, Input, OnInit} from '@angular/core';
import {ArtistService} from "../../service/artist.service";
import {Observable} from "rxjs";
import {ArtistVM} from "../../model/ArtistVM";

@Component({
  selector: 'app-add-edit-artist',
  templateUrl: './add-edit-artist.component.html',
  styleUrls: ['./add-edit-artist.component.css']
})
export class AddEditArtistComponent implements OnInit {
  artistsList$!: Observable<any[]>

  @Input() artist: any;
  id: number = 0;
  artistName: string = "";

  constructor(private artistService: ArtistService) {
  }

  ngOnInit(): void {
    this.id = this.artist.id;
    this.artistName = this.artist.artistName;
    this.artistsList$ = this.artistService.getArtistList();
  }

  addArtist() {
    const artist = {
      artistName: this.artistName
    };
    this.artistService.addArtist(artist).subscribe(data => {
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

  updateArtist() {
    const artist = {
      id: this.id,
      artistName: this.artistName
    };
    const id = this.id;
    this.artistService.updateArtist(this.artist.id, artist).subscribe(data => {
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
