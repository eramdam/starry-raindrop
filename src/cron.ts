import "dotenv/config";
import { CronJob } from "cron";
import { main } from "./main.js";

console.log("Starting cron");
new CronJob("0 * * * *", () => {
  main();
}).start();
