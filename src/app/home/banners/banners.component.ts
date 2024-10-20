import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { RouterLink } from '@angular/router';
import { Banner } from '../../shared/models/banner.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class BannersComponent implements OnInit {
  protected readonly imagesUrl = environment.imagesUrl + '/';

  public banners: Banner[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getBanners().subscribe(banners => {
      this.banners = banners;
    });
  }
}
