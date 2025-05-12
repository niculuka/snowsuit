import { Component } from '@angular/core';

import { ModalService } from 'src/app/shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { brandSlider, instagramSlider } from '../data';

@Component({
	selector: 'molla-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})

export class IndexComponent {

	products = [];
	loaded = false;
	brandSlider = brandSlider;
	instagramSlider = instagramSlider;

	constructor(public apiService: ApiService, public utilsService: UtilsService, private modalService: ModalService,) {
		this.modalService.openNewsletter();

		this.apiService.fetchProducts().subscribe(result => {
			this.products = result.products;
			this.loaded = true;
		});
	}

	showVideoModal(event: Event) {
		event.preventDefault();
		this.modalService.showVideoModal();
	}
}
