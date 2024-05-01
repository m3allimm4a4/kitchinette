import { DOCUMENT, NgClass } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ShareLink } from '../../shared/models/share-link.interface';

@Component({
  selector: 'app-product-details-social-links',
  templateUrl: './product-details-social-links.component.html',
  styleUrls: ['./product-details-social-links.component.scss'],
  standalone: true,
  imports: [NgClass],
})
export class ProductDetailsSocialLinksComponent {
  public shareLinks: ShareLink[];

  constructor(@Inject(DOCUMENT) document: Document) {
    this.shareLinks = [
      {
        name: 'Whatsapp',
        url: `https://api.whatsapp.com/send?text=${document.location.href}`,
        icon: 'pi-whatsapp',
      },
      {
        name: 'Telegram',
        url: `https://t.me/share/url?url=${document.location.href}&text=`,
        icon: 'pi-telegram',
      },
      {
        name: 'Facebook',
        url: `https://www.facebook.com/sharer/sharer.php?u=${document.location.href}`,
        icon: 'pi-facebook',
      },
      {
        name: 'Twitter',
        url: `https://twitter.com/intent/tweet?url=${document.location.href}&text=`,
        icon: 'pi-twitter',
      },
      {
        name: 'Mail',
        url: `mailto:?&subject=&body=${document.location.href}`,
        icon: 'pi-envelope',
      },
    ];
  }
}
