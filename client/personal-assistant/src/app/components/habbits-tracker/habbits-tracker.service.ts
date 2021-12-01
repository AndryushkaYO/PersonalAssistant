import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Habbit } from './habbit';

@Injectable({
  providedIn: 'root'
})
export class HabbitsTrackerService {
  url = 'http://localhost:3000/api/habbits/';

  constructor(private http: HttpClient) { }

  getHabbits() {
    return this.http.get<{ message: string; habbits: any }>(this.url)
    .pipe(
      map((data) => { 
        return {
          habbits: data.habbits.map((el) => ({
            id: el['_id'],
            ...el,
            markedDates: el.markedDates.map((date) => typeof(date) === 'string' ? new Date(date): date)
          })),
        };
      })
    );
  }

  addHabbit(habbit: Habbit) {
    return this.http
      .post<{ message: string, habbit: Habbit }>(this.url, habbit);
  }

  //TO DO: Add validation if succesfully deleted/updated on component
  deletePost(id: string) {
    return this.http
      .delete<{ message: string }>(this.url + id).subscribe();
  }

  updateHabbit(habbit: Habbit) {
    this.http.put(this.url + habbit.id, habbit).subscribe();
  }
}
