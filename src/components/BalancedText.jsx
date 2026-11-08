import React, { useEffect, useRef, useState } from 'react';

// Uses Pretext's documented line-layout API; native text remains the fallback.
export default function BalancedText({
  as: Element = 'p',
  children,
  className = '',
}) {
  const ref = useRef(null);
  const [lines, setLines] = useState(null);
  const text = String(children);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let disposed = false;
    let previousWidth = -1;
    let engine;

    function arrange(force = false) {
      const width = Math.floor(element.clientWidth);
      if (
        disposed ||
        !engine ||
        width < 1 ||
        (!force && width === previousWidth)
      )
        return;
      previousWidth = width;

      try {
        const { prepareWithSegments, measureLineStats, layoutWithLines } =
          engine;
        const style = getComputedStyle(element);
        const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        const prepared = prepareWithSegments(text, font, {
          whiteSpace: 'pre-wrap',
          letterSpacing: parseFloat(style.letterSpacing) || 0,
        });
        const lineHeight =
          parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
        const target = measureLineStats(prepared, width).lineCount;
        let lower = width * 0.55;
        let upper = width;

        for (let i = 0; i < 10; i += 1) {
          const middle = (lower + upper) / 2;
          if (measureLineStats(prepared, middle).lineCount > target)
            lower = middle;
          else upper = middle;
        }

        const next = layoutWithLines(
          prepared,
          Math.min(width, Math.ceil(upper) + 1),
          lineHeight,
        ).lines.map((line) => line.text);
        setLines((current) =>
          current?.join('\n') === next.join('\n') ? current : next,
        );
      } catch {
        setLines(null);
      }
    }

    const observer = new ResizeObserver(() => arrange());
    observer.observe(element);
    const style = getComputedStyle(element);
    Promise.all([
      import('@chenglou/pretext'),
      document.fonts.load(
        `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`,
        text,
      ),
    ])
      .then(([loaded]) => {
        if (disposed) return;
        engine = loaded;
        arrange(true);
      })
      .catch(() => {});

    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, [text]);

  return (
    <Element ref={ref} className={`balanced-text ${className}`}>
      <span className={lines ? 'sr-only' : undefined}>{text}</span>
      {lines && (
        <span aria-hidden="true">
          {lines.map((line, index) => (
            <span className="balanced-line" key={`${index}-${line}`}>
              {line}
            </span>
          ))}
        </span>
      )}
    </Element>
  );
}
