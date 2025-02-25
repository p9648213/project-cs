"use client";

import { useState } from "react";
import { Button } from "./ui/button";

const Footer = () => {
  const [text, setText] = useState("Hello");

  return (
    <div>
      <span className="text-blue-500">{text} Footer</span>
      <Button variant="secondary" onClick={() => setText("test")}>
        Set text
      </Button>
    </div>
  );
};

export default Footer;
