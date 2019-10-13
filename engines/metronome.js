export const metronomeEngine = ({ tickFunc, completeFunc, soundObjects }) => {
    // derivative variables
    let tickCount = 0;
    let timerId;

    const tick = ({ repeats, accent, setMetronomeStep }) => {
        const metronomeStep = (tickCount / 4) % 1;
        const isAccent = metronomeStep === accent.index;

        //TODO add dynamic metronome sound depending on accent
        const soundOn = soundObjects.metronomeOnNote;
        const soundOff = soundObjects.metronomeOffNote;

        if (isAccent) soundOn.replayAsync();
        else soundOff.replayAsync();

        if (tickFunc) tickFunc(tickCount);
        tickCount += 1;

        //multiply by 4 to get round number again
        setMetronomeStep(metronomeStep * 4);
        if (tickCount >= repeats) {
            completeFunc(tickCount);
            clearInterval(timerId);
            timerId = false;
        }
    };

    const tickManager = async (config, timeout) => {
        const { tempo } = config;
        //2 iterations per animation * 60000 ms per minute / tempo
        const interval = tempo ? 120000 / tempo / 2 : 1000;

        timerId = setInterval(() => tick(config), interval);

        // TODO remove this once fully tested
        // a metronome shouldnt stop ever :)
        setTimeout(() => {
            clearInterval(timerId);
            timerId = false;
            alert('stopped by timeout');
            return true;
        }, timeout);
    };

    return {
        start: async config => {
            const { tickf, donef } = config;
            //reassing functions if needed upon starting metronome
            if (tickf) tickFunc = tickf;
            if (donef) completeFunc = donef;

            //reset tickCount
            tickCount = 0;

            //safety timeout in case something fails with tick()
            const timeout = 2000000;
            return tickManager(config, timeout);
        },
    };
};
