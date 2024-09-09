import Toast from "react-native-toast-message";

/**
 * Display an error message using react-native-toast-message.
 * @param {string} errorMessage - The error message to display in the toast.
 */
export const showErrorToast = (errorMessage) => {
  console.log("in showErrorToast === ", errorMessage);
  Toast.show({
    type: "error",
    text1: "Error",
    text2: errorMessage || "An unknown error occurred",
    visibilityTime: 4000, // 4 seconds
    position: "top", // You can change to 'bottom'
  });
};
