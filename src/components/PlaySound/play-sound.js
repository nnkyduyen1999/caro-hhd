import React, { useState, useEffect } from "react";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import { IconButton } from "@material-ui/core";

const PlaySound = (props) => {
  // const link = 'http://streaming.tdiradio.com:8000/house.mp3'
  const link =
    "https://drive.google.com/file/d/1_dZ6egJJ138QwbAYIkyMwlvcwYFRCLKN/view?usp=sharing";
  const [audio] = useState(new Audio(link));
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    audio.load();
  }, [audio]);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing]);

  return (
    <div>
      <IconButton color="primary" onClick={() => setPlaying(!playing)}>
        {playing ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </IconButton>
    </div>
  );
};

export default PlaySound;
