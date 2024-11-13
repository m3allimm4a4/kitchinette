import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Slider } from '../../shared/models/slider.interface';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: true,
  imports: [RouterLink, NgStyle],
})
export class SliderComponent implements OnInit {
  protected readonly imagesUrl = environment.imagesUrl + '/';
  public sliderItems: Slider[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getSlider().subscribe(slider => {
      this.sliderItems = slider;
    });
  }
}
