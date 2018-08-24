import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FCM } from '@ionic-native/fcm'

import { DataGetService } from '../services/dataGet.service';
import { DataSortService } from '../services/dataSort.service';

import { MyApp } from './app.component';
import { DiagrammPage } from '../pages/diagramm/diagramm';

import { PlaceComponent } from '../components/place/place';
import { BanerComponent } from '../components/baner/baner';
import { FullBanerComponent } from '../components/full-baner/full-baner';
import { MyEvents } from '../services/myEvents.service';
import { DragService } from '../services/drag.service';
import { MenuService } from '../services/menu.service';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp,
    DiagrammPage,
    PlaceComponent,
    BanerComponent,
    FullBanerComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DiagrammPage,
    PlaceComponent,
    BanerComponent,
    FullBanerComponent
  ],
  providers: [
    DataGetService,
    DataSortService,
    StatusBar,
    SplashScreen,
    DataGetService,
    DataSortService,
    MyEvents,
    DragService,
    MenuService,
    FCM,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
