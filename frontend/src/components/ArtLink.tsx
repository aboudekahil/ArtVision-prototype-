import React, { HTMLProps, PropsWithChildren, useRef } from "react";
import { Link, To } from "react-router-dom";
import { AriaLinkOptions, useLink } from "react-aria";
import { mergeRefs } from "react-merge-refs";

type ArtLinkProps = {
  to?: To;
  className?: string;
} & AriaLinkOptions &
  HTMLProps<HTMLAnchorElement>;

const ArtLink = React.forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<ArtLinkProps>
>(({ to, className, children, ...props }, ref) => {
  const _ref = useRef(null);

  const { linkProps } = useLink(props, _ref);

  if (to) {
    return (
      <Link
        className={className}
        ref={mergeRefs([ref, _ref])}
        {...linkProps}
        to={to}
      >
        {children}
      </Link>
    );
  }

  return (
    <a className={className} ref={mergeRefs([ref, _ref])} {...linkProps}>
      {children}
    </a>
  );
});

export default ArtLink;
