import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'angular-owl-carousel';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { SidebarPageComponent } from './sidebar/sidebar.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductCategoryBoxedPageComponent } from './product-category-boxed/product-category-boxed.component';
import { ShopSidebarOneComponent } from './shared/sidebar/shop-sidebar-one/shop-sidebar-one.component';
import { ShopSidebarTwoComponent } from './shared/sidebar/shop-sidebar-two/shop-sidebar-two.component';
import { ShopListOneComponent } from './shared/list/shop-list-one/shop-list-one.component';

@NgModule( {
	declarations: [
		SidebarPageComponent,
		CartComponent,
		WishlistComponent,
		CheckoutComponent,
		DashboardComponent,
		ProductCategoryBoxedPageComponent,
		ShopSidebarOneComponent,
		ShopSidebarTwoComponent,
		ShopListOneComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		ShopRoutingModule,
		RouterModule,
		NgbModule,
		OwlModule,
		NgxSliderModule
	]
} )

export class ShopModule { }
