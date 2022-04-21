import React from "react";

type ContainerRef = React.RefObject<HTMLElement>;

const useClickOutside = (container: ContainerRef, callback: () => void) => {
  const handler = React.useCallback(
    (e: MouseEvent) => {
      if (!container.current?.contains(e.target as Node)) {
        callback();
      }
    },
    [container, callback]
  );

  React.useEffect(() => {
    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  }, [callback, container, handler]);
};

export default useClickOutside;
