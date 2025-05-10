import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'pages-contact-one',
	templateUrl: './contact-one.component.html',
	styleUrls: ['./contact-one.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactOnePageComponent implements OnInit {
	apiLoaded: Observable<boolean>;
	mail: string = "info@snowsuit.ro"

	constructor() { }

	ngOnInit(): void {
	}
}