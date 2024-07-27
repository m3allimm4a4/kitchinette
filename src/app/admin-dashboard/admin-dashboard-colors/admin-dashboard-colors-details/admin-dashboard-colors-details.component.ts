import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { Color } from '../../../shared/models/color.interface';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
  selector: 'app-admin-dashboard-colors-details',
  standalone: true,
  imports: [FormsModule, PaginatorModule, ColorPickerModule],
  templateUrl: './admin-dashboard-colors-details.component.html',
  styleUrl: './admin-dashboard-colors-details.component.scss',
})
export class AdminDashboardColorsDetailsComponent implements OnInit {
  public color: Color = {
    _id: '',
    name: '',
    code: '',
  };
  public isEditMode = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');
          if (!id || id === 'new') {
            return of(null);
          }
          this.isEditMode = true;
          return this.http.get<Color>(`/colors/${id}`);
        }),
      )
      .subscribe(c => {
        if (c) {
          this.color = c;
        }
      });
  }

  public onSubmit(): void {
    if (!this.color.code || !this.color.name) {
      return;
    }
    let request$: Observable<Color>;
    if (this.isEditMode) {
      request$ = this.http.put<Color>(`/colors/${this.color._id}`, this.color);
    } else {
      request$ = this.http.post<Color>('/colors', this.color);
    }
    request$.subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute }).then();
    });
  }
}
