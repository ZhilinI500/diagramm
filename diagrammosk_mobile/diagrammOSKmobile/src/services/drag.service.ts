import { Injectable } from "../../node_modules/@angular/core";
import { MyEvents } from "./myEvents.service";
import { Events } from "../../node_modules/ionic-angular";

@Injectable()
export class DragService{
    
    public drag(instance, distance){
        if((parseInt(instance.left) + distance < -5) && (parseInt(instance.left) + distance > -document.body.clientWidth)){
            instance.left = parseInt(instance.left) + distance + "px";
            this.startDif += distance;
            this.events.publish(this.myEvents.getEventKeys().timelineDraged, distance);
        }
    }

    public getStartDif(): number{
        return this.startDif;
    }

    public startLeft: string = -document.documentElement.clientWidth / 4 + "px";

    constructor(private events: Events, private myEvents: MyEvents){
        
    }

    private startDif: number = 0;
}