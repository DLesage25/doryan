import * as Haptics from 'expo-haptics';

export const metronomeEngine = ({ tickFunc, completeFunc, soundObjects }) => {
    // derivative variables
    let tickCount = 0;
    let activeTimerId;

    const tick = ({ repeats, accent, vibration, setMetronomeStep }) => {
        const metronomeStep = ((tickCount / 4) % 1) * 4;
        const isAccent = metronomeStep === accent.index;

        //TODO add feature for exchanging metronome sounds
        const soundOn = soundObjects.metronomeOnNote;
        const soundOff = soundObjects.metronomeOffNote;

        if (isAccent) soundOn.replayAsync();
        else soundOff.replayAsync();

        if (vibration)
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        if (tickFunc) tickFunc(tickCount);
        tickCount += 1;

        //multiply by 4 to get round number again
        setMetronomeStep(metronomeStep);
        if (tickCount >= repeats) {
            completeFunc(tickCount);
            activeTimerId = null;
        }
    };

    return {
        tick: config => {
            const { tickf, donef, timerId } = config;
            //reassing functions if needed upon starting metronome
            if (tickf) tickFunc = tickf;
            if (donef) completeFunc = donef;
            if (timerId) activeTimerId = timerId;

            tick(config);
        },

        stop: () => {
            //reset tickCount
            tickCount = 0;
            clearInterval(activeTimerId);
            activeTimerId = null;
        },
    };
};
