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
      d="M12 4.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm0 3.214c-.474 0-.804 1.7-.804 2.143V12c0 .444.36.804.804.804l1.045-.001c1.128-.007 4.312-.075 4.312-.803 0-.804-4.11-.804-4.553-.804V9.857c0-.444-.33-2.143-.804-2.143Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
