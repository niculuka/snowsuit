import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'molla-featured-collection',
	templateUrl: './featured-collection.component.html',
	styleUrls: ['./featured-collection.component.scss']
})

export class FeaturedCollectionComponent implements OnInit {

	@Input() products = [];
	@Input() loaded = false;

	constructor() { }

	ngOnInit(): void {
	}
}
