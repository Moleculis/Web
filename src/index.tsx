import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./pages/App";
import {Provider} from "react-redux";
import {store} from "./redux/Store";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";

ReactDOM.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <App/>
        </I18nextProvider>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
