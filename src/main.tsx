import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

document.addEventListener("click", (e) => {
  const anchor = (e.target as HTMLElement).closest?.("a[href*='wa.me']");
  if (anchor) {
    window.parent.postMessage({ type: "whatsapp_click" }, "*");
  }
});

createRoot(document.getElementById("root")!).render(<App />);
