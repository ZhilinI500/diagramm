import { Component, Injectable } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the FullBanerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'full-baner',
  templateUrl: 'full-baner.html'
})
@Injectable()
export class FullBanerComponent {

  subscribed: boolean = false;
  text: string;
  isRoot: boolean = false;
  repairs = []
  costs = 0;

  constructor(params: NavParams, private fcm: FCM, private nativeStorage: NativeStorage) {
    console.log('Hello FullBanerComponent Component');
    console.log(params.get("repairs"));
    this.repairs = params.get("repairs"); 
    this.initRepairData();

    if (params.get("index")) {
      this.text = params.get("index");
      this.isRoot = true;
      this.nativeStorage.getItem(this.text).then(
        data => {this.subscribed = data},
        error => console.error(error)
      )
    } else {
      this.text = "not root";
      this.isRoot = false;
    }
  }

  private initRepairData(){
    for(let i = 0; i < this.repairs.length; i++){
      this.costs += this.repairs[i]["50"];
    }
  }

  changeState() {
    if (this.isRoot && this.subscribed) {
      this.fcm.subscribeToTopic("repairs/" + this.text);
      this.fcm.getToken().then(token => {
        console.log("token: ", token);
      });
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      })
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log("token: ", token);
      });
      this.nativeStorage.setItem(this.text, true);
    }else if(this.isRoot && !this.subscribed){
      this.fcm.unsubscribeFromTopic(this.text);
      this.nativeStorage.setItem(this.text, false);
    }
  }
}
