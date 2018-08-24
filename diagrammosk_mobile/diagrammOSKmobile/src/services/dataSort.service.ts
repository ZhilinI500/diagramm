import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { DataGetService } from './dataGet.service';
import { MyEvents } from './myEvents.service';
import { MenuService } from './menu.service';

/**
 * Сервис для получения отсортированных данных
 */
@Injectable()
export class DataSortService {

	/**
	 * Возвращает полный массив всех веток дерева цехов, начиная с корня.
	 * Нужно для построения вкладок цехов.
	 */
  public getDataForTree(): any {
    var returnVal = [];
    var data = this.getPreSortData();

    // console.log("presorted: ", data);
    for (let i = 0; i < data.length; i++) {
      if (this.menu.gildFilters.indexOf(data[i]["index"]) != -1) {
        returnVal.push({
          data: data[i]["tree"]["data"],
          id: data[i]["tree"]["id"],
          open: data[i]["tree"]["open"],
          value: data[i]["tree"]["value"],
          index: data[i]["index"]
        });
      }
    }

    return returnVal;
  }

	/**
	 * Возвращает массив ремонтов удовлетворяющих пути, переданному в параметре.
	 * Если параметр отсутствует, то возвращает полный список.
	 * @param path Необязателен. Путь размещения ремонта. Формат строки - id из дерева.
	 */
  public getSortedRepairData(path?: string) {
    // console.log("Полученный путь: ", "|" + path + "|");
    var data = this.getPreSortData();
    var repairData = [];
    if (path) {
      repairData = this.getRepairDataByPath(data, path);
    } else {
      repairData = this.getRepairData(data);
    }
    // console.log("sorted init: ", repairData);
    return repairData;
  }

	/**
	 * Возвращает данные, подготовленные к сортировке.
	 */
  public getPreSortData(): any {
    return this.presortedData;
  }
	/**
	 * Объеденяет пересекающиеся промежутки.
	 * @param intervals Массив промежутков, состоящий из объектов {start, end}
	 */
  public concatIntervals(intervals): void {
    for (let i = 0; i < intervals.length; i++) {
      if (intervals[i]) {
        for (let j = i + 1; j < intervals.length; j++) {
          if (intervals[j]) {
            if ((intervals[j].start >= intervals[i].start) && (intervals[j].end <= intervals[i].end)) {
              delete intervals[j];
            } else if ((intervals[j].start < intervals[i].start) && (intervals[j].end > intervals[i].end)) {
              intervals[i].start = intervals[j].start;
              intervals[i].end = intervals[j].end;
              delete intervals[j];
            } else if ((intervals[j].start < intervals[i].start) && (intervals[j].end > intervals[i].start)) {
              intervals[i].start = intervals[j].start;
              delete intervals[j];
            } else if ((intervals[j].end > intervals[i].end) && (intervals[j].start < intervals[i].end)) {
              intervals[i].end = intervals[j].end;
              delete intervals[j];
            }
          }
        }
      }
    }
  }

  public isRepairMatchesFilters(repair): boolean {
    return (this.menu.producerFilters.indexOf(repair["22"]) != -1) &&
           (this.menu.typologyFilters.indexOf(repair["52"] + "") != -1)
  }

  public dataIsValid: boolean = false;

  constructor(private myEvents: MyEvents,
    private dataGetService: DataGetService,
    private events: Events,
    private menu: MenuService) {

    events.subscribe(this.myEvents.getEventKeys().got, () => {
      console.log("DATA_GOT");
      this.dataIsValid = true;
      this.refreshData();
      this.events.publish(this.myEvents.getEventKeys().ready);
    });
  }

  private fullData = {};
  private presortedData = [];

  private refreshData(): void {
    this.fullData = this.dataGetService.getFullData();
    this.presortedData = this.presortData();
  }

  private getRepairData(_data) {
    var data = _data;
    var returnData = [];
    for (let i = 0; i < data.length; i++) {
      for (let j in data[i].init) {
        if ((data[i].init[j]["58"] * 1000) > (new Date().getTime() - 10 * 24 * 3600 * 1000))
          data[i].init[j]["id"] = j;
        returnData.push(data[i].init[j]);
      }
    }
    return returnData;
  }

  private getRepairDataByPath(_data, path) {
    var data = _data;
    var returnData = [];

    for (let i = 0; i < data.length; i++) {
      for (let j in data[i].init) {
        var pathStr = "";
        for (let k = 0; k < data[i].init[j]["24"].length; k++) {
          pathStr += (data[i].init[j]["24"][k] + " @#& ");
        }
        pathStr += (data[i].init[j]["25"] + "/ " + data[i].init[j]["1"] + "/" + j);
        data[i].init[j]["id"] = j;
        data[i].init[j]["path"] = pathStr;
        if (pathStr.includes(path)) {
          returnData.push(data[i].init[j]);
        }
      }
    }
    return returnData;
  }

  private presortData(): any {
    var data = this.fullData;
    if (this.dataIsValid) {
      var dataBuff = []
      for (let index in data["data"]) {
        data["data"][index]["index"] = index;
        dataBuff.push(data["data"][index]);
      }

      return dataBuff;
    } else {
      return [];
    }
  }
}