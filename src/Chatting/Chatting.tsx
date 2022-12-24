import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

const Chatting = () => {
  const [prompt, setPrompt] = useState(import.meta.env.VITE_INITIAL_PROMPT);
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const sendChat = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const chat = formData.get("chat")?.toString() ?? "";
    const template = `<div class="chat-line-mine m-2 self-end rounded bg-katalk-mychat p-2">${chat}</div>`;
    document
      .querySelector(".chat-content")
      ?.insertAdjacentHTML("beforeend", template);

    const chatRequest = prompt + `\nMe: ${chat}\nSeo-Ah: `;
    const response = await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: chatRequest,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
      })
      .then((result) => {
        const reply = result.data.choices[0].text ?? "";
        const replyTemplate = `<div class="chat-line m-2 self-start rounded bg-white p-2">${reply}</div>`;
        setPrompt(chatRequest + reply);
        document
          .querySelector(".chat-content")
          ?.insertAdjacentHTML("beforeend", replyTemplate);
      });
  };

  return (
    <div className="relative flex h-screen w-96 flex-col bg-katalk-bg">
      <div className="chat-content m-2 flex grow flex-col overflow-auto">
        <div className="flex gap-2">
          <div className="h-14 w-14 rounded-3xl bg-black"></div>
          <div className="flex flex-col">
            <div className="pl-1">서아</div>
            <div className="flex">
              <div className="chat-triangle mt-2"></div>
              <div className="chat-line max-w-52 self-start rounded bg-white p-2">
                안녕
              </div>
            </div>
          </div>
        </div>
        <div className="m-2 flex self-end">
          <div className="chat-line-mine max-w-52 rounded bg-katalk-mychat p-2">
            안녕
          </div>
          <div className="chat-triangle-me mt-2"></div>
        </div>
      </div>
      <div className="chat-box bottom-0 w-full bg-white">
        <form onSubmit={sendChat}>
          <textarea
            id="chat"
            name="chat"
            className="h-24 w-full px-4 py-2 focus:outline-none"
          />
          <div className="flex h-12 w-full justify-between">
            <div className="other-contents"></div>
            <button
              type="submit"
              className="m-1 rounded bg-katalk-mychat py-1 px-4"
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
