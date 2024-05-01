import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Banner } from '../../shared/models/banner.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class BannersComponent implements OnInit {
  public banners: Banner[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getBanners().subscribe(banners => {
      this.banners = banners;
    });
  }
}
