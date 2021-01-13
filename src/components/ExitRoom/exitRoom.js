import React, { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';

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
      <IconButton color="secondary">
        <AssignmentReturnIcon /> 
      </IconButton>
    </div>
  );
};

export default PlaySound;
