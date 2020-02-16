import React, { useEffect, useRef } from 'react';

export const useInterval = (callback, delay, playing) => {
    const savedCallback = useRef();
    let timerId;

    // set the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // set up the interval
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        // playing is usually passed by the component calling
        // this hook. should be some state property
        if (playing && delay !== null) {
            timerId = setInterval(tick, delay);
            return () => clearInterval(timerId);
        }
    }, [delay, playing]);

    return timerId;
};
