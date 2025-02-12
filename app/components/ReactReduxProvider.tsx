"use client";

/* Core */
import { Provider } from "react-redux";

/* Instruments */
import store from "@/app/lib/store";

export const ReactReduxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Provider store={store}>{children}</Provider>;
};
