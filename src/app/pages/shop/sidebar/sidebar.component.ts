import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
	selector: 'shop-sidebar-page',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})

export class SidebarPageComponent implements OnInit, OnDestroy {
	products = [];
	allProducts = [];
	perPage = 16;
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

	private sub0: any;
	private sub1: any;
	private sub2: any;

	constructor(public activeRoute: ActivatedRoute, public router: Router, public utilsService: UtilsService, public apiService: ApiService) {
		this.sub0 = this.activeRoute.params.subscribe(params => {
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

		this.sub1 = this.activeRoute.queryParams.subscribe(params => {
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
			this.sub2 = this.apiService.fetchProducts().subscribe(result => {
				this.allProducts = result.products;

				// ------------------------------------------------------------------------------------ SEARCH ()
				let totalProducts: any;
				//
				if (this.searchTerm) {
					totalProducts = result.products.filter((prod: any) =>
						prod.name
							.replace(/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g, "a")
							.replace(/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g, "i")
							.replace(/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g, "s")
							.replace(/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g, "t")
							.toLowerCase()
							.includes(this.searchTerm
								.replace(/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g, "a")
								.replace(/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g, "i")
								.replace(/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g, "s")
								.replace(/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g, "t")
								.toLowerCase()
							));
				}

				else totalProducts = result.products;

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
						for (let p of prod.brand) {
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
				this.sorter(totalProducts);
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

	sorter(totalProducts: any) {
		if (this.orderBy === "default") {
			totalProducts = totalProducts.sort((a: any, b: any): any => a.id - b.id);
		}
		if (this.orderBy === "featured") {
			totalProducts = totalProducts.sort((a: any, b: any): any => {
				if (a.featured === b.featured) return 0;
				if (a.featured) return -1;
				if (b.featured) return 1;
			});
			totalProducts = totalProducts.sort((a: any, b: any): any => b.id - a.id);
		}
		if (this.orderBy === "price-asc") {
			totalProducts = totalProducts.sort((a: any, b: any): any => a.price - b.price);
		}
		if (this.orderBy === "price-desc") {
			totalProducts = totalProducts.sort((a: any, b: any): any => b.price - a.price);
		}
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

	ngOnDestroy(): void {
		this.sub0?.unsubscribe();
		this.sub1?.unsubscribe();
		this.sub2?.unsubscribe();
	}
}