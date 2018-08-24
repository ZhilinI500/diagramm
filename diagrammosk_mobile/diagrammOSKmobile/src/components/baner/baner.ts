import { Output, Input, Component } from '@angular/core';
import { PopoverController, Events } from 'ionic-angular';

import { FullBanerComponent } from '../full-baner/full-baner';

import { DataSortService } from '../../services/dataSort.service';
import { MyEvents } from '../../services/myEvents.service';
import { DragService } from '../../services/drag.service';
import { MenuService } from '../../services/menu.service';

/**
 * Generated class for the BanerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'baner',
  templateUrl: 'baner.html'
})
export class BanerComponent {

  public getLeft(): number {
    var intervalLeft;
    var realIntervalLeft;
    for (let i = 0; i < this.intervals.length; i++) {
      if (parseFloat(this.intervals[i].banerLeft) + parseFloat(this.intervals[i].duration) > document.body.clientWidth / 2) {
        intervalLeft = parseFloat(this.intervals[i].banerLeft) - document.body.clientWidth / 4;
        break;
      }
    }
    for (let i = 0; i < this.realIntervals.length; i++) {
      if (parseFloat(this.realIntervals[i].banerLeft) + parseFloat(this.realIntervals[i].duration) > document.body.clientWidth / 2) {
        realIntervalLeft = parseFloat(this.realIntervals[i].banerLeft) - document.body.clientWidth / 4;
        break;
      }
    }

    if (intervalLeft <= realIntervalLeft) {
      return intervalLeft;
    } else if (intervalLeft > realIntervalLeft) {
      return realIntervalLeft;
    } else if (!(intervalLeft || realIntervalLeft)) {
      return document.body.clientWidth * 1.25;
    } else if (!intervalLeft && realIntervalLeft) {
      return realIntervalLeft;
    } else if (intervalLeft && !realIntervalLeft) {
      return intervalLeft;
    }
  };

  @Input() set path(val) {
    this._path = val;
    this.repairs = this.dataSortService.getSortedRepairData(this._path);
    this.initIntervals();
    this.initBanersPosition(this.intervals);
    this.initBanersPosition(this.realIntervals);
    this.events.subscribe(this.myEvents.getEventKeys().ready, (dif) => {
      this.initIntervals();
      this.initBanersPosition(this.intervals);
      this.initBanersPosition(this.realIntervals);
    });
  }

  constructor(private dragService: DragService,
    private myEvents: MyEvents,
    private events: Events,
    private popoverCtrl: PopoverController,
    private dataSortService: DataSortService,
    private menu: MenuService) {

    events.subscribe(this.myEvents.getEventKeys().timelineDraged, (dif) => {
      for (let i = 0; i < this.intervals.length; i++) {
        this.intervals[i].banerLeft = parseFloat(this.intervals[i].banerLeft) + dif + "px";
      }
      for (let i = 0; i < this.realIntervals.length; i++) {
        this.realIntervals[i].banerLeft = parseFloat(this.realIntervals[i].banerLeft) + dif + "px";
      }
    });

  }

  // public static string elName = "1";
  // public static string planBeg = "56";
  // public static string planEnd = "57";
  // public static string factBeg = "58";
  // public static string factEnd = "59";
  // public static string id = "11";
  // public static string elDescr = "5";
  // public static string elId = "15";
  // public static string typology = "52";
  // public static string produser = "22";
  // public static string priority = "55";
  // public static string pers = "53";
  // public static string path = "24";
  // public static string place = "25";
  // public static string ins = "16";
  // public static string cost = "50";
  // public static string order = "51";
  // public static string speciality = "63";

  private start: string = "";
  private end: string = "";
  private beginTimeDif = 0;
  private duration = 0;
  private cost: string = "";
  private producer: string = "";
  private _path: string = "";
  private repairs: any = [];
  private fullBaner: boolean = false;
  private hourInPixels = (10 / 24) * (document.body.clientWidth / 100);
  private intervals = [];
  private realIntervals = [];
  private durations = [];

  private initBanersPosition(intervals) {
    for (let i in intervals) {
      var timeFromNow = (new Date().getTime() - new Date(intervals[i].start * 1000).getTime()) / (1000 * 3600);
      var left = document.body.clientWidth - timeFromNow * this.hourInPixels + this.dragService.getStartDif() + "px";
      intervals[i].banerLeft = left;

      var duration = (intervals[i].end - intervals[i].start) / 3600;
      var durationInPixels = duration * this.hourInPixels + "px"
      intervals[i].duration = durationInPixels;
    }
  }

  private calculateTimeDif(): void {
    var minDate = this.repairs[0]["56"];
    var maxDate = this.repairs[0]["57"];

    for (let i = 0; i < this.repairs.length; i++) {
      if (this.repairs[i]["56"] < minDate && this.repairs[i]["56"] != null) {
        minDate = this.repairs[i]["56"];
      }
      if (this.repairs[i]["57"] > maxDate && this.repairs[i]["56"] != null) {
        maxDate = this.repairs[i]["57"];
      }
    }
    this.duration = (maxDate - minDate) * 1000;
    this.start = (new Date(minDate * 1000).getDate()) + "." + (new Date(minDate * 1000).getMonth() + 1);
    this.end = (new Date(maxDate * 1000).getDate()) + "." + (new Date(maxDate * 1000).getMonth() + 1);
  }

  private initIntervals(): void {
    let intervals = [];
    let realIntervals = [];

    for (let i = 0; i < this.repairs.length; i++) {
      
      if (this.dataSortService.isRepairMatchesFilters(this.repairs[i])) {
        intervals.push({
          start: this.repairs[i]["56"],
          end: this.repairs[i]["57"],
          banerLeft: "",
          duration: ""
        });

        if (this.repairs[i]["58"] && this.repairs[i]["59"]) {
          realIntervals.push({
            start: this.repairs[i]["58"],
            end: this.repairs[i]["59"],
            banerLeft: "",
            duration: ""
          });
        } else if (this.repairs[i]["58"] && !this.repairs[i]["59"]) {
          realIntervals.push({
            start: this.repairs[i]["58"],
            end: new Date().getTime() / 1000,
            banerLeft: "",
            duration: ""
          });
        }
      }
    }

    this.sortByStart(intervals);
    this.sortByStart(realIntervals);

    this.dataSortService.concatIntervals(intervals);
    this.dataSortService.concatIntervals(realIntervals);

    this.finalSortIntervals(intervals);
    this.finalSortIntervals(realIntervals);

    this.intervals = this.finalSortIntervals(intervals);
    this.realIntervals = this.finalSortIntervals(realIntervals);
  }

  private sortByStart(intervals): void {
    for (let i = 0; i < intervals.length; i++) {
      var minIndex = i;
      for (let j = i; j < intervals.length; j++) {
        if (intervals[j].start < intervals[minIndex].start) {
          minIndex = j;
        }
      }
      var buff = intervals[i];
      intervals[i] = intervals[minIndex];
      intervals[minIndex] = buff;
    }
  }

  private finalSortIntervals(intervals) {
    var buff = [];

    for (let i = 0; i <= intervals.length; i++) {
      if (intervals[i]) {
        if ((new Date().getTime() - intervals[i].end * 1000) <= 10 * 24 * 3600 * 1000) {
          buff.push(intervals[i]);
        }
      }
    }
    return buff;
  }

  private openFullBaner(): void {
    if (this.fullBaner) {
      this.fullBaner = false;
    } else {
      this.fullBaner = true;
    }
  }

  private fillDataToShow(): void {
    var costSum = 0;
    var producerSum = "";
    for (let i = 0; i < this.repairs.length; i++) {
      costSum += this.repairs[i]["50"];
      if (!producerSum.includes(this.repairs[i]["22"])) {
        producerSum += this.repairs[i]["22"] + " ";
      }
    }
    this.cost += (costSum + "р.");
    this.producer = producerSum;
  }
}
