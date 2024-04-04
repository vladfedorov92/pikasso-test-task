import React, { UIEventHandler, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { addQuote, getQuote, getQuoteAction } from "../slices/quoteSlice";
import { RootState } from "../store/store";
import { QuoteData } from "../constans/constans";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import Quote from "./quote";
import quote from "./quote";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const storedData = localStorage.getItem("quoteData");
  const quotes: QuoteData[] = useAppSelector((state: RootState) => state.quote);
  // const [isLoading, setIsLoading] = useState(false);
  // const [startIndex, setStartIndex] = useState(0);
  // const batchSize = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getQuoteAction());
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      dispatch(addQuote(parsedData));
    } else {
      fetchData()
        .then(() => {})
        .catch((error) => {
          console.log(error.message);
        });
    }
    // loadMoreQuotes();
  }, []);

  // const loadMoreQuotes = () => {
  //   if (isLoading) return;
  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     console.log(parsedData)
  //     dispatch(addQuote(parsedData));
  //   }
  //   setIsLoading(true);
  //   const nextBatch: any = quotes.slice(batchSize);
  //   console.log(nextBatch);
  //   dispatch(getQuote(nextBatch));
  //   setStartIndex((prevIndex) => prevIndex + batchSize);
  //   setIsLoading(false);
  // };
  //
  // const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
  //   console.log(event);
  //   const target = event.target as HTMLElement;
  //   const bottom =
  //     target.scrollHeight - target.scrollTop === target.clientHeight;
  //   if (bottom) {
  //     loadMoreQuotes();
  //   }
  // };

  return (
    <div className={"container"}>
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <div
            style={{ height, width, overflow: "auto" }}
            // onScroll={handleScroll}
          >
            <List
              className={"List"}
              height={height}
              itemCount={quotes.length}
              itemSize={50}
              width={width}
            >
              {({ index, style }) => (
                <Quote index={index} style={style} data={quotes} />
              )}
            </List>
          </div>
        )}
      </AutoSizer>
    </div>
  );
};

export default MainPage;
