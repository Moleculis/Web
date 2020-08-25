import React, {useContext, useEffect} from "react";
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
let unsubscribeFromHistory: Unsubscribe;

const StoreListener = <S, MS>(props: StoreListenerProps<S, MS>) => {
    const {children, mapper, listener} = props;

    const {store} = useContext(ReactReduxContext);

    const history = useHistory();

    const unsubscribeFromAll = () => {
        unsubscribeFromState();
        stateObserver = undefined;
        unsubscribeFromHistory();
    }

    useEffect(() => {
        if (!stateObserver) {
            stateObserver = observer(
                mapper,
                listener
            )

            unsubscribeFromState = observe(store, [stateObserver]);

            unsubscribeFromHistory = history.listen(unsubscribeFromAll);
        }
        return unsubscribeFromAll;
    }, [history, listener, mapper, store]);

    return (
        <>
            {children}
        </>
    );
};

export default StoreListener;