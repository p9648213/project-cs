"use client";

import { useState } from "react";

const Footer = () => {
  const [text, setText] = useState("Hello");

  return (
    <div>
      <span>{text} Footer</span>
      <button onClick={() => setText("Test")}></button>
    </div>
  );
};

export default Footer;
