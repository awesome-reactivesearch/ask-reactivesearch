/* eslint-disable react/prop-types */
/* eslint-disable no-template-curly-in-string */
import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { ReactiveBase, SearchBox } from "@appbaseio/reactivesearch";
import ReactMarkdown from "react-markdown";

import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./App.module.css";

import "./App.css";
import { ButtonSvg, faqs, getIcon } from "./utils";

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
        recordAnalytics: true,
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
        componentId="search"
        className="mx-5 mt-2"
        dataField={[
          {
            field: "keywords",
            weight: 4,
          },
          {
            field: "heading",
            weight: 1,
          },
          {
            field: "tokens",
            weight: 1,
          },
          {
            field: "meta_title",
            weight: 2,
          },
        ]}
        distinctField="meta_title.keyword"
        showDistinctSuggestions
        size={5}
        debounce={20}
        highlight={false}
        URLParams
        enableAI
        AIConfig={{
          docTemplate:
            "title is '${source.title}', page content is '${source.tokens}', URL is https://docs.reactivesearch.io${source.url}",
          queryTemplate:
            "Answer the query: '${value}', cite URL in your answer below it similar to a science paper format",
          topDocsForContext: 2,
        }}
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
        autosuggest={true}
        showClear
        render={SearchBoxRender}
      />
    </ReactiveBase>
  );
}

const SearchBoxRender = ({
  downshiftProps: { isOpen, getItemProps, highlightedIndex, selectedItem },
  AIData: { answer: aiAnswer, isAILoading },
  data,
  loading,
}) => {
  if (!isOpen) return null;

  if (loading || isAILoading) {
    return <LoadingAnswer aiAnswer={aiAnswer} />;
  }

  return (
    <div className={`${styles.suggestions}`}>
      {isAILoading || aiAnswer ? (
        <LoadingAnswer aiAnswer={aiAnswer} />
      ) : (
        <div>
          {!(data && data.length) && (
            <FAQSection
              faqs={faqs}
              getItemProps={getItemProps}
              highlightedIndex={highlightedIndex}
              selectedItem={selectedItem}
            />
          )}
          {data && data.length && (
            <DocumentationSection
              data={data}
              getItemProps={getItemProps}
              highlightedIndex={highlightedIndex}
            />
          )}
        </div>
      )}
    </div>
  );
};

const LoadingAnswer = ({ aiAnswer }) => (
  <div className={`${styles.suggestions}`}>
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

const FAQSection = ({ faqs, getItemProps, highlightedIndex, selectedItem }) => (
  <div>
    <p className={`bg-gray p-2 m-0 ${styles.suggestionHeading}`}>
      Frequently Asked Questions{" "}
      <span role="img" aria-label="confused">
        🤔
      </span>
    </p>
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
                selectedItem && selectedItem.value === item.value
                  ? styles.selectedSuggestion
                  : ""
              }
              `}
      >
        <span className="clipText">{item.value}</span>
      </div>
    ))}
  </div>
);

const DocumentationSection = ({
  data,
  getItemProps,
  highlightedIndex,
}) => {
  const seenMetaTitles = new Set();

  return (
    <div>
      <p className={`bg-gray p-2 m-0 ${styles.suggestionHeading}`}>
        Documentation pages
        <span role="img" aria-label="confused">
          📄
        </span>
      </p>
      {data
        .filter((_) => _._source.title && _._source.meta_title)
        .map((item, index) => {
          if (seenMetaTitles.has(item._source.meta_title)) {
            return null; // Don't render this item
          }
          seenMetaTitles.add(item._source.meta_title);

          const breadcrumbText = item._source.heading
            ? `${item._source.meta_title} > ${item._source.heading}`
            : item._source.meta_title;
          const imgSrc = getIcon(item._source.keywords);

          return (
            <a
              key={item._id + index}
              {...getItemProps({ item })}
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
                      <img className="w-100 h-100" alt="icon" src={imgSrc} />
                    </div>
                  </div>
                )}
                <div className="col col-9 col-md-11">
                  <div title={item.value} className={styles.suggestionTitle}>
                    {item.value || item._source.title}
                  </div>
                  {breadcrumbText && (
                    <div>
                      <span
                        title={breadcrumbText}
                        className={styles.suggestionBreadcrumb}
                      >
                        {breadcrumbText}
                      </span>
                    </div>
                  )}
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
  );
};

const App = () => <Main />;

export default App;
