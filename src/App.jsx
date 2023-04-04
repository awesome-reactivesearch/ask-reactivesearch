/* eslint-disable no-template-curly-in-string */
import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { ReactiveBase, SearchBox } from "@appbaseio/reactivesearch";

import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./App.module.css";

import "./App.css";
import { getIcon } from "./getIcon";

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
          <a href="/">How this is built</a>
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
        URLParams
        // enableAI
        // AIConfig={{
        //   docTemplate:
        //     "title is '${source.title}', page content is '${source.tokens}', URL is https://docs.reactivesearch.io${source.url}",
        //   queryTemplate:
        //     "Answer the query: '${value}', cite URL in your answer below it similar to a science paper format",
        //   topDocsForContext: 2,
        // }}
        autosuggest={true}
        render={({
          downshiftProps: { isOpen, getItemProps, highlightedIndex },
          AIData,
          data,
        }) =>
          isOpen ? (
            <div className={`${styles.suggestions}`}>
              {AIData.answer && AIData.question ? (
                AIData.answer
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
                          className={
                            highlightedIndex === index
                              ? styles.activeSuggestion
                              : styles.suggestion
                          }
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
                      {data.map((item, index) => (
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
                            <div className="col-1">
                              <div className="p-1 bg-white rounded">
                                <img
                                  className="w-100 h-100"
                                  alt="icon"
                                  src={getIcon(item._source.keywords)}
                                />
                              </div>
                            </div>
                            <div className="col-11">
                              <div className="clipText">{item.value}</div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ) : null
        }
      />
    </ReactiveBase>
  );
}

const App = () => <Main />;

export default App;
