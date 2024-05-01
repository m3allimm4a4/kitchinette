import { Component, Input } from '@angular/core';
import { TopbarComponent } from './topbar/topbar.component';
import { MiddleInnerComponent } from './middle-inner/middle-inner.component';
import { HeaderInnerComponent } from './header-inner/header-inner.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [TopbarComponent, MiddleInnerComponent, HeaderInnerComponent],
})
export class HeaderComponent {
  @Input() currentPage = '';
}
