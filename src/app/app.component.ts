import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'kitchinette';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost/4000/api/test').subscribe(res => {
      console.log(res);
    });
  }
}
