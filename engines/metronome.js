export const metronomeEngine = ({ tickFunc, completeFunc, soundObjects }) => {
    // derivative variables
    let tickCount = 0; //I may need to move this into the scope of start()
    let timerId;

    const tick = (obj, repeats, sound) => {
        tickCount += 1;
        if (sound) sound.replayAsync();
        //by default, we just log each tick
        tickFunc(tickCount);
        if (tickCount >= repeats) {
            completeFunc(tickCount);
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

        // once timeout is hit, stop
        setTimeout(() => {
            clearInterval(timerId);
            timerId = false;
            alert('stop');
            return true;
        }, timeout);
    };

    return {
        start: async (tempo, repeats, tickf, donef) => {
            //TODO should this come from outside?
            repeats = 30;

            //easily reassing functions if needed upon starting metronome
            if (tickf) tickFunc = tickf;
            if (donef) completeFunc = donef;

            //reset tickCount
            tickCount = 0;

            const timeout = 10000; //TODO this should come from outside
            return tickManager(tempo, timeout, repeats);
        },
    };
};
