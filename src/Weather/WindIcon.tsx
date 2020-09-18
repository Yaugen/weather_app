import * as React from "react";

interface WindIconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
}

export const WindIcon: React.FC<WindIconProps> = (props) => {
  return (
    <svg height={32} viewBox="0 0 32 32" width={32} {...props}>
      <path
        d="M16 0a1.1 1.1 0 00-.705.286L8.296 7.185a.994.994 0 000 1.414 1.017 1.017 0 001.429 0L15 3.398v14.268l-6.722 6.627a.994.994 0 000 1.414 1.017 1.017 0 001.429 0L15 20.488v3.178l-6.722 6.627a.994.994 0 000 1.414 1.017 1.017 0 001.429 0l6.285-6.195 6.285 6.196a1.017 1.017 0 001.429 0 .994.994 0 000-1.414L17 23.684v-3.177l5.276 5.201a1.017 1.017 0 001.429 0 .993.993 0 000-1.414L17 17.684V3.381L22.294 8.6a1.017 1.017 0 001.429 0 .994.994 0 000-1.414l-6.999-6.9A1.027 1.027 0 0016 0z"
        fill={props.fill}
      />
    </svg>
  );
};
