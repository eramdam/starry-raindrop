import { CronJob } from "cron";
import { main } from "./main";

new CronJob("* */10 * * * *", () => {
  main();
}).start();
