import { createRoot } from "react-dom/client";
import Chatting from "./Chatting/Chatting";

const App = () => {
  return (
    <div className="flex h-screen w-screen justify-center bg-black">
      <Chatting />
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
