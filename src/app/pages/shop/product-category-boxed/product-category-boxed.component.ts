import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/classes/product';
import { ApiService } from 'src/app/shared/services/api.service';
import { shopData } from '../shared/data';

@Component({
	selector: 'shop-product-category-boxed',
	templateUrl: './product-category-boxed.component.html',
	styleUrls: ['./product-category-boxed.component.scss']
})

export class ProductCategoryBoxedPageComponent implements OnDestroy {

	products: Product[] = [];
	shopData = shopData;
	private sub0: any;
	private sub1: any;

	constructor(
		public apiService: ApiService,
		public router: Router
	) {
		this.sub0 = this.apiService.fetchProducts().subscribe(result => {
			this.products = result.products;
			//
			this.sub1 = this.shopData = JSON.parse(JSON.stringify(shopData));
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
		});
	}

	toggleSidebar() {
		if (
			document
				.querySelector('body')
				.classList.contains('sidebar-filter-active')
		) {
			document
				.querySelector('body')
				.classList.remove('sidebar-filter-active');
		} else {
			document
				.querySelector('body')
				.classList.add('sidebar-filter-active');
		}
	}

	hideSidebar() {
		document
			.querySelector('body')
			.classList.remove('sidebar-filter-active');
	}

	ngOnDestroy(): void {
		this.sub0?.unsubscribe();
		this.sub1?.unsubscribe();
	}
}
