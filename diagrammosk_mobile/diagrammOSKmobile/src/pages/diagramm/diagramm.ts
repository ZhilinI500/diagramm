import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { DataSortService } from '../../services/dataSort.service';
import { MyEvents } from '../../services/myEvents.service';
import { DragService } from '../../services/drag.service';
import { MenuService } from '../../services/menu.service';

/**
 * Diagram Page
 */
@IonicPage()
@Component({
  selector: 'page-diagramm',
  templateUrl: 'diagramm.html',
})
export class DiagrammPage {

  public left = this.dragService.startLeft;

  constructor(private dragService: DragService,
    private myEvents: MyEvents,
    private events: Events,
    private dataSortService: DataSortService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuService) {

    events.subscribe(this.myEvents.getEventKeys().ready, () => {
      this.treeArray = this.dataSortService.getDataForTree();
    });
  }


  private treeArray: any = [];
  private timelineDays: any = [];
  private oldDelta: number = 0;

  private dragTimeLine(event) {
    this.dragService.drag(this, event.deltaX - this.oldDelta);

    this.timelineDays = [];

    for (let i = 0; i < 20; i++) {
      var showLineBuff = (((document.body.clientWidth / 100) * i * 10 + 5) + parseFloat(this.left)) >= (document.body.clientWidth / 5);
      var month = new Date(new Date().getTime() - 9 * 24 * 3600 * 1000 + i * 24 * 3600 * 1000).getMonth() + 1 + "";

      if(month.length == 1){
        month = "0" + month;
      }

      this.timelineDays.push({
        label: new Date(new Date().getTime() - 9 * 24 * 3600 * 1000 + i * 24 * 3600 * 1000).getDate() + "." + month,
        left: i * 10 + 5 + "vw",
        showDayLine: showLineBuff
      });
    }

    if (event.isFinal) {
      this.oldDelta = 0;
    } else {
      this.oldDelta = event.deltaX;
    }
  }

  ionViewDidLoad() {
    setTimeout(() => {

      for (let i = 0; i < 20; i++) {
        var showLineBuff = (((document.body.clientWidth / 100) * i * 10 + 5) + parseFloat(this.left)) >= (document.body.clientWidth / 5);
        var month = new Date(new Date().getTime() - 9 * 24 * 3600 * 1000 + i * 24 * 3600 * 1000).getMonth() + 1 + "";
        if(month.length == 1){
          month = "0" + month;
        }

        this.timelineDays.push({
          label: new Date(new Date().getTime() - 9 * 24 * 3600 * 1000 + i * 24 * 3600 * 1000).getDate() + "." + month,
          left: i * 10 + 5 + "vw",
          showDayLine: showLineBuff
        });
      }
    }, 100)

    console.log('ionViewDidLoad DiagrammPage');
  }
}
