let defaultOptions = {
  /**
   * The CSS timing function use to apply transition
   */
  timingFunction: "ease-in-out",

  /**
   * The duration of the transition (in milliseconds)
   */
  duration: 500,

  /**
   * Apply some classes to define the default behavior depending on the opening state at first
   */
  openedByDefault: true,
};

export default (element, options) => {
  options = { ...defaultOptions, ...options };
  const opened = ref(options.openedByDefault);

  /**
   * The function which handles the close transition
   * @returns Promise
   */
  const close = () => {
    return new Promise((res) => {
      element.style.height = element.scrollHeight + "px";
      requestAnimationFrame(() => {
        element.style.height = "0";
      });
      opened.value = false;
      res(opened.value);
    });
  };

  /**
   * The function which handles the open transition
   * @returns Promise
   */
  const open = () => {
    return new Promise((res) => {
      element.style.height = element.scrollHeight + "px";
      element.addEventListener("transitionend", function handleTransition() {
        element.style.height = "auto";
        element.removeEventListener("transitionend", handleTransition);
      });
      opened.value = true;
      res(opened.value);
    });
  };

  /**
   * Depending on the current state of the element, will close or open it
   * @returns Promise
   */
  const toggle = () => (opened.value ? close() : open());

  /**
   * Internal method to initialize the HtmlElement
   * @param {*} element HtmlElement
   */
  const initElement = (element) => {
    element.style.height = options.openedByDefault ? "auto" : "0";
    element.style.transition = `height ${options.duration}ms ${options.timingFunction}`;
    element.style.overflow = "hidden";
  };

  /**
   * Recalculate the height of the element
   */
  const refresh = () => {
    element.style.height = opened.value ? "auto" : "0";
  };

  if (!(element instanceof Element)) {
    onMounted(() => {
      element = document.querySelector(element);

      initElement(element);
    });
  } else {
    initElement(element);
  }

  return {
    toggle,
    close,
    open,
    hide: close,
    show: open,
    refresh,
    opened,
  };
};
