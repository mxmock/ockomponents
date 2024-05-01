import components from "./components";
import ReactDOM, { hydrateRoot } from "react-dom/client";

const ENVS = { DEV: "development", PROD: "production" };

const main = () => {
  for (let component of components) {
    injectInHtml(component.id, component.Content);
  }
};

const injectInHtml = async (id, Component) => {
  const html = document.getElementById(id);
  if (!html) return;
  const data = getHtmlData(html, id);
  const jsx = <Component {...data} />;
  handleRoot(html, jsx);
};

const handleRoot = (html, jsx) => {
  if (process?.env?.NODE_ENV === ENVS.PROD) {
    console.log(`Hydrating root ${html.id}...`);
    hydrateRoot(html, jsx);
  } else {
    console.log(`Injecting root ${html.id}...`);
    ReactDOM.createRoot(html).render(jsx);
  }
};

const getHtmlData = (domEl, id) => {
  const json = domEl.getAttribute(`data-${id}`);
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error(`Can't parse ${json}`, e.message);
    return null;
  }
};

window.addEventListener("load", main);
