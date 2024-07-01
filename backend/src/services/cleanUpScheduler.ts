import cron from "node-cron";
import { cleanUpExpiredTokens } from "@/utils/cleanUpExpiredTokens";
import { getLogger } from "@/utils/logger";

// Schedule the cleanup function to run every 2 hours starting at midnight
// To run every minute "* * * * *"
// To run every 2 hours "0 */2 * * *"
cron.schedule("0 */4 * * *", () => {
  cleanUpExpiredTokens("database-token-cleanup")
    .then(() =>
      getLogger("database-token-cleanup").info(
        "Scheduled token cleanup complete"
      )
    )
    .catch((e) => {
      getLogger("database-token-cleanup").error("Scheduled cleanup error:", e);
    });
});
