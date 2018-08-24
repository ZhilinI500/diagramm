import { Input, Component, ViewChildren } from '@angular/core';
import { DragService } from '../../services/drag.service';
import { Events, ModalController } from 'ionic-angular';
import { MyEvents } from '../../services/myEvents.service';
import { BanerComponent } from '../baner/baner';
import { FullBanerComponent } from '../full-baner/full-baner';
import { DataSortService } from '../../services/dataSort.service';

/**
 * Компонент дерева. 
 * Входной параметр дата принимает массив веток дерева.
 * Элемент массива веток содержит id, value, open,
 * и массив следующих такой же структуры (data).
 * Если ветка не продолжается, массив data не содержится.
 */
@Component({
  selector: 'place',
  templateUrl: 'place.html'
})
export class PlaceComponent {

  @Input() set data(val) {
    this._data = val;
    this.initPlateConfig(this._data);

    if (typeof (this._data.data) != undefined) {
      this.treeEnd = false;
    }
  }

  @Input() set treeLvl(val) {
    this._treeLvl = val;
  }

  constructor(public dataSortService: DataSortService, public modalCtrl: ModalController, private dragService: DragService, private events: Events, private myEvents: MyEvents) {
    console.log('Hello PlaceComponent Component');
    setTimeout(() => {//Костыль. Не могу найти более простой способ задать значения после обоих @Input.
      this.initBtns();
      this.cutEmptyBrunches();
    }, 100);

    this.events.subscribe(this.myEvents.getEventKeys().ready, () => {
      setTimeout(() => {//Костыль. Не могу найти более простой способ задать значения после обоих @Input.
        this.initBtns();
        this.cutEmptyBrunches();
      }, 100);
    });

    this.events.subscribe(this.myEvents.getEventKeys().timelineDraged, (val) => {
      for (let i = 0; i < this.baners["length"]; i++) {
        this.maxWidth[i] = this.baners["_results"][i].getLeft() - (5 * this._treeLvl) * (document.body.clientWidth / 100) + "px";
      };
    });
  }

  openFull(i){
    var repairs = this.dataSortService.getSortedRepairData(this._data[i].id);
    let modal = this.modalCtrl.create(FullBanerComponent, {index: this._data[i].index, repairs: repairs});    
    modal.present();
  }
  
  @ViewChildren(BanerComponent)
  private baners: BanerComponent;

  private repairs = [];
  private intervalsAmounts = [];
  private _treeLvl = 0;
  private btnWidth = [];
  private left = this.dragService.startLeft;
  private _data: any;
  private treeEnd: boolean = true;
  private plateConfig: Array<object> = [];
  private maxWidth = [];

  private cutEmptyBrunches(): void {
    if (this.baners) {
      var realIndex = 0;
      for (let i = 0; i < this.baners["length"]; i++) {
        var sum = this.baners["_results"][i]["intervals"].length + this.baners["_results"][i]["realIntervals"].length;
        if (sum == 0) {
          this._data.splice(realIndex, 1);
          --realIndex;
        }
        ++realIndex;
      }
    }
  }

  private initBtns(): void {
    for (let i = 0; i < this._data.length; i++) {
      this.btnWidth.push(25 - (5 * this._treeLvl) + "vw");
    }
    for (let i = 0; i < this.baners["length"]; i++) {
      this.maxWidth.push(this.baners["_results"][i].getLeft() - (5 * this._treeLvl) * (document.body.clientWidth / 100) + "px");
    };
  }

  private initPlateConfig(data) {
    for (let i = 0; i < data.length; i++) {
      this.plateConfig[i] = {
        extended: false,
        label: "+",
        position: "static"
      };
    }
  }

  private changeState(index, inst): void {
    if (this.plateConfig[index]["extended"]) {
      this.plateConfig[index]["extended"] = false;
      this.plateConfig[index]["label"] = "+";
      this.plateConfig[index]["position"] = "static";
      this.btnWidth[index] = 25 - (5 * this._treeLvl) + "vw";
    } else {
      this.plateConfig[index]["extended"] = true;
      this.plateConfig[index]["label"] = "-";
      this.plateConfig[index]["position"] = "relative";
      this.btnWidth[index] = "5vw";
    }
  }
}
