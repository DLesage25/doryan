# Doryan

<img src="https://github.com/DLesage25/doryan/blob/master/assets/images/logo2.png" width="150" alt="accessibility text">

Doryan is a React-Native-based utility mobile app for musicians. Currently under development.

### Features

-   Multi track looper that allows for recording an infinite amount of tracks, setting volume, and playing/pausing individually
-   Metronome with custom swing configurations, which can also be played on other bluetooth devices

### Still Missing

-   Chord composer: Module that allows users to build chord progressions on the fly using a determined mode.
-   Better multitrack looper control: Users should be able to export their tracks individually, and trim their tracks while on the app.
-   Educational content: I would want Doryan to contain a section for chords/scale references, modes, and composition.

### To Install

Running this project locally is fairly easy, considering it was bundled with [Expo](https://expo.io/).
Clone the repo, and `npm i` followed by `npm start`.

Once the metro bundler is running, press I to run using a device simulator or scan the barcode to run in a real device. The project has been developed iOS first for now, although I do have plans on working on an Android version soon.

### Next Steps

1. Fix navigation. Remove bottom pane and replace for hamburguer menu.
2. Add new utility page with buttons to select smaller utility tools
   2a. Determine BPM of a track (http://joesul.li/van/beat-detection-using-web-audio/)
   2b. Determine tonality of a track
