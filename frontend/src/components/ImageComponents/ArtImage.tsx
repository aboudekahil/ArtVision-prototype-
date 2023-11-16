import React, { HTMLProps } from "react";
import cm from "../../utils/cm.ts";
import { SERVER_URL } from "../../utils/configs.ts";

type ArtImageProps = {
  figureClassName?: string;
  fromServer?: boolean;
  alt: string;
  src: string;
} & HTMLProps<HTMLImageElement>;

const ArtImage = React.forwardRef<HTMLImageElement, ArtImageProps>(
  (
    { className, figureClassName, alt, fromServer = true, src, ...props },
    ref,
  ) => {
    return (
      <figure className={figureClassName}>
        <img
          ref={ref}
          className={cm("rounded-full object-cover aspect-square", className)}
          alt={alt}
          src={fromServer ? `${SERVER_URL}/static${src}` : src}
          {...props}
        />
      </figure>
    );
  },
);

export default ArtImage;
