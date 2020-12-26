import * as React from "react";

const useComponentVisible = (
  initialIsVisible: boolean,
): {
  ref: React.Ref<HTMLDivElement>;
  togglerRef: React.Ref<HTMLDivElement>;
  isComponentVisible: boolean;
  // setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>;
  // toggleVisible: () => void;
} => {
  const [isComponentVisible, setIsComponentVisible] = React.useState<boolean>(
    initialIsVisible,
  );
  const ref = React.useRef<HTMLDivElement>(null);
  const togglerRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      togglerRef.current &&
      !togglerRef.current.contains(event.target as Node)
    ) {
      setIsComponentVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, togglerRef, isComponentVisible };
};

export default useComponentVisible;
