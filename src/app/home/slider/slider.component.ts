import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Slider } from '../../shared/models/slider.interface';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage, NgStyle } from '@angular/common';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: true,
  imports: [RouterLink, NgStyle, NgOptimizedImage],
})
export class SliderComponent implements OnInit {
  public sliderItems: Slider[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getSlider().subscribe(slider => {
      this.sliderItems = slider;
    });
  }
}
