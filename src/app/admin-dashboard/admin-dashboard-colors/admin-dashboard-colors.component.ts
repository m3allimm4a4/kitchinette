import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Color } from '../../shared/models/color.interface';
import { switchMap, tap } from 'rxjs';
import { InitializationService } from '../../shared/services/initialization/initialization.service';

@Component({
  selector: 'app-admin-dashboard-colors',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard-colors.component.html',
  styleUrl: './admin-dashboard-colors.component.scss',
})
export class AdminDashboardColorsComponent implements OnInit {
  public colors: Color[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    private initializationService: InitializationService,
  ) {}

  ngOnInit(): void {
    this.refreshColors().subscribe();
  }

  public deleteColor(color: Color): void {
    this.http
      .delete<void>(`/colors/${color._id}`)
      .pipe(switchMap(() => this.refreshColors()))
      .subscribe();
  }

  private refreshColors() {
    return this.initializationService.getAllColors().pipe(
      tap(colors => {
        this.colors = colors;
      }),
    );
  }
}
