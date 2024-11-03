import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { RouterLink } from '@angular/router';
import { Banner } from '../../shared/models/banner.interface';
import { environment } from '../../../environments/environment';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
  standalone: true,
  imports: [RouterLink, CarouselModule],
})
export class BannersComponent implements OnInit {
  protected readonly imagesUrl = environment.imagesUrl + '/';

  public banners: Banner[] = [];

  public responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '1220px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getBanners().subscribe(banners => {
      this.banners = banners;
    });
  }
}
