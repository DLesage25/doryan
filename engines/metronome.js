export const metronomeEngine = ({ tickFunc, completeFunc, soundObjects }) => {
    // derivative variables
    let tickCount = 0;
    let timerId;

    const tick = (obj, repeats, sound) => {
        if (sound) sound.replayAsync();
        if(tickFunc) tickFunc(tickCount);

        tickCount += 1;
        if (tickCount >= repeats) {
            completeFunc(tickCount);
            clearInterval(timerId);
            timerId = false;
        }
    };

    const tickManager = async (tempo, timeout, repeats) => {
        //2 iterations per animation * 60000 ms per minute / tempo
        const interval = tempo ? 120000 / tempo / 2 : 1000;

        //TODO add dynamic metronome sound depending on accent
        timerId = setInterval(
            () => tick(this, repeats, soundObjects.metronomeOnNote),
            interval
        );

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
        start: async ({tempo, repeats, tickf, donef}) => {
            //reassing functions if needed upon starting metronome
            if (tickf) tickFunc = tickf;
            if (donef) completeFunc = donef;

            //reset tickCount
            tickCount = 0;

            //safety timeout in case something fails with tick()
            const timeout = 2000000;
            return tickManager(tempo, timeout, repeats);
        },
    };
};
