import dotenv from "dotenv";
import Discord, {GatewayIntentBits} from "discord.js";
import ApexLegendsStatusClient from "../apex-legends-status-client/als-client.js"

dotenv.config();

export default class DiscordClient {
  constructor(clientToken) {
    this.apexClient = new ApexLegendsStatusClient(process.env.APEX_BASE_URL, process.env.APEX_API_AUTHKEY)
    this.clientToken = clientToken;
    this.client = new Discord.Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
  }

  async connect() {
    this.client
      .login(this.clientToken)
      .then((success) => {
        console.log("Logged into discord: ", success);
      })
      .catch((err) => {
        console.log("Error in logging into discord : ", err);
      });

    this.client.on("ready", () => {
      console.log(`Discord client ready :  ${this.client.user.tag}!`);
      this.client.user.setActivity("!whichmap", { type: "PLAYING" });
    });
  }

  async monitorMessages() {
    this.client.on("messageCreate", async (msg) => {
      if (msg.content === "!whichmap") {
        const currentMapDetails = await this.apexClient.getCurrentMap()
        const formattedMsg = this.apexClient.formatMessage(currentMapDetails.data)
        msg.reply(formattedMsg)
      }
    });
  }
}
