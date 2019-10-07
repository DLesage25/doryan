export const metronomeEngine = ({ tickFunc, completeFunc, soundObjects }) => {
    // derivative variables
    let tick_count = 0; //I may need to move this into the scope of start()

    const tick = (obj, repeats, sound) => {
        console.log('tick');
        tick_count += 1;
        if (sound) sound.replayAsync();
        //tickFunc(tick_count); //enable to do something with each tick
        //(change active indicator)
        if (tick_count >= repeats) {
            end_func();
        }
    };

    const tickManager = () => {
        // repeat with the interval of 2 seconds
        let timerId = setInterval(() => tick(this, repeats), interval);

        // after 5 seconds stop
        setTimeout(() => {
            clearInterval(timerId);
            alert('stop');
            return true;
        }, 10000);
    };

    return {
        start: async (tempo, repeats, tickf, donef) => {
            if (tickf) {
                tickFunc = tickf;
            }
            if (donef) {
                end_func = donef;
            }

            tick_count = 0;

            const timeout = 10000; //TODO this should come from outside
            const played = await tickManager(tempo);

            //tick(this, repeats);
        },
        //unused. I can use this to trigger ui changes with each tick
        tickManager: async timeout => {
            //2 iterations per animation * 60000 ms per minute / tempo
            const interval = tempo ? 120000 / tempo : 1000;
            // repeat with the interval of 2 seconds
            let timerId = setInterval(() => tick(this, repeats), interval);

            // after 5 seconds stop
            setTimeout(() => {
                clearInterval(timerId);
                alert('stop');
                return true;
            }, 10000);

            // $('#startstop').click(function() {
            // 	// start animation
            // 	if ($(this).html() === "start") {
            // 		$(this).html("stop");

            // 		//get values for tempo and ticks and restrict
            // 		var tempo = parseInt($('#tempo').val(), 10);
            // 		if (!tempo) { tempo = 60; }
            // 		else if (tempo > 200) { tempo = 200; }
            // 		else if (tempo < 30) { tempo = 30; }
            // 		$("#tempo").val(tempo);

            // 		var ticks = parseInt($('#ticks').val(), 10);
            // 		if (!ticks) { ticks = 20; }
            // 		else if (ticks > 60) { ticks = 60; }
            // 		else if (ticks < 8) { ticks = 8; }
            // 		$("#ticks").val(ticks);

            // 		m.start(tempo, ticks);
            // 	} else {
            // 		$(this).html("start");
            // 		m.stop();
            // 	}
            // });
        },
    };
};
