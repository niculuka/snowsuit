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
	perPage = 4;
	type = 'list';
	totalCount = 0;
	orderBy = 'default';
	sizes = [];
	colors = [];
	brands = [];
	pageTitle = 'Listă';
	toggle = false;
	searchTerm = '';
	loaded = false;
	firstLoad = false;
	currentUrl = "";

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
			if (params['size']) this.sizes = params['size'].split(',');
			else this.sizes = [];

			if (params['color']) this.colors = params['color'].split(',');
			else this.colors = [];

			if (params['brand']) this.brands = params['brand'].split(',');
			else this.brands = [];


			// ====================================================================================== P R O D U C T S
			// ======================================================================================================
			this.apiService.fetchProducts().subscribe(result => {
				let totalProducts = result.products;

				// ---------------------------------------------------------------------------------------- SIZE
				let sizeProducts = [];
				if (this.sizes.length) {
					for (let prods of totalProducts) {
						for (let p of prods.size) {
							for (let s of this.sizes) {
								if (p.slug == s) sizeProducts.push(prods);
							}
						}
					}
				}
				// console.log("sizeProducts: ", sizeProducts)
				//
				let sizes = []
				if (sizeProducts.length) sizes = totalProducts.filter((val: any) => sizeProducts.includes(val));
				else sizes = totalProducts;

				// --------------------------------------------------------------------------------------- COLOR
				let colorProducts = [];
				if (this.colors.length) {
					for (let prods of totalProducts) {
						for (let p of prods.color) {
							for (let c of this.colors) {
								if (p.slug == c) colorProducts.push(prods);
							}
						}
					}
				}
				// console.log("colorProducts: ", colorProducts)
				//
				let colors = []
				if (colorProducts.length) colors = sizes.filter((val: any) => colorProducts.includes(val));
				else colors = sizes;

				// --------------------------------------------------------------------------------------- BRAND
				let brandProducts = [];
				if (this.brands.length) {
					for (let prods of totalProducts) {
						for (let p of prods.brands) {
							for (let b of this.brands) {
								if (p.slug == b) brandProducts.push(prods);
							}
						}
					}
				}
				// console.log("brandProducts: ", brandProducts)
				//
				let brands = []
				if (brandProducts.length) brands = colors.filter((val: any) => brandProducts.includes(val));
				else brands = colors;

				// *********************************************************************************************
				// *********************************************************************************************
				// *********************************************************************************************
				totalProducts = brands;
				// console.log("filteredProducts: ", totalProducts)				
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