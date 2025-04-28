import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
	selector: 'shop-sidebar-page',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})

export class SidebarPageComponent implements OnInit {
	products = [];
	allProducts = [];
	perPage = 10;
	type = 'list';
	totalCount = 0;
	orderBy = 'default';
	pageTitle = 'Listă';
	toggle = false;
	searchTerm = '';
	loaded = false;
	firstLoad = false;
	//
	currentUrl = "";
	//
	sizes = null;
	colors = null;
	brands = null;
	category = null;
	minPrice = null;
	maxPrice = null;

	constructor(public activeRoute: ActivatedRoute, public router: Router, public utilsService: UtilsService, public apiService: ApiService) {
		this.activeRoute.params.subscribe(params => {
			this.type = params['type'];
			this.currentUrl = "/shop/sidebar/" + this.type;
			//
			if (this.type == 'list') {
				this.pageTitle = 'Listă';
			} else if (this.type == '2cols') {
				this.pageTitle = 'Grid (2 Coloane)';
			} else if (this.type == '3cols') {
				this.pageTitle = 'Grid (3 Coloane)';
			} else if (this.type == '4cols') {
				this.pageTitle = 'Grid (4 Coloane)';
			}
		});

		this.activeRoute.queryParams.subscribe(params => {
			this.loaded = false;
			if (params['searchTerm']) {
				this.searchTerm = params['searchTerm'];
			} else {
				this.searchTerm = '';
			}

			if (params['orderBy']) {
				this.orderBy = params['orderBy'];
			} else {
				this.orderBy = 'default';
			}

			// --------------------------------------------------------- FILTERS PARAM
			if (params['category']) this.category = params['category'];
			else this.category = null;

			if (params['size']) this.sizes = params['size'].split(',');
			else this.sizes = null;

			if (params['color']) this.colors = params['color'].split(',');
			else this.colors = null;

			if (params['brand']) this.brands = params['brand'].split(',');
			else this.brands = null;

			if (params['minPrice']) this.minPrice = parseInt(params['minPrice']);
			else this.minPrice = null;

			if (params['maxPrice']) this.maxPrice = parseInt(params['maxPrice']);
			else this.maxPrice = null;

			// ====================================================================================== P R O D U C T S
			// ======================================================================================================
			this.apiService.fetchProducts().subscribe(result => {
				this.allProducts = result.products;
				//
				let totalProducts = result.products;
				// console.log("IN_Products: ", totalProducts)
				// ------------------------------------------------------------------------------------- CATEGORY
				let categProducts = [];
				let categsOUT = [];
				if (this.category) {
					for (let prod of totalProducts) {
						for (let p of prod.category) {
							if (p.slug == this.category) categProducts.push(prod);
						}
					}
					// console.log("categProducts: ", categProducts);
					//
					categsOUT = totalProducts.filter((val: any) => categProducts.includes(val));
				}
				else categsOUT = totalProducts;


				// ---------------------------------------------------------------------------------------- SIZE
				let sizeProducts = [];
				let sizesOUT = [];
				if (this.sizes) {
					for (let prod of totalProducts) {
						for (let p of prod.size) {
							for (let s of this.sizes) {
								if (p.slug == s) sizeProducts.push(prod);
							}
						}
					}
					// console.log("sizeProducts: ", sizeProducts);
					//
					sizesOUT = categsOUT.filter((val: any) => sizeProducts.includes(val));
				}
				else sizesOUT = categsOUT;
				// --------------------------------------------------------------------------------------- COLOR
				let colorProducts = [];
				let colorsOUT = []
				if (this.colors) {
					for (let prod of totalProducts) {
						for (let p of prod.color) {
							for (let c of this.colors) {
								if (p.slug == c) colorProducts.push(prod);
							}
						}
					}
					// console.log("colorProducts: ", colorProducts);
					//
					colorsOUT = sizesOUT.filter((val: any) => colorProducts.includes(val));
				}
				else colorsOUT = sizesOUT;

				// --------------------------------------------------------------------------------------- BRAND
				let brandProducts = [];
				let brandsOUT = [];
				if (this.brands) {
					for (let prod of totalProducts) {
						for (let p of prod.brands) {
							for (let b of this.brands) {
								if (p.slug == b) brandProducts.push(prod);
							}
						}
					}
					// console.log("brandProducts: ", brandProducts);
					brandsOUT = colorsOUT.filter((val: any) => brandProducts.includes(val));
				}
				else brandsOUT = colorsOUT;

				// --------------------------------------------------------------------------------------- PRICE
				let priceProducts = [];
				let pricesOUT = [];
				if (this.minPrice || this.minPrice == 0 || this.maxPrice || this.maxPrice == 0) {
					for (let prod of totalProducts) {
						if (prod.price >= this.minPrice && prod.price <= this.maxPrice) {
							priceProducts.push(prod);
						}
					}
					// console.log("priceProducts: ", priceProducts)
					pricesOUT = brandsOUT.filter((val: any) => priceProducts.includes(val));
				}
				else pricesOUT = brandsOUT;

				// *********************************************************************************************
				// *********************************************************************************************
				// *********************************************************************************************

				totalProducts = pricesOUT;
				// console.log("OUT_Products: ", totalProducts)
				this.totalCount = totalProducts.length;
				//
				let pageInd = 0;
				if (params.page && params.page >= 1) pageInd = params.page - 1;
				//
				const startInd = pageInd * this.perPage;
				const endInd = startInd + this.perPage;
				this.products = totalProducts.slice(startInd, endInd);
				//
				this.loaded = true;
				if (!this.firstLoad) this.firstLoad = true;
				//
				this.utilsService.scrollToPageContent();
			})
		})
	}

	ngOnInit(): void {
		if (window.innerWidth > 991) this.toggle = false;
		else this.toggle = true;
	}

	@HostListener('window: resize', ['$event'])
	onResize(event: Event) {
		if (window.innerWidth > 991) this.toggle = false;
		else this.toggle = true;
	}

	changeOrderBy(event: any) {
		this.router.navigate([], { queryParams: { orderBy: event.currentTarget.value, page: 1 }, queryParamsHandling: 'merge' });
	}

	toggleSidebar() {
		if (document.querySelector('body').classList.contains('sidebar-filter-active'))
			document.querySelector('body').classList.remove('sidebar-filter-active');
		else
			document.querySelector('body').classList.add('sidebar-filter-active');
	}

	hideSidebar() {
		document.querySelector('body').classList.remove('sidebar-filter-active');
	}
}