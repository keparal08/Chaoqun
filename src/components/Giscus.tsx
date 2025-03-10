import { onMount, createEffect, type Component, createSignal } from "solid-js";
import { useDark } from "solidjs-use";
import { GISCUS } from "@config";

export const Giscus: Component = () => {
  const [isDark] = useDark();
  const [loaded, setLoaded] = createSignal(false); // Add a loaded signal
  const getTheme = () => (isDark() ? GISCUS.dark : GISCUS.light);

  const getScriptElement = (theme: string) => {
    const element = document.createElement("script");

    element.src = "https://giscus.app/client.js"; // Simplified attribute setting
    element.dataset.repo = GISCUS.repo;
    element.dataset.repoId = GISCUS.repoId;
    element.dataset.category = GISCUS.category;
    element.dataset.categoryId = GISCUS.categoryId;
    element.dataset.theme = theme;
    element.dataset.lang = "en";
    element.dataset.mapping = "pathname";
    element.dataset.reactionsEnabled = "1";
    element.dataset.emitMetadata = "0";
    element.crossOrigin = "anonymous";
    element.async = true;

    element.onload = () => setLoaded(true); // Set loaded to true when script loads
    element.onerror = () => console.error("Giscus failed to load"); // Handle errors

    return element;
  };

  const updateGiscus = (theme: string) => {
    if (!loaded()) return; // Only update if Giscus is loaded

    const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
    iframe?.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme,
          },
        },
      },
      "https://giscus.app"
    );
  };

  onMount(() => {
    document.head.appendChild(getScriptElement(getTheme()));
  });

  createEffect(() => updateGiscus(getTheme()));

  return <div class="giscus" />;
};

export default Giscus;