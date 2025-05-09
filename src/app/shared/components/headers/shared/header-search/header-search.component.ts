import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { environment } from 'src/environments/environment';

@Component({
	selector: 'molla-header-search',
	templateUrl: './header-search.component.html',
	styleUrls: ['./header-search.component.scss']
})

export class HeaderSearchComponent implements OnInit, OnDestroy {

	products = [];
	searchTerm = "";
	cat = null;
	suggestions = [];
	timer: any;
	SERVER_URL = environment.SERVER_URL;

	constructor(public activeRoute: ActivatedRoute, public router: Router, public utilsService: UtilsService, public apiService: ApiService) {
	}

	ngOnInit(): void {
		document.querySelector('body').addEventListener('click', this.closeSearchForm);
	}

	searchProducts(event: any) {
		this.searchTerm = event.target.value;

		//
		if (this.searchTerm.length > 2) {
			if (this.timer) {
				window.clearTimeout(this.timer);
			}
			this.timer = setTimeout(() => {
				this.apiService.fetchProducts().subscribe(result => {
					this.suggestions = result.products.filter((prod: any) =>
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
				})
			}, 500)
		} else {
			window.clearTimeout(this.timer);
			this.suggestions = [];
		}
	}

	// ============================================================== REPLACE MACTCHED SEARC-TERM
	matchEmphasize(name: string) {
		var regExp = new RegExp(this.searchTerm, 'i');
		return name.replace(
			regExp,
			match => '<strong>' + match + '</strong>'
		);
	}

	// ============================================================================ TOOGLE SEARCH
	searchToggle(e: Event) {
		document.querySelector('.header-search .header-search-wrapper').classList.toggle('show');
		document.querySelector('.header-search').classList.toggle('show');
		e.stopPropagation();
	}

	// ============================================================================ HANDLE SEARCH
	// show
	showSearchForm(e: Event) {
		document
			.querySelector('.header .header-search .header-search-wrapper')
			.classList.add('show');
		document
			.querySelector('.header .header-search')
			.classList.add('show');
		e.stopPropagation();
	}

	// close
	closeSearchForm() {
		document
			.querySelector('.header .header-search .header-search-wrapper')
			.classList.remove('show');
		document
			.querySelector('.header .header-search')
			.classList.remove('show');
	}

	// ============================================================================ GO TO PRODUCT
	goProductPage() {
		this.searchTerm = '';
		this.suggestions = [];
		var inputElement: any = document.querySelector('.header-search .form-control');
		inputElement.value = "";
		this.closeSearchForm();
	}

	// ============================================================================= S U B M I T
	submitSearchForm(e: Event) {
		e.preventDefault();
		this.router.navigate(['/shop/sidebar/4cols'], { queryParams: { searchTerm: this.searchTerm } });
	}

	//
	ngOnDestroy(): void {
		document.querySelector('body').removeEventListener('click', this.closeSearchForm);
	}
}
