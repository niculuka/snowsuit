import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'angular-owl-carousel';

import { SharedModule } from '../../shared/shared.module';

import { FeaturedCollectionComponent } from './featured-collection/featured-collection.component';
import { TopCollectionComponent } from './top-collection/top-collection.component';
import { IndexComponent } from './index/index.component';

@NgModule({
	declarations: [
		FeaturedCollectionComponent,
		TopCollectionComponent,
		IndexComponent		
	],

	imports: [
		CommonModule,
		RouterModule,
		NgbModule,
		OwlModule,
		SharedModule
	]
})

export class HomeModule { }
