export class MyEvents{
    /**
     * got: "DATA_GOT";
     * ready: "DATA_READY";
     * timelineDraged: "TIMELINE_DRAGED"
     */
    public getEventKeys():any {
        return this.eventKeys;
    }
    
    constructor(){
    }

    private eventKeys = {
        got: "DATA_GOT",
        ready: "DATA_READY",
        timelineDraged: "TIMELINE_DRAGED"
    }
}