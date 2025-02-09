import { onMount, createEffect, createSignal, Show, type Component } from "solid-js";
import { useScroll } from "solidjs-use";
import ToggleDark from "@components/ToggleDark";
import ToggleToc from "@components/ToggleToc";

export const Navbar: Component<{ activePage?: string; hasToc?: boolean }> = (props) => {
  const [isFixed, setIsFixed] = createSignal(false);
  const [isVisible, setIsVisible] = createSignal(false);
  const [navbar, setNavbar] = createSignal<HTMLDivElement>();

  onMount(() => {
    const { y, directions } = useScroll(document);

    createEffect(() => {
      if (directions.top) {
        if (y() > 0 && isFixed()) setIsVisible(true);
        else {
          setIsVisible(false);
          setIsFixed(false);
        }
      } else if (directions.bottom) {
        setIsVisible(false);
        if (y() > (navbar()?.offsetHeight ?? 0)) setIsFixed(true);
      }
    });
  });

  return (
    <header
      ref={setNavbar}
      class={`z-30 w-full h-14 hstack justify-between bg-bg font-ui px-4 md:px-5 ${
        isFixed() && "fixed -top-14 left-0 transition duration-300 border-b"
      } ${isVisible() && "translate-y-full shadow"} ${
        !isFixed() && !isVisible() && "absolute top-0 left-0"
      }`}
    >
      <nav class="hstack gap-x-8"> {/* Increased spacing with gap-x-8 */}
        <a class={`nav-item ${props.activePage === "about" && "nav-active"}`} href="/" aria-label="About">
          <span>About</span>
        </a>

        <a class={`nav-item ${props.activePage === "Curriculum Vitae - Chaoqun Li" && "nav-active"}`} href="/cv" aria-label="CV">
          <span>CV</span>
        </a>
        <a class={`nav-item ${props.activePage === "projects" && "nav-active"}`} href="/projects" aria-label="Projects">
          <span>Projects</span>
        </a>
        <a class={`nav-item ${props.activePage === "posts" && "nav-active"}`} href="/posts" aria-label="Blog">
          <span>Blog</span>
        </a>
        <a class={`nav-item ${props.activePage === "recent" && "nav-active"}`} href="/recent" aria-label="Recent Life">
          <span>Recent Life</span>
        </a>
        <a class={`nav-item ${props.activePage === "comments" && "nav-active"}`} href="/comments" aria-label="Leave Messages">
          <span>Leave Messages</span>
        </a>
        <a class={`nav-item ${props.activePage === "search" && "nav-active"}`} href="/search" aria-label="Search">
          <span i-uil:search />
        </a>

        <ToggleDark />

        <Show when={props.hasToc}>
          <ToggleToc />
        </Show>
      </nav>
    </header>
  );
};

export default Navbar;
