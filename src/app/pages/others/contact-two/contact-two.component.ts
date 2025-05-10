import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'pages-contact-two',
	templateUrl: './contact-two.component.html',
	styleUrls: ['./contact-two.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactTwoPageComponent implements OnInit {
	apiLoaded: Observable<boolean>;
	email: string = "info@snowsuit.com";
  
	constructor() {	}
	
	ngOnInit(): void {
	}
}