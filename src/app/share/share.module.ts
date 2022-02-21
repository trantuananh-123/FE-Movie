import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        ShareRoutingModule,
        CarouselModule,
        MatSliderModule,
        ReactiveFormsModule
    ],
    exports: [
        CarouselModule,
        HeaderComponent,
        FooterComponent,
        ReactiveFormsModule,
        MatSliderModule,
        MatFormFieldModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShareModule { }
