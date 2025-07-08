import { Provider } from "react-redux";
import store from "@/redux/store";
import MainLayout from "@/components/MainLayout";

import "leaflet/dist/leaflet.css";
import "@/styles/globals.css";
import "@/styles/loading.css";
import "@/styles/lonely-cat.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}
