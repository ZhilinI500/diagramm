import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataGetService } from '../services/dataGet.service';
import { DataSortService } from '../services/dataSort.service';
import { FCM } from '@ionic-native/fcm'

import { DiagrammPage } from '../pages/diagramm/diagramm';
import { MyEvents } from '../services/myEvents.service';
import { DragService } from '../services/drag.service';
import { MenuService } from '../services/menu.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = DiagrammPage;

  constructor
    (public dragService: DragService,
    public myEvents: MyEvents,
    public dataSortService: DataSortService,
    public dataGetService: DataGetService,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menu: MenuService,
    public fcm: FCM) {
    platform.ready().then(() => {
      // fcm.subscribeToTopic('test');
      // fcm.getToken().then(token=>{
      //     console.log("token: ", token);
      // });
      // fcm.onNotification().subscribe(data=>{
      //   if(data.wasTapped){
      //     console.log("Received in background");
      //   } else {
      //     console.log("Received in foreground");
      //   };
      // })
      // fcm.onTokenRefresh().subscribe(token=>{
      //   console.log("token: ", token);
      // });

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

