const ChattingMessage = ({
  message,
  isMyMessage = false,
}: {
  message: string;
  isMyMessage?: boolean;
}) => {
  const formatTime = (date: Date): string => {
    return date.toLocaleString("ko", {
      minute: "numeric",
      hour: "numeric",
      hour12: true,
    });
  };

  if (isMyMessage) {
    return (
      <div className="mx-2 my-4 flex self-end">
        <div className="text-xxs z-10 mx-2 self-end">
          {formatTime(new Date())}
        </div>
        <div className="chat-line-mine max-w-52 rounded bg-katalk-mychat p-2 shadow-md">
          {message}
        </div>
        <div className="chat-triangle-me mt-2"></div>
      </div>
    );
  }

  return (
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
            {message}
          </div>
          <div className="text-xxs mx-2 self-end">{formatTime(new Date())}</div>
        </div>
      </div>
    </div>
  );
};

export default ChattingMessage;