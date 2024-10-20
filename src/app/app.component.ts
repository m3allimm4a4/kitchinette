import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ScrollTopModule } from 'primeng/scrolltop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, HeaderComponent, FooterComponent, ScrollTopModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public area = 'user';

  onActivate(component: Component) {
    // if (component instanceof AdminDashboardComponent) {
    //   this.area = 'admin';
    // } else {
    // }
    this.area = 'user';
  }
}
