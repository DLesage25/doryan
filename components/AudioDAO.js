import { Audio } from 'expo-av';
import Metronome_active from '../assets/audio/metronome_on_note.wav'

const soundObject = new Audio.Sound();

export const PlayAudio = async (soundURI) => {
    try {
        //TODO - change this reference, assuming I may need formats other
        // than mp3 in the future
        let {
            isLoaded,
            isPlaying,
            isBuffering
        } = await soundObject.getStatusAsync();

        if (!isLoaded) await soundObject.loadAsync(Metronome_active);
        else await soundObject.replayAsync(); //TODO when to use playAsync?

        //if (isLoaded) 
        return true;
        // Your sound is playing!
      } catch (error) {
          console.log(`Error when playing audio ${error}`)
        return false;
        // An error occurred!
      }
}