import { createRoot } from "react-dom/client";
import Chatting from "./Chatting/Chatting";

const App = () => {
  return (
    <div className="app-container flex h-screen w-screen items-center justify-center">
      <Chatting />
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
