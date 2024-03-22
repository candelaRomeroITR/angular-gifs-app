import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'}) //en el root pq el servicio es global
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'LLc7BWaoG4CC0oj4oNdGeB7bungv4ccd';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    console.log('Gifs Service ready');
  }

  get tagsHistory(){
    return [...this._tagsHistory]; //creo una copia con [...] pq se pasa por referencia
  }

  private organizeHistory(tag: string){

    tag = tag.toLowerCase();

    if( this._tagsHistory.includes(tag) ) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag )
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage() : void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0])
  }

  public searchTag(tag: string): void{

    if( tag.length === 0 ) return; // valido que el string no sea vacio
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe( resp => {
        this.gifList = resp.data;
      }) //escucho la respuesta


  }
}
