import React, { HTMLProps } from "react";
import cm from "../utils/cm.ts";

type ArtImageProps = {
  figureClassName?: string;
} & HTMLProps<HTMLImageElement>;

const ArtImage = React.forwardRef<HTMLImageElement, ArtImageProps>(
  ({ className, figureClassName, alt, ...props }, ref) => {
    return (
      <figure className={figureClassName}>
        <img
          ref={ref}
          className={cm("rounded-full object-cover aspect-square", className)}
          alt={alt}
          {...props}
        />
      </figure>
    );
  },
);

export default ArtImage;
