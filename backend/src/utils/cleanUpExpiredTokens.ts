import { PrismaClient } from "@prisma/client";
import { getLogger } from "@/utils/logger";

const prisma = new PrismaClient();

// This function is made so server periodically removes email verification
// and password reset tokens
export const cleanUpExpiredTokens = async (serviceName: string) => {
  // Fn used for loggin reset action
  const logger = getLogger(serviceName);
  const now = new Date();
  try {
    // Delete rows password rows with date older than now
    const passwordResetResult = await prisma.passwordReset.deleteMany({
      where: {
        tokenExpiresAt: {
          lt: now,
        },
      },
    });

    // Delete email verification rows with date older than now
    const emailVerificationResult = await prisma.emailVerification.deleteMany({
      where: {
        tokenExpiresAt: {
          lt: now,
        },
      },
    });

    // log info to readme file
    logger.info(
      `[${serviceName}] Expired password reset tokens cleaned up: ${passwordResetResult.count}`
    );
    logger.info(
      `[${serviceName}] Expired email verification tokens cleaned up: ${emailVerificationResult.count}`
    );
  } catch (error) {
    logger.error(`[${serviceName}] Error during token cleanup:`, error);

    // Re-throw the error to  stop further execution
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Clean up expired tokens immediately on startup
// cleanUpExpiredTokens("InitialCleanup")
//   .then(() => getLogger("InitialCleanup").info("Initial cleanup complete"))
//   .catch((e) => {
//     getLogger("InitialCleanup").error("Initial cleanup error:", e);
//   });
