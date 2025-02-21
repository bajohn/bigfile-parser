import React, { useRef, useEffect, useState, type ReactNode } from "react";

interface ScrollableDivProps {
  children: ReactNode;
}

function ScrollableDiv(props: {
  children: ReactNode;
  onScrollChange: (scrollPosition: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);


  const handleScroll = () => {
    if (scrollRef.current) {
      props.onScrollChange(scrollRef.current.scrollTop);
    }
  };

  useEffect(() => {
    const div = scrollRef.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
      return () => {
        div.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div>
      <div
        ref={scrollRef}
        style={{
          width: "100%",
          height: "1000px",
          overflowY: "scroll",
          border: "1px solid black",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "150px",
            width: "95%",
            maxHeight: "100%",
            overflow: "hidden",
            backgroundColor: "gray",
          }}
        >
          {props.children}
        </div>

        <div style={{ height: "20000px", backgroundColor: "gray" }}></div>
      </div>

    </div>
  );
}

export default ScrollableDiv;
