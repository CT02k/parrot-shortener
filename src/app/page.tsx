"use client"; 

import { useState, useEffect, FormEvent } from "react";

import Image from "next/image";

const parrots = ["/parrot.gif", "/green_parrot.gif"];

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const Message = ({ text, type, onCopy }: { text: string; type: string; onCopy: () => void }) => (
  <div className={`message ${type}`} role="alert">
    {text}
    {type === "success" && (
      <img 
        src="/clipboard.svg" 
        onClick={onCopy} 
        className="w-9 h-auto ml-3 bg-zinc-800 p-2 rounded-lg transition hover:transition hover:bg-zinc-800/75 hover:cursor-pointer" 
        alt="clipboard"
      />
    )}
  </div>
);

export default function Page() {
  const [messageContent, setMessageContent] = useState<{ text: string; type: string }>({ text: "", type: "" });
  const [parrotIndex, setParrotIndex] = useState<number>(0);

  useEffect(() => {
    setParrotIndex(Math.floor(Math.random() * parrots.length));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const url = (form.elements.namedItem("url") as HTMLInputElement).value;

    if (!url || !url.startsWith("http")) {
      setMessageContent({ text: "Invalid URL", type: "error" });
      return;
    }

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const { short } = await response.json();
        setMessageContent({ text: `${window.location.origin}/${short}`, type: "success" });
      } else {
        setMessageContent({ text: "Error shortening URL", type: "error" });
      }
    } catch {
      setMessageContent({ text: "Error shortening URL", type: "error" });
    }
  };

  const handleCopyURL = () => {
    copyToClipboard(messageContent.text);
    setMessageContent({ text: "URL copied", type: "success" });
    setTimeout(() => {
      setMessageContent({ text: `${window.location.origin}/${messageContent.text.split("/").pop()}`, type: "success" });
    }, 1000);
  };
          <Image src={parrots[parrotIndex]} alt="parrot" width={10} height={10} />
  return (
    <div className="content">
      <div className="main">
        <div className="title">
          <Image src={parrots[Math.floor(Math.random() * parrots.length)]} alt="parrot" width={10} height={10} unoptimized />
          <h1>Parrot</h1>
          <Image src={parrots[Math.floor(Math.random() * parrots.length)]} alt="parrot" width={10} height={10} unoptimized />
        </div>
        <form onSubmit={handleSubmit}>
          <input type="url" name="url" placeholder="URL" required />
          <button type="submit">Shorten</button>
        </form>
        {messageContent.text && (
          <Message text={messageContent.text} type={messageContent.type} onCopy={handleCopyURL} />
        )}
      </div>
    </div>
  );
}
