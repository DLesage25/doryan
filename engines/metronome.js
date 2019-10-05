export const metronomeEngine = ({tickFunc, completeFunc, playSound, onNoteSound, offNoteSounds}) => {
    // derivative variables
    let tick_count = 0;

    const tick = (obj, repeats) => { 
        console.log('tick')     
        tick_count += 1;
        if (playSound) {    
            // document.getElementById("tick").play();
            playSound(onNoteSound);
        }
        //tickFunc(tick_count); //enable to do something with each tick 
        //(change active indicator)
        if (tick_count >= repeats) {
            end_func();
        }    
    }    

    return {
        start: (tempo, repeats, tickf, donef) => {
            if (tickf) {
                tickFunc = tickf;
            }
            if (donef) {
                end_func = donef;
            }
            
            tick_count = 0;

            //2 iterations per animation * 60000 ms per minute / tempo
            const interval = tempo ? ( 120000 / tempo ) : 1000;

            // console.log({tempo})

            // repeat with the interval of 2 seconds
            let timerId = setInterval(() => tick(this, repeats), interval);

            // after 5 seconds stop
            setTimeout(() => { clearInterval(timerId); alert('stop'); }, 10000);

            //tick(this, repeats); 
        },
        //unused. I can use this to trigger ui changes with each tick
        make_input: function(el) {
        	
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
        }
    }
};
