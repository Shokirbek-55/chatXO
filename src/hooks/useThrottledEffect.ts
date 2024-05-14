import { useState, useEffect, useRef } from "react";

const useThrottledEffect = (callback, delay, deps: any[] = []) => {
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(
      function () {
        if (Date.now() - lastRan.current >= delay) {
          callback();
          lastRan.current = Date.now();
        }
      },
      delay - (Date.now() - lastRan.current),
    );

    return () => {
      clearTimeout(handler);
    };
  }, [delay, ...deps]);
};

function debounce(func, wait, immediate) {
  var timeout;
  return function (this: any) {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const useInfiniteScroll = (callback: () => void, outerDiv) => {
  const [isFetching, setIsFetching] = useState(false);
  const stop = useRef<boolean>(false);

  useThrottledEffect(() => {
    // mounts window listener and call debounceScroll, once in every 500ms
    outerDiv.current.addEventListener("scroll", debounceScroll());
    return () =>
      outerDiv.current.removeEventListener("scroll", debounceScroll());
  }, 500);

  useThrottledEffect(
    // execute callback when isFetching becomes true, once in every 500ms
    () => {
      if (!isFetching) {
        return;
      } else {
        // Execute the fetch more data function
        callback();
      }
    },
    500,
    [isFetching],
  );

  function handleScroll() {
    if (
      outerDiv.current.scrollTop >=
        Math.floor(outerDiv.current.clientHeight * 0.75) ||
      isFetching
    )
      // return if below 75% scroll or isFetching is false then don't do anything
      return;
    // if stop (meaning last page) then don't set isFetching true
    if (!stop.current) setIsFetching(true);
  }

  function debounceScroll() {
    // execute the last handleScroll function call, in every 100ms
    return debounce(handleScroll, 100, false);
  }

  // sharing logic
  return [isFetching, setIsFetching, stop as any];
};

export { useInfiniteScroll };
