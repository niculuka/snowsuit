import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { OwlModule } from 'angular-owl-carousel';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { DefaultPageComponent } from './default/default.component';
import { GalleryDefaultComponent } from './shared/gallery/gallery-default/gallery-default.component';
import { DetailOneComponent } from './shared/details/detail-one/detail-one.component';
import { InfoOneComponent } from './shared/info-tabs/info-one/info-one.component';
import { RelatedProductsOneComponent } from './shared/related-products/related-products-one/related-products-one.component';

@NgModule({
	declarations: [
		DefaultPageComponent,
		GalleryDefaultComponent,
		DetailOneComponent,
		InfoOneComponent,
		RelatedProductsOneComponent
	],

	imports: [
		CommonModule,
		ProductRoutingModule,
		SharedModule,
		RouterModule,
		NgbModule,
		OwlModule,
		LightboxModule,
	],

	exports: [],

	providers: [
		NgbModal
	]
})

export class ProductModule { }
