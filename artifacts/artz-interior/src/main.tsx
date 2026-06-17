import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const head = document.head;

const setMeta = (name: string, content: string, prop?: boolean) => {
  const sel = prop
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  let el = head.querySelector<HTMLMetaElement>(sel);
  if (!el) {
    el = document.createElement("meta");
    prop ? el.setAttribute("property", name) : el.setAttribute("name", name);
    head.appendChild(el);
  }
  el.setAttribute("content", content);
};

document.title = "Art Interiorz — Best Interior Designer in Nagpur";

setMeta(
  "description",
  "Art Interiorz is a full-service interior design studio in Nagpur offering residential design, modular kitchens, renovation, hospitality and turnkey projects since 2017."
);
setMeta("keywords", "interior designer nagpur, best interior designer nagpur, modular kitchen nagpur, home interior design nagpur, art interiorz");
setMeta("author", "Art Interiorz");
setMeta("robots", "index, follow");

setMeta("og:type", "website", true);
setMeta("og:title", "Art Interiorz — Best Interior Designer in Nagpur", true);
setMeta("og:description", "Full-service interior design studio in Nagpur. Residential, hospitality, modular kitchens & turnkey projects.", true);
setMeta("og:url", "https://artinteriorz.com", true);
setMeta("og:image", "/opengraph.jpg", true);

setMeta("twitter:card", "summary_large_image");
setMeta("twitter:title", "Art Interiorz — Best Interior Designer in Nagpur");
setMeta("twitter:description", "Full-service interior design studio in Nagpur since 2017.");

const link = document.createElement("link");
link.rel = "canonical";
link.href = "https://artinteriorz.com";
head.appendChild(link);

createRoot(document.getElementById("root")!).render(<App />);
