import React from "react";
import reactIcon from "./react.svg";
import vueIcon from "./vue.svg";
import flutterIcon from "./flutter.svg";
import blockIcon from "./block.svg";

export const ButtonSvg = () => {
    return (
      <svg
        width="12"
        height="14"
        viewBox="0 0 12 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        focusable="false"
      >
        <path
          d="M5.75 1.45842V7.00009M5.75 7.00009L10.7083 4.24542M5.75 7.00009L0.791667 4.24542M5.75 7.00009L5.75 12.5418M10.7083 9.75472L6.20327 7.2519C6.03783 7.16 5.95511 7.11404 5.86751 7.09602C5.78998 7.08008 5.71002 7.08008 5.63249 7.09602C5.54489 7.11404 5.46217 7.16 5.29673 7.2519L0.791667 9.75472M11 9.36758V4.6326C11 4.43272 11 4.33279 10.9706 4.24365C10.9445 4.1648 10.9019 4.09242 10.8456 4.03135C10.782 3.96232 10.6947 3.91379 10.5199 3.81672L6.20327 1.41857C6.03783 1.32666 5.95511 1.28071 5.86751 1.26269C5.78998 1.24675 5.71002 1.24675 5.63249 1.26269C5.54489 1.28071 5.46217 1.32666 5.29673 1.41857L0.980066 3.81672C0.805344 3.91379 0.717983 3.96232 0.654369 4.03135C0.598092 4.09242 0.555503 4.1648 0.529449 4.24366C0.5 4.33279 0.5 4.43273 0.5 4.6326L0.5 9.36758C0.5 9.56745 0.5 9.66739 0.529449 9.75652C0.555503 9.83538 0.598092 9.90776 0.654369 9.96883C0.717983 10.0379 0.805344 10.0864 0.980067 10.1835L5.29673 12.5816C5.46217 12.6735 5.54489 12.7195 5.63249 12.7375C5.71002 12.7534 5.78998 12.7534 5.86751 12.7375C5.95511 12.7195 6.03783 12.6735 6.20327 12.5816L10.5199 10.1835C10.6947 10.0864 10.782 10.0379 10.8456 9.96883C10.9019 9.90776 10.9445 9.83538 10.9706 9.75652C11 9.66739 11 9.56745 11 9.36758Z"
          stroke="url(#paint0_linear_930_6209)"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear_930_6209"
            x1="1.05161"
            y1="1.85481"
            x2="11.2998"
            y2="11.2129"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C892FF"></stop>
            <stop offset="1" stopColor="#4CBEFF"></stop>
          </linearGradient>
        </defs>
      </svg>
    );
  };

export const faqs = [
  {
    label:
      "How to use the SearchBox component with MultiList and ReactiveList in React?",
    value:
      "How to use the SearchBox component with MultiList and ReactiveList in React?",
    id: "faq-1",
  },
  {
    label: "Code for MultiList in React",
    value: "Code for MultiList in React",
    id: "faq-2",
  },
];

export function getIcon(keywords = []) {
  if (!keywords) return null;
  if (keywords.includes("vue")) {
    return vueIcon;
  } else if (keywords.includes("flutter")) {
    return flutterIcon;
  } else if (keywords.includes("react")) {
    return reactIcon;
  } else {
    return blockIcon;
  }
}
