import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'contact-us',
    loadComponent: () => import('./contact-us/contact-us.component').then(m => m.ContactUsComponent),
  },
  {
    path: 'product-list',
    loadComponent: () => import('./product-list/product-list.component').then(m => m.ProductListComponent),
  },
  {
    path: 'product-details/:id',
    loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent),
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard-routes').then(m => m.ADMIN_DASHBOARD_ROUTES),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/',
  },
];
