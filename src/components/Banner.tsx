import clsx from "clsx";
import type { ButtonData } from "../types";

type BannerProps = {
    title?: string,
    description?: string,
    button?: ButtonData
    background: "dark" | "light"
    className?: string
}

export default function Banner({ title, description, button, background = "dark", className }: BannerProps) {

  return (
    <section
      className={clsx(
        background === "light" ? "bg-blue-900" : "bg-indigo-950",
        "w-full py-10 px-5 flex flex-col items-center justify-center text-center gap-5",
        className
      )}
    >
      {title && <h1 className="text-3xl pixel-shadow">{title}</h1>}
      {description && <p >{description}</p>}
    </section>
  );
}
