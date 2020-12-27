import * as React from "react";
import { ToastProvider } from "react-toast-notifications";

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={3000}>
      {children}
    </ToastProvider>
  );
};

export default Provider;
