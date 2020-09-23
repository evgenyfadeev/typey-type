import React, { Component } from 'react';
import { Howl } from 'howler';
import { IconMetronome } from './Icon';
import plink from '../sounds/digi_plink-with-silence.mp3';

function bpmBracketsSprite() {
  let spriteObj = {};
  for (let bpm = 10; bpm <= 360; bpm += 10) {
    spriteObj[playId(bpm)] = [0, 60000 / bpm];
  }
  return spriteObj;
}

const sound = new Howl({
  src: plink,
  loop: true,
  sprite: bpmBracketsSprite()
});

function playMetronome(options) {
  let id = 'bpm60';
  if (options && options.id) {
    id = options.id;
  }
  if (!sound.playing()) {
    sound.play(id);
  }
}

function stopMetronome() {
  sound.stop();
}

function playId(beatsPerMinute) {
  if (!(beatsPerMinute)) {
    beatsPerMinute = 10;
  }
  let bpmBracket = (Math.min(Math.floor(Math.abs(beatsPerMinute) / 10), 36) + 1) * 10;
  return `bpm${bpmBracket}`
}

class Metronome extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.userSettings && prevProps.userSettings.beatsPerMinute !== this.props.userSettings.beatsPerMinute && sound.playing()) {
      stopMetronome();
      playMetronome({id: playId(this.props.userSettings.beatsPerMinute)});
    }
  }

  componentWillUnmount() {
    stopMetronome();
  }

  render() {
    return (
      <p>
        <button aria-label="Start metronome" className="button button--secondary mr2" onClick={() => playMetronome({id: playId(this.props.userSettings.beatsPerMinute)})}><IconMetronome role="presentation" iconWidth="24" iconHeight="24" className="svg-icon-wrapper svg-baseline" title="Metronome" /> Start</button>
        <button aria-label="Stop metronome" className="button button--secondary" onClick={() => stopMetronome()}><IconMetronome role="presentation" iconWidth="24" iconHeight="24" className="svg-icon-wrapper svg-baseline" title="Metronome" /> Stop</button>
      </p>
    );
  }
}

export default Metronome;