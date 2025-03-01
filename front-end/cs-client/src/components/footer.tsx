"use client";

import { useState } from "react";
import { Button } from "./ui/button";

const Footer = () => {
  const [text, setText] = useState("Hello");

  return (
    <footer>
      <span className="text-white">{text} Footer</span>
      <Button variant="secondary" onClick={() => setText("test")}>
        Set text
      </Button>
    </footer>
  );
};

export default Footer;
