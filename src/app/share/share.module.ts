import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent
	],
	imports: [
		CommonModule,
		ShareRoutingModule,
		CarouselModule,
	],
	exports: [
		CarouselModule,
		HeaderComponent,
		FooterComponent
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShareModule { }
