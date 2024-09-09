/**
 * Centralized error handler for React Native apps, capable of handling
 * various types of errors, including promises, syntax, API requests, and more.
 * @param {Error | any} error - The error object or any thrown value
 * @returns {string} - The user-friendly error message
 */
export const getErrorMessage = (error) => {
  // Handle unknown error
  if (!error) {
    return "An unknown error occurred.";
  }

  // Handle standard JavaScript errors (Error object)
  if (error instanceof Error) {
    // For known JavaScript errors like TypeError, SyntaxError, ReferenceError
    if (error instanceof TypeError) {
      return `Type Error: ${error.message}`;
    }
    if (error instanceof SyntaxError) {
      return `Syntax Error: ${error.message}`;
    }
    if (error instanceof ReferenceError) {
      return `Reference Error: ${error.message}`;
    }
    if (error instanceof RangeError) {
      return `Range Error: ${error.message}`;
    }

    // Default Error case
    return error.message || "An error occurred.";
  }

  // Handle network/API request errors (Axios or fetch)
  if (error.response) {
    const { data, status, statusText } = error.response;

    if (data && typeof data === "object") {
      return (
        data.message || `Request failed with status ${status}: ${statusText}`
      );
    }

    return `Request failed with status ${status}: ${statusText}`;
  }

  // Handle promise rejections (async/await)
  if (error instanceof Promise) {
    return "Unhandled Promise Rejection.";
  }

  // Handle custom string-based or object errors
  if (typeof error === "string") {
    return error;
  }

  // Handle thrown objects or any other unhandled case
  try {
    return JSON.stringify(error);
  } catch (e) {
    return "An unknown error occurred.";
  }
};
