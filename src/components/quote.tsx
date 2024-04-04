import React from "react";
import { ListChildComponentProps } from "react-window";
import { useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/store";

const Quote: React.FC<ListChildComponentProps> = ({ style, index, data }) => {
  const quote = data[index];
  return (
    <div style={style} className={"quoteBox"}>
      <div className={"quotePart"}>
        <p>{quote.id}</p>
      </div>
      <div className={"quotePart"}>
        <p>{quote.name}</p>
      </div>
      <div className={"quotePart"}>
        <p>{quote.body}</p>
      </div>
      <div className={"quotePart"}>
        <button>Перейти</button>
      </div>
    </div>
  );
};

export default Quote;
