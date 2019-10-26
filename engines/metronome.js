import * as Haptics from 'expo-haptics';

export const metronomeEngine = ({ tickFunc, completeFunc, soundObjects }) => {
    // derivative variables
    let tickCount = 0;
    let timerId;
    let toggleFunc;

    const tick = ({ repeats, accent, vibration, setMetronomeStep }) => {
        const metronomeStep = ((tickCount / 4) % 1) * 4;
        const isAccent = metronomeStep === accent.index;

        //TODO add dynamic metronome sound depending on accent
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
            clearInterval(timerId);
            timerId = false;
        }
    };

    const tickManager = async config => {
        const { tempo } = config;
        //2 iterations per animation * 60000 ms per minute / tempo
        const interval = tempo ? 120000 / tempo / 2 : 1000;

        timerId = setInterval(() => tick(config), interval);
    };

    return {
        start: config => {
            const { tickf, donef, togglePlay } = config;
            //reassing functions if needed upon starting metronome
            if (tickf) tickFunc = tickf;
            if (donef) completeFunc = donef;
            if (togglePlay) toggleFunc = togglePlay;

            //reset tickCount
            tickCount = 0;

            toggleFunc();
            return tickManager(config);
        },
        stop: () => {
            toggleFunc();
            clearInterval(timerId);
            timerId = false;
        },
    };
};
