import { CronJob } from "cron";
import { main } from "./main";

new CronJob("0 * * * *", () => {
  main();
}).start();
