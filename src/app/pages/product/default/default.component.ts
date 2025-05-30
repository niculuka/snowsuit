import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/shared/classes/product';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
	selector: 'product-default-page',
	templateUrl: './default.component.html',
	styleUrls: ['./default.component.scss']
})

export class DefaultPageComponent implements OnInit {

	product: Product;
	prev: Product;
	next: Product;
	related = [];
	loaded = false;

	constructor(
		public apiService: ApiService,
		private activeRoute: ActivatedRoute,
		public router: Router
	) {
		this.activeRoute.params.subscribe(params => {
			this.loaded = false;
			this.apiService.fetchProducts().subscribe(result => {
				let products: any = result.products;
				for (let p of products) {
					if (p.slug == params['slug']) {
						this.product = p;
						// this.prev = result.prevProduct;
						// this.next = result.nextProduct;
						// ------------------------------ related products
						this.related = [];
						for (let rel of p.related) {
							for (let relP of products) {
								if (rel == relP.id) this.related.push(relP);
							}
						}
						this.loaded = true;
					}
				}
				if (this.product == null) this.router.navigate(['/pages/404']);
			});
		});
	}

	ngOnInit(): void {
	}
}