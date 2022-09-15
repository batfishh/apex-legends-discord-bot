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
    const currentMapCode = msg?.current?.code;
    const nextMapCode = msg?.next?.code;
    const timeleftInSecs = msg?.current?.remainingSecs;
    const timeleftInMins = msg?.current?.remainingMins;
    const res =
      timeleftInMins === 0
        ? `Current map is : ${customMapNames[currentMapCode]}\nEnding in ${timeleftInSecs} seconds.\nNext map : ${nextMapCode}`
        : `Current map is : ${customMapNames[currentMapCode]}\nEnding in ${timeleftInMins} minutes.\nNext map : ${nextMapCode}`;
    return res;
  }
}
