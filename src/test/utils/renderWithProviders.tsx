import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "@features/auth/store/authSlice";
import tripWizardReducer from "@features/trip/add-trip/store/tripWizardSlice";
import { tripsApi } from "@features/trip/store/tripsApi";
import { type RenderOptions, render } from "@testing-library/react";

type TestStoreState = {
  auth?: unknown;
  tripWizard?: unknown;
};

function createTestStore(preloadedState: TestStoreState = {}) {
  return configureStore({
    reducer: combineReducers({
      auth: authReducer,
      tripWizard: tripWizardReducer,
      [tripsApi.reducerPath]: tripsApi.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(tripsApi.middleware),
    preloadedState,
  });
}

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: TestStoreState;
  withRouter?: boolean;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    withRouter = true,
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  const store = createTestStore(preloadedState);

  function Wrapper({ children }: { children: React.ReactNode }) {
    const content = (
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </Provider>
    );
    return withRouter ? <BrowserRouter>{content}</BrowserRouter> : content;
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
