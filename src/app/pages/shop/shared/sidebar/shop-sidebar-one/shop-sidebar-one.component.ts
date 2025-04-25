import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';

import { shopData } from '../../data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'shop-sidebar-one',
	templateUrl: './shop-sidebar-one.component.html',
	styleUrls: ['./shop-sidebar-one.component.scss']
})

export class ShopSidebarOneComponent implements OnInit, OnChanges {

	@Input() products = [];
	@Input() toggle = false;
	@Input() currentUrl = "";
	shopData = shopData;
	params = {};
	priceRange: any = [0, 2000];

	@ViewChild('priceSlider') priceSlider: any;

	constructor(public activeRoute: ActivatedRoute, public router: Router) {
		activeRoute.queryParams.subscribe(params => {
			this.params = params;
			if (params['minPrice'] && params['maxPrice']) {
				this.priceRange = [
					params['minPrice'] / 1,
					params['maxPrice'] / 1
				]
			} else {
				this.priceRange = [0, 2000];

				if (this.priceSlider) {
					this.priceSlider.slider.reset({ min: 0, max: 2000 });
				}
			}
		})
	}
	ngOnChanges(): void {
		this.shopData = JSON.parse(JSON.stringify(shopData));
		if (this.products.length) {
			for (let prod of this.products) {
				for (let p of prod.category) {
					for (let data of this.shopData.categories) {
						if (p.slug == data.slug) {
							data.count += 1;
						}
					}
				}
			}
		}
	}

	ngOnInit(): void {
	}

	containsAttrInUrl(type: string, value: string) {
		const currentQueries = this.params[type] ? this.params[type].split(',') : [];
		return currentQueries && currentQueries.includes(value);
	}

	getUrlForAttrs(type: string, value: string) {
		let currentQueries = this.params[type] ? this.params[type].split(',') : [];
		currentQueries = this.containsAttrInUrl(type, value) ? currentQueries.filter((item: any) => item !== value) : [...currentQueries, value];
		return currentQueries.join(',');
	}

	onAttrClick(attr: string, value: string) {
		let url = this.getUrlForAttrs(attr, value);
		this.router.navigate([], { queryParams: { [attr]: this.getUrlForAttrs(attr, value), page: 1 }, queryParamsHandling: 'merge' });
	}

	filterPrice() {
		this.router.navigate([], { queryParams: { minPrice: this.priceRange[0], maxPrice: this.priceRange[1], page: 1 }, queryParamsHandling: 'merge' });
	}

	changeFilterPrice(value: any) {
		this.priceRange = [value[0], value[1]];
		this.filterPrice();
	}

	clearFilter() {
		// console.log(this.priceRange);
		this.priceRange = [0, 2000];
	}
}