import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { RouterLink } from '@angular/router';
import { Banner } from '../../shared/models/banner.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
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
