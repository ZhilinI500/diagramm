import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { MyEvents } from './myEvents.service';

/**
 * Сервис для получения данных с сервера
 */
@Injectable()
export class DataGetService {
  
  /**
   * Возвращает полные данные, полученные с сервера в виде объекта.
   */
  public getFullData(): object {
    return this.data;
  }

  public setJSON(requestInstance, JSON): void {
    if (requestInstance.readyState == 4) {
      this.JSON = JSON;
    }
  }

  constructor(private events: Events, private myEvents: MyEvents) {
    this.initRequest();
  }

  private JSON: any = "";
  private data: object = {};

  private initRequest(): void {
    // var url = "http://10.11.62.37:8080/diagrammosk/DiagrammOSK/EventsASUTOIR?new=";
    // var url = "http://10.11.13.49/diagrammosk/DiagrammOSK/EventsASUTOIR?new=";
    var url = "assets/data.json";

    var requestInstance = new XMLHttpRequest();
    requestInstance.open('GET', url, true);
    requestInstance.send();

    var thisInst = this;
    requestInstance.onreadystatechange = function () {
      console.log("stateChange: ", requestInstance.readyState);
      if (this.readyState == 4) {
        if (this.statusText == "OK") {
          thisInst.setJSON(this, this.responseText);
          thisInst.initParse();
        } else {
          console.log(this.status + " " + this.statusText);
          alert("Ошибка при загрузке: " + this.status);
        }
      }
    }
  }

  private initParse(): void {
    this.data = JSON.parse(this.JSON);
    console.log("parsed JSON: ", this.data);
    this.events.publish(this.myEvents.getEventKeys().got);
  }
}