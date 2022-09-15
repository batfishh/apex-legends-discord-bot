import axios from "axios";
export default class ApexLegendsStatusClient {
  constructor(url, auth) {
    this.apiRequestInstance = axios.create({
      baseURL: url,
      headers: { Authorization: auth },
    });
  }

  async getCurrentMap() {
    let mapApiResponse;
    try {
      mapApiResponse = await this.apiRequestInstance.get("/maprotation");
    } catch (e) {
      return {successs: false}
    }
    return {success : true, msg : mapApiResponse};
  }

  formatMessage(msg) {

    const customMapNames = {
      "worlds_edge_rotation": "DROP FAIDE LOL",
      "kings_canyon_rotation": "Cringe Canyon",
      "storm_point_rotation": "Shit Point"
    }
    const currentMapName = msg?.current?.map;
    const nextMapName = msg?.next?.map;
    const timeleftInSecs = msg?.current?.remainingSecs;
    const timeleftInMins = msg?.current?.remainingMins;
    const res =
      timeleftInMins === 0
        ? `Current map is : ${customMapNames[currentMapName]}\nEnding in ${timeleftInSecs} seconds.\nNext map : ${nextMapName}`
        : `Current map is : ${customMapNames[currentMapName]}\nEnding in ${timeleftInMins} minutes.\nNext map : ${nextMapName}`;
    return res;
  }
}
