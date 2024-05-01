import { Component, OnInit } from '@angular/core';
import { SliderItem } from '../../shared/models/slider.interface';
import { Banner } from '../../shared/models/banner.interface';
import { HomeService } from '../../home/home.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard-home',
  templateUrl: './admin-dashboard-home.component.html',
  styleUrls: ['./admin-dashboard-home.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class AdminDashboardHomeComponent implements OnInit {
  public sliderItems: SliderItem[] = [];
  public banners: Banner[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.refreshSlider();
    this.refreshBanners();
  }

  onSliderUpdate(slider: SliderItem): void {
    if (slider.title && slider.subtitle && slider.description && slider.url && slider.imageFile) {
      this.homeService.updateSlider(slider).subscribe(() => {
        this.refreshSlider();
      });
    }
  }

  onBannerUpdate(banner: Banner): void {
    if (banner.title && banner.subtitle && banner.url && banner.imageFile) {
      this.homeService.updateBanner(banner).subscribe(() => {
        this.refreshBanners();
      });
    }
  }

  public onFileChange(event: Event, item: Banner | SliderItem): void {
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList && fileList.length > 0) {
      item.imageFile = fileList[0];
    }
  }

  private refreshBanners(): void {
    this.homeService.getBanners().subscribe(banners => {
      this.banners = banners;
    });
  }

  private refreshSlider(): void {
    this.homeService.getSlider().subscribe(slider => {
      this.sliderItems = slider;
    });
  }
}
