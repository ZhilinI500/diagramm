import { NgModule } from '@angular/core';
import { PlaceComponent } from './place/place';
import { BanerComponent } from './baner/baner';
import { FullBanerComponent } from './full-baner/full-baner';
@NgModule({
	declarations: [PlaceComponent,
    BanerComponent,
    FullBanerComponent],
	imports: [],
	exports: [PlaceComponent,
    BanerComponent,
    FullBanerComponent]
})
export class ComponentsModule {}
