import useScrollReveal from "../hooks/useScrollReveal";

/**
 * Generic scroll-reveal wrapper. Renders as `as` (default "div") and adds
 * `reveal reveal-<variant>` classes, toggling `is-visible` once the element
 * enters the viewport. See src/styles/reveal.css for the actual animations.
 *
 * variant: "up" | "blur" | "scale" | "fade" | "left" | "right" | "text" | "clip"
 * delay: stagger delay in ms
 */
export default function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}) {
  const [ref, visible] = useScrollReveal();

  const mergedStyle = {
    ...style,
    "--reveal-delay": `${delay}ms`,
  };

  const classes = ["reveal", `reveal-${variant}`, visible ? "is-visible" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}