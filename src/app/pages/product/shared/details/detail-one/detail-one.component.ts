import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/shared/classes/product';

import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { CompareService } from 'src/app/shared/services/compare.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
	selector: 'product-detail-one',
	templateUrl: './detail-one.component.html',
	styleUrls: ['./detail-one.component.scss']
})

export class DetailOneComponent implements OnInit {

	@Input() product: Product;

	variationGroup = [];
	selectableGroup = [];
	sizeArray = [];
	colorArray = [];
	selectedVariant = {
		color: null,
		colorName: null,
		price: null,
		size: ""
	};
	maxPrice = 0;
	minPrice = 99999;
	qty = 1;
	qty2 = 1;

	SERVER_URL = environment.SERVER_URL;

	constructor(
		public cartService: CartService,
		public wishlistService: WishlistService,
		public compareService: CompareService,
		public router: Router,
		public el: ElementRef) {
	}

	ngOnInit(): void { }

	addCart(event: Event, index = 0) {
		event.preventDefault();
		if ((event.currentTarget as HTMLElement).classList.contains('btn-disabled')) return;

		let newProduct = { ...this.product };
		if (this.product.variants.length > 0) {
			newProduct = {
				...this.product,
				name:
					this.product.name +
					' - ' +
					this.selectedVariant.colorName +
					', ' +
					this.selectedVariant.size,
				price: this.selectedVariant.price
			};
		}

		this.cartService.addToCart(
			newProduct, index == 0 ? this.qty : this.qty2
		);
	}

	addToWishlist(event: Event) {
		event.preventDefault();

		if (this.isInWishlist()) {
			this.router.navigate(['/shop/wishlist']);
		} else {
			this.wishlistService.addToWishList(this.product);
		}
	}

	addToCompare(event: Event) {
		event.preventDefault();
		if (this.isInCompare()) return;
		this.compareService.addToCompare(this.product);
	}

	isInCompare() {
		return this.compareService.isInCompare(this.product);
	}

	isInWishlist() {
		return this.wishlistService.isInWishlist(this.product);
	}

	onChangeQty(current: number) {
		this.qty = current;
	}

	onChangeQty2(current: number) {
		this.qty2 = current;
	}
}