import React from "react";

interface TextFieldControls {
  current: string;
  set: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clear: () => void;
}

const useTextField = (initialValue?: string): TextFieldControls => {
  const [value, setValue] = React.useState<string>(initialValue || "");

  const set = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setValue(e.target.value);
    },
    []
  );

  const clear = React.useCallback((): void => {
    setValue("");
  }, []);

  return {
    current: value,
    set,
    clear,
  };
};

export default useTextField;
