import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiagrammPage } from './diagramm';

@NgModule({
  declarations: [
    DiagrammPage,
  ],
  imports: [
    IonicPageModule.forChild(DiagrammPage),
  ],
})
export class DiagrammPageModule {}
