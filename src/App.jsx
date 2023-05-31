/* eslint-disable no-template-curly-in-string */
import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { ReactiveBase, SearchBox } from "@appbaseio/reactivesearch";
import ReactMarkdown from "react-markdown";

import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./App.module.css";

import "./App.css";
import { getIcon } from "./getIcon";
const ButtonSvg = () => {
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
const faqs = [
  {
    label:
      "How to use the SearchBox component with MultiList and ReactiveList in React?",
    value:
      "How to use the SearchBox component with MultiList and ReactiveList in React?",
    id: "faq-1",
  },
  {
    label: "Basic usage for MultiList in React",
    value: "Basic usage for MultiList in React",
    id: "faq-2",
  },
];

function Main() {
  return (
    <ReactiveBase
      app="reactivesearch_docs_v2"
      url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
      theme={{
        typography: {
          fontFamily: "monospace",
          fontSize: "16px",
        },
      }}
      reactivesearchAPIConfig={{
        recordAnalytics: false,
        userId: "jon",
      }}
    >
      <Navbar bg="white" className="shadow mb-5" expand="lg">
        <Container>
          <Navbar.Brand>Reactivesearch</Navbar.Brand>
          <span className={`text-white ${styles.headingTag}`}>
            Ask Reactivesearch
          </span>
          <a href="https://hashnode.com/draft/642db4a3e4c45a000fbfc5d6">
            How this is built
          </a>
        </Container>
      </Navbar>

      <SearchBox
        dataField={[
          {
            field: "keywords",
            weight: 4,
          },
          {
            field: "heading",
            weight: 2,
          },
          {
            field: "meta_title",
            weight: 1,
          },
        ]}
        className="mx-5 mt-2"
        debounce={500}
        componentId="search"
        showClear
        distinctField="meta_title.keyword"
        highlight={false}
        size={5}
        URLParams
        autosuggest={true}
        enableAI
        AIUIConfig={{
          askButton: true,
          renderAskButton: (clickHandler) => {
            return (
              <button className="ask-ai-button" onClick={clickHandler}>
                <span className="button-emoji">
                  <ButtonSvg />
                </span>
                <span className="button-text">{"Ask AI"}</span>
              </button>
            );
          },
        }}
        AIConfig={{
          docTemplate:
            "title is '${source.title}', page content is '${source.tokens}', URL is https://docs.reactivesearch.io${source.url}",
          queryTemplate:
            "Answer the query: '${value}', cite URL in your answer below it similar to a science paper format",
          topDocsForContext: 2,
        }}
        render={({
          downshiftProps: {
            isOpen,
            getItemProps,
            highlightedIndex,
            selectedItem,
          },
          AIData: { answer: aiAnswer, isAILoading },
          data,
          loading,
        }) => {
          if (isOpen) {
            if (loading || isAILoading) {
              return (
                <div className={`${styles.suggestions}`}>
                  {" "}
                  <div
                    style={{
                      alignSelf: "flex-start",
                      margin: 8,
                      maxWidth: "70%",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        maxWidth: "100%",
                        backgroundColor: "#f1f1f1",
                        color: "black",
                        borderRadius: "16px",
                        padding: "8px 16px",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                      }}
                    >
                      {aiAnswer || "Loading..."}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div className={`${styles.suggestions}`}>
                {isAILoading || aiAnswer ? (
                  <div
                    style={{
                      alignSelf: "flex-start",
                      margin: 8,
                      maxWidth: "70%",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        maxWidth: "100%",
                        backgroundColor: "#f1f1f1",
                        color: "black",
                        borderRadius: "16px",
                        padding: "8px 16px",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                      }}
                    >
                      {aiAnswer || "Loading..."}
                    </div>
                  </div>
                ) : (
                  <div>
                    {!(data && data.length) ? (
                      <p
                        className={`bg-gray p-2 m-0 ${styles.suggestionHeading}`}
                      >
                        Frequently Asked Questions{" "}
                        <span role="img" aria-label="confused">
                          🤔
                        </span>
                      </p>
                    ) : null}
                    {!(data && data.length) ? (
                      <div>
                        {faqs.map((item, index) => (
                          <div
                            /* eslint-disable-next-line react/no-array-index-key */
                            key={item.id + index}
                            {...getItemProps({
                              item,
                            })}
                            className={`${
                              highlightedIndex === index
                                ? styles.activeSuggestion
                                : styles.suggestion
                            } 
                                ${
                                  selectedItem &&
                                  selectedItem.value === item.value
                                    ? styles.selectedSuggestion
                                    : ""
                                }
                                `}
                          >
                            <span className="clipText">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {data && data.length ? (
                      <p
                        className={`bg-gray p-2 m-0 ${styles.suggestionHeading}`}
                      >
                        Documentation pages
                        <span role="img" aria-label="confused">
                          📄
                        </span>
                      </p>
                    ) : null}
                    {data && data.length ? (
                      <div>
                        {data
                          .filter(
                            (_) => _._source.title && _._source.meta_title
                          )
                          .map((item, index) => {
                            const breadcrumbText = item._source.heading
                              ? `${item._source.meta_title} > ${item._source.heading}`
                              : item._source.meta_title;
                            const imgSrc = getIcon(item._source.keywords);

                            return (
                              <a
                                /* eslint-disable-next-line react/no-array-index-key */
                                key={item._id + index}
                                {...getItemProps({
                                  item,
                                })}
                                onClick={null}
                                className={
                                  highlightedIndex === index
                                    ? styles.activeSuggestion
                                    : styles.suggestion
                                }
                                target="_blank"
                                rel="noreferrer"
                                href={`https://docs.reactivesearch.io${item._source.url}`}
                              >
                                <div className="row">
                                  {imgSrc && (
                                    <div className="d-flex justify-content-center align-items-center col col-3 col-md-1">
                                      <div
                                        className={`p-1 bg-white rounded ${styles.suggestionIcon}`}
                                      >
                                        <img
                                          className="w-100 h-100"
                                          alt="icon"
                                          src={imgSrc}
                                        />
                                      </div>
                                    </div>
                                  )}
                                  <div className="col col-9 col-md-11">
                                    <div
                                      title={item.value}
                                      className={styles.suggestionTitle}
                                    >
                                      {item.value || item._source.title}
                                    </div>
                                    {breadcrumbText ? (
                                      <div>
                                        {
                                          <span
                                            title={breadcrumbText}
                                            className={
                                              styles.suggestionBreadcrumb
                                            }
                                          >
                                            {breadcrumbText}
                                          </span>
                                        }
                                      </div>
                                    ) : null}
                                    <div
                                      title={item._source.meta_description}
                                      className={styles.suggestionDescription}
                                    >
                                      <ReactMarkdown>
                                        {item._source.meta_description}
                                      </ReactMarkdown>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            );
                          })}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            );
          }
        }}
      />
    </ReactiveBase>
  );
}

const App = () => <Main />;

export default App;
