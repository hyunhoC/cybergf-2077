import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

const Chatting = () => {
  const [prompt, setPrompt] = useState(import.meta.env.VITE_INITIAL_PROMPT);
  const [message, setMessage] = useState("");

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const sendChat = async () => {
    const currentTime = formatTime(new Date());
    const template = `
      <div class="mx-2 my-4 flex self-end">
        <div class="mx-2 self-end text-xxs">
          ${currentTime}
        </div>
        <div class="chat-line-mine max-w-216px rounded bg-katalk-mychat p-2 shadow-md">
          ${message}
        </div>
        <div class="chat-triangle-me mt-2 z-10"></div>
      </div>
      `;
    document
      .querySelector(".chat-content")
      ?.insertAdjacentHTML("beforeend", template);

    const chatRequest = prompt + `\nMe: ${message}\nSeo-Ah: `;
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
    setMessage("");

    await fetch("https://api.openai.com/v1/completions", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const reply = result.choices[0].text ?? "";
        const replyTemplate = `
        <div class="flex gap-1">
          <div class="h-10 w-10 rounded-2xl">
            <img
              src="/img/profile.jpeg"
              alt="profile"
              class="h-full w-full rounded-2xl"
            />
          </div>
          <div class="flex flex-col">
            <div class="p-1 ml-1">서아</div>
            <div class="flex">
              <div class="chat-triangle mt-2 z-10"></div>
              <div class="chat-line max-w-216px self-start rounded bg-white p-2 shadow-md">
                ${reply}
              </div>
              <div class="mx-2 self-end text-xxs">
                ${currentTime}
              </div>
            </div>
          </div>
        </div>
        `;
        setPrompt(chatRequest + reply);
        document
          .querySelector(".chat-content")
          ?.insertAdjacentHTML("beforeend", replyTemplate);
      });
  };

  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const formattedTime =
      ampm +
      " " +
      (hours % 12 || 12).toString() +
      ":" +
      (minutes < 10 ? "0" + minutes.toString() : minutes.toString());
    return formattedTime;
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
        <div className="mx-2 my-4 flex self-end">
          <div className="text-xxs z-10 mx-2 self-end">
            {formatTime(new Date())}
          </div>
          <div className="chat-line-mine max-w-52 rounded bg-katalk-mychat p-2 shadow-md">
            안녕
          </div>
          <div className="chat-triangle-me mt-2"></div>
        </div>

        <div className="flex gap-1">
          <div className="h-10 w-10 rounded-2xl">
            <img
              src="/img/profile.jpeg"
              alt="profile"
              className="h-full w-full rounded-2xl"
            />
          </div>
          <div className="flex flex-col">
            <div className="ml-1 p-1">서아</div>
            <div className="flex">
              <div className="chat-triangle z-10 mt-2"></div>
              <div className="chat-line max-w-52 self-start rounded bg-white p-2 shadow-md">
                안녕
              </div>
              <div className="text-xxs mx-2 self-end">
                {formatTime(new Date())}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-box bottom-0 w-full bg-white">
        <form onSubmit={(e) => e.preventDefault()}>
          <textarea
            id="chat"
            name="chat"
            onKeyDown={onEnterPress}
            className="h-18 w-full resize-none px-4 py-2 focus:outline-none"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <div className="flex h-12 w-full items-center justify-between">
            <div className="other-contents"></div>
            <button
              type="submit"
              className="m-2 rounded bg-katalk-mychat py-2 px-4"
              onClick={sendChat}
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
