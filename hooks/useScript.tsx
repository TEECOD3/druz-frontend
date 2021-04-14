import * as React from "react";

export const useScript = (
  url: string,
  ref: React.RefObject<HTMLDivElement>,
): any => {
  React.useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    if (ref.current) {
      ref.current.appendChild(script);
    }
    const refsCurrent = ref.current;

    return () => {
      refsCurrent?.removeChild(script);
    };
  }, [url, ref]);
};
