import axios from "axios"
export default class ApexLegendsStatusClient {
    constructor(url, auth){
        this.apiRequestInstance = axios.create({
            baseURL: url,
            headers: {'Authorization': auth}
          });
    }

    async getCurrentMap(){
        const mapApiResponse = await this.apiRequestInstance.get("/maprotation", )
        return mapApiResponse
    }

    formatMessage(msg){
        const currentMapName = msg.current.map
        const nextMapName = msg.next.map
        const timeleftInSecs = msg.current.remainingSecs
        const timeleftInMins = msg.current.remainingMins
        const res =  timeleftInMins===0? `Current map is : ${currentMapName}\nEnding in ${timeleftInSecs} seconds.\nNext map : ${nextMapName}` :
        `Current map is : ${currentMapName}\nEnding in ${timeleftInMins} minutes.\nNext map : ${nextMapName}`
        return res
    }  
}