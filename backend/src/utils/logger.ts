import { createLogger, transports, format } from "winston";

// Create the base logger with common configuration
export const baseLogger = createLogger({
  level: "info",

  // Define the log format
  format: format.combine(
    format.timestamp(), // Add timestamp to logs
    format.errors({ stack: true }), // Include error stack traces
    format.splat(), // Support for string interpolation
    format.json() // Format logs as JSON
  ),
  // Define where to save the log files
  transports: [
    new transports.File({ filename: "error.log", level: "error" }), // Log errors to error.log
    new transports.File({ filename: "combined.log" }), // Log all levels to combined.log
  ],
});

// Add console logging in non-production environments
if (process.env.NODE_ENV !== "production") {
  baseLogger.add(
    new transports.Console({
      format: format.simple(), // Use simple format for console logs
    })
  );
}

// Function to create a child logger with specific metadata
export const getLogger = (serviceName: string) => {
  // Return a child logger with the service name as metadata
  return baseLogger.child({ defaultMeta: { service: serviceName } });
};
