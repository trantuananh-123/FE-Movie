import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShareRoutingModule,
    CarouselModule,
  ],
  exports: [
    CarouselModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShareModule { }
