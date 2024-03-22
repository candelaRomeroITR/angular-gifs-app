import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private giftService: GifsService) {}

  get tags(): string[]{
    return this.giftService.tagsHistory;
  }

  searchTag( tag: string ) {
    this.giftService.searchTag(tag);
  }

}
