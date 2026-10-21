import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Self-hosted fonts for both worlds, loaded up front so the turn never swaps fonts.
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource-variable/manrope";
import "@fontsource-variable/teko";
import "@fontsource-variable/space-grotesk";

import "./styles/base.css";
import "./styles/casino.css";
import "./styles/festival.css";
import "./styles/scenes.css";
import "./styles/turn.css";
import "./styles/static.css";
import "./styles/scroll.css";

import { Deck } from "./deck/Deck";
import { ScrollDeck } from "./deck/ScrollDeck";
import { Presenter } from "./deck/Presenter";
import { NotesView, PrintView, ReportView } from "./deck/Static";

const params = new URLSearchParams(location.search);
const narrow = matchMedia("(max-width: 820px)").matches;
const view = params.get("view") ?? (narrow ? "read" : "scroll");

const App = () => {
  switch (view) {
    case "print":
      return <PrintView />;
    case "read":
      return <PrintView reading />;
    case "notes":
      return <NotesView />;
    case "report":
      return <ReportView />;
    case "presenter":
      return <Presenter />;
    case "deck":
      return <Deck />;
    default:
      return <ScrollDeck />;
  }
};

document.documentElement.dataset.view = view;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
