import React, {useContext} from "react";
import {Dispatcher, Mapper, observe, observer, Observer} from "redux-observers";
import {Unsubscribe} from "redux-observers/types/redux";
import {ReactReduxContext} from "react-redux";
import {useHistory} from "react-router-dom";

interface StoreListenerProps<S, MS> {
    children: React.ReactNode,
    mapper: Mapper<S, MS>,
    listener: Dispatcher<MS>,
}

let stateObserver: Observer | undefined;
let unsubscribeFromState: Unsubscribe;

const StoreListener = <S, MS>(props: StoreListenerProps<S, MS>) => {
    const {children, mapper, listener} = props;

    const {store} = useContext(ReactReduxContext);

    const history = useHistory();
    if (!stateObserver) {
        stateObserver = observer(
            mapper,
            listener
        )

        unsubscribeFromState = observe(store, [stateObserver]);

        const unsubscribeFromHistory = history.listen(() => {
            unsubscribeFromState();
            stateObserver = undefined;
            unsubscribeFromHistory();
        });
    }

    return (
        <>
            {children}
        </>
    );
};

export default StoreListener;