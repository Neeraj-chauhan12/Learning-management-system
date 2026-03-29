import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "../features/api/authApi";
import { courseApi } from "../features/api/courseApi";

export const appstore = configureStore({
  // Define your reducers here

  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware,courseApi.middleware),
});

const initializeApp = async () => {
  await appstore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();

// const initializeApp2 = async () => {
//   await appstore.dispatch(
//     authApi.endpoints.login.initiate({}, { forceRefetch: true })
//   );
// };
// initializeApp2();