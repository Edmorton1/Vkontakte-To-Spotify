declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export = classes;
}
declare module "*.{png,jpg,jpeg,gif,wav}" {
  const src: string;
  export default src;
}
declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  export default ReactComponent;
}

declare const __PLATFORM__: 'mobile' | 'desktop'
declare const __URL_SERVER__: string
declare const __URL_CLIENT__: string