"use client";
import React from "react";
import TypeWriter from "typewriter-effect";

type Props = {};

const TypeWriterTitle = (props: Props) => {
  return (
    <div className="text-center mt-5">
      <TypeWriter
        options={{
          loop: true,
        }}
        onInit={(typeWriter) => {
          typeWriter
            .typeString(`🚀 Supercharge your productivity.`)
            .pauseFor(1000)
            .deleteAll()
            .typeString(`🤖 AI powered.`)
            .pauseFor(1000)
            .deleteAll()
            .typeString(`🗒️ Take notes with your voice.`)
            .start();
        }}
      />
    </div>
  );
};

export default TypeWriterTitle;
