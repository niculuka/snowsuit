import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarPageComponent } from './sidebar/sidebar.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductCategoryBoxedPageComponent } from './product-category-boxed/product-category-boxed.component';

const routes: Routes = [
	{
		path: 'sidebar/:type',
		component: SidebarPageComponent
	},
	{
		path: 'sidebar',
		pathMatch: 'full',
		redirectTo: 'sidebar/list'
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'sidebar/list'
	},
	{
		path: 'cart',
		component: CartComponent
	},
	{
		path: 'wishlist',
		component: WishlistComponent
	},
	{
		path: 'checkout',
		component: CheckoutComponent
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: 'category/boxed',
		component: ProductCategoryBoxedPageComponent
	}
];

@NgModule( {
	imports: [ RouterModule.forChild( routes ) ],
	exports: [ RouterModule ]
} )



export class ShopRoutingModule { };