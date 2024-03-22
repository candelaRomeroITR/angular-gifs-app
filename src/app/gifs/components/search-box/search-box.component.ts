import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text"
    class="form-control"
    placeholder="Buscar gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput>
  `,
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput') //toma una referencia local
  public tagInput!: ElementRef<HTMLInputElement> //ElementRef referencia a algun elemento html, hay que aclarar cual.

  constructor( private GifsService: GifsService ){} //inyecto el servicio para poder usarlo aca

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.GifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
