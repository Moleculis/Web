import React from "react";
import {useTranslation} from "react-i18next";

const LoadingComponent = () => {
    const {t} = useTranslation();
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            {`${t("loading")}...`}
        </div>
    );
};

export default LoadingComponent;