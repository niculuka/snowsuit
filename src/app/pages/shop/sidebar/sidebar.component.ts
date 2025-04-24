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
	pageTitle = 'List';
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
				this.pageTitle = 'List';
			} else if (this.type == '2cols') {
				this.pageTitle = 'Grid 2 Columns';
			} else if (this.type == '3cols') {
				this.pageTitle = 'Grid 3 Columns';
			} else if (this.type == '4cols') {
				this.pageTitle = 'Grid 4 Columns';
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

			this.apiService.fetchAllShopData().subscribe(result => {
				let totalProducts = result.products;
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
				if (!this.firstLoad) {
					this.firstLoad = true;
				}

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