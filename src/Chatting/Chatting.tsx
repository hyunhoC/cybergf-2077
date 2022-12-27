import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import ChattingMessage from "./ChattingMessage";

const Chatting = () => {
  const [prompt, setPrompt] = useState(import.meta.env.VITE_INITIAL_PROMPT);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    { message: "안녕", isMyMessage: true },
    { message: "안녕", isMyMessage: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const sendChat = async () => {
    if (isLoading || messageInput.length === 0) {
      return;
    }
    const latestMessages = [
      ...messages,
      { message: messageInput, isMyMessage: true },
    ];
    setMessages(latestMessages);
    setIsLoading(true);

    const chatRequest = prompt + `\nMe: ${messageInput}\nSeo-Ah: `;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(import.meta.env.VITE_OPENAI_API_KEY),
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: chatRequest,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
      }),
    };
    setMessageInput("");

    await fetch("https://api.openai.com/v1/completions", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const reply = result.choices[0].text ?? "";

        setPrompt(chatRequest + reply);
        setMessages([
          ...latestMessages,
          { message: reply, isMyMessage: false },
        ]);
        setIsLoading(false);
      });
  };

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      sendChat();
    }
  };

  return (
    <div className="chat-container relative flex w-96 flex-col text-xs">
      <div className="chat-content m-2 flex grow flex-col overflow-auto">
        {messages.map((message, index) => (
          <ChattingMessage
            key={index}
            message={message.message}
            isMyMessage={message.isMyMessage}
          />
        ))}
      </div>
      <div className="chat-box bottom-0 w-full bg-white">
        <form onSubmit={(e) => e.preventDefault()}>
          <textarea
            id="chat"
            name="chat"
            onKeyDown={onEnterPress}
            className="h-18 w-full resize-none px-4 py-2 focus:outline-none"
            onChange={(e) => setMessageInput(e.target.value)}
            value={messageInput}
            autoFocus
          />
          <div className="flex h-12 w-full items-center justify-between">
            <div className="other-contents"></div>
            <button
              type="submit"
              className="m-2 rounded bg-katalk-mychat py-2 px-4 hover:bg-amber-300 disabled:bg-gray-300 disabled:opacity-30"
              onClick={sendChat}
              disabled={isLoading || messageInput.length === 0}
            >
              전송
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatting;
