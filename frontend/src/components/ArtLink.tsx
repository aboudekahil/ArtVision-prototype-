import React, { PropsWithChildren, useRef } from "react";
import { Link, To } from "react-router-dom";
import { AriaLinkOptions, useLink } from "react-aria";
import { mergeRefs } from "react-merge-refs";

type ArtLinkProps = {
  to: To;
  className?: string;
  key?: React.Key;
} & AriaLinkOptions;

export default React.forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<ArtLinkProps>
>(({ to, className, key, children, ...props }, ref) => {
  const _ref = useRef(null);

  let { linkProps } = useLink(props, _ref);
  return (
    <Link
      className={className}
      key={key}
      ref={mergeRefs([ref, _ref])}
      {...linkProps}
      to={to}
    >
      {children}
    </Link>
  );
});
