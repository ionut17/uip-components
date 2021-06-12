import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { PaginationChange } from './modules/datagrid/models';

interface PostModel {
  id: number;
  title: string;
  body: string;
}

const DATA = [
  { id: 1, title: 'Abc', body: 'Hello!'},
  { id: 2, title: 'Bbc', body: 'Hello!'},
  { id: 3, title: 'Cbc', body: 'Hello there!'},
  { id: 4, title: 'Dbc', body: 'Hello there!'},
  { id: 5, title: 'Ebc', body: 'Hello there!'},
  { id: 6, title: 'Fbc', body: 'Hello there!'},
  { id: 7, title: 'Ebc', body: 'Hello there!'},
  { id: 8, title: 'Gbc', body: 'Hello there!'},
  { id: 9, title: 'Hbc', body: 'Hello there!'},
  { id: 10, title: 'Ebc', body: 'Hello there!'},
  { id: 11, title: 'Fbc', body: 'Hello there!'},
  { id: 12, title: 'Fbc', body: 'Hello there!'},
  { id: 13, title: 'Fbc', body: 'Hello there!'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  myData: PostModel[] = DATA;
  myData$ = new Subject<PostModel[]>();
  progress: number = 0;

  constructor(private _http: HttpClient) {};

  ngOnInit(): void {
    this._initMyData();
    this._initLoader();
  }

  public performFetch(event: PaginationChange) {
    console.log(event);
  }

  private _initMyData() {
    this._http.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => this.myData$.next(data as PostModel[]));
    // setTimeout(() => {
    //   this.myData$.next(DATA);
    // }, 5000);
  }

  private _initLoader() {
    const interval = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  }

}
