import { Component, Input, OnChanges } from '@angular/core';

import { productSlider } from '../data';

@Component({
	selector: 'molla-top-collection',
	templateUrl: './top-collection.component.html',
	styleUrls: ['./top-collection.component.scss']
})

export class TopCollectionComponent implements OnChanges {

	@Input() products = [];
	@Input() loaded = false;

	productSlider = productSlider;

	constructor() { }

	ngOnChanges(): void {
		if (this.products) {
			this.products = this.products.sort((a: any, b: any): any => a.id - b.id);
		}
	}
}
