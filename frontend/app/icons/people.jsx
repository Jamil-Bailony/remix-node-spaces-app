import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M15.333 7a3.333 3.333 0 1 1-6.667 0 3.333 3.333 0 0 1 6.667 0ZM17 15.333V19.5H7v-4.167c0-.583.167-1.166.417-1.666A3.361 3.361 0 0 1 10.333 12h3.334c1.25 0 2.333.667 2.916 1.667.25.5.417 1.083.417 1.666ZM2.833 17v2.5h2.5v-5.75c-1.416.417-2.5 1.667-2.5 3.25Zm15.834-3.25v5.75h2.5V17c0-1.583-1.084-2.833-2.5-3.25Zm0-6.75c-1.417 0-2.5 1.083-2.5 2.5s1.083 2.5 2.5 2.5c1.416 0 2.5-1.083 2.5-2.5S20.083 7 18.667 7ZM2.833 9.5c0-1.417 1.084-2.5 2.5-2.5 1.417 0 2.5 1.083 2.5 2.5S6.75 12 5.333 12c-1.416 0-2.5-1.083-2.5-2.5Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
