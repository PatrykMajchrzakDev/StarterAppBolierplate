import { createLogger, transports, format } from "winston";

// Create a function to generate the base logger with a specific file name
const createBaseLogger = (filename: string) => {
  return createLogger({
    level: "info",
    format: format.combine(
      format.timestamp(), // Add timestamp to logs
      format.errors({ stack: true }), // Include error stack traces
      format.splat(), // Support for string interpolation
      format.json() // Format logs as JSON
    ),
    transports: [
      new transports.File({ filename: "error.log", level: "error" }), // Log errors to error.log
      new transports.File({ filename: `${filename}.log` }), // Log all levels to the specified file
    ],
  });
};

// Add console logging in non-production environments
const addConsoleTransport = (logger: any) => {
  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new transports.Console({
        format: format.simple(), // Use simple format for console logs
      })
    );
  }
};

// Function to create a child logger with specific metadata and an optional filename
export const getLogger = (
  serviceName: string,
  fileName: string = "combined"
) => {
  const logger = createBaseLogger(fileName);

  // Add console transport if needed
  addConsoleTransport(logger);

  // Return a child logger with the service name as metadata
  return logger.child({ defaultMeta: { service: serviceName } });
};
