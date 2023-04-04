/* eslint-disable no-template-curly-in-string */
import React from "react";
import { Badge, Container, ListGroup, Navbar } from "react-bootstrap";
import {
  ReactiveBase,
  ReactiveList,
  SearchBox,
} from "@appbaseio/reactivesearch";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./App.module.css";

import "./App.css";

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
        enableAI
        AIUIConfig={{
          askButton: true,
        }}
        AIConfig={{
          docTemplate:
            "title is '${source.title}', page content is '${source.tokens}', URL is https://docs.reactivesearch.io${source.url}",
          queryTemplate:
            "Answer the query: '${value}', cite URL in your answer below it similar to a science paper format",
          topDocsForContext: 2,
        }}
        autosuggest={true}
        render={({
          downshiftProps: {
            isOpen,
            getItemProps,
            highlightedIndex,
            selectedItem,
          },
          AIData,
        }) =>
          isOpen
            ? console.log({ AIData }) || (
                <div className={`${styles.suggestions}`}>
                  {AIData.answer && AIData.question ? (
                    AIData.answer
                  ) : (
                    <div>
                      <p className="bg-gray p-2 m-0">
                        Frequently Asked Questions{" "}
                        <span role="img" aria-label="confused">
                          🤔
                        </span>
                      </p>
                      <div>
                        {faqs.map((item, index) => (
                          <div
                            /* eslint-disable-next-line react/no-array-index-key */
                            key={item.id + index}
                            {...getItemProps({
                              item,
                              style: {
                                backgroundColor:
                                  highlightedIndex === index
                                    ? "var(--bs-primary)"
                                    : "white",
                                color:
                                  highlightedIndex === index
                                    ? "var(--bs-white)"
                                    : "var(--bs-black)",
                                fontWeight:
                                  selectedItem === item ? "bold" : "normal",
                                padding: "5px 15px",
                              },
                            })}
                            className="listItem"
                          >
                            <span className="clipText">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            : null
        }
      />

      <ReactiveList
        componentId="SearchResult"
        dataField="title"
        size={6}
        className="position-relative"
        pagination
        react={{ and: "search" }}
        renderResultStats={(stats) =>
          stats ? (
            <div className="mx-5">
              {stats.numberOfResults} results found in {stats.time}ms
            </div>
          ) : null
        }
        render={({ data }) => (
          <div className="mx-5 my-2">
            <div className="row">
              <ListGroup className={styles.list} variant="flush">
                {data.map((item) =>
                  item.title ? (
                    <ListGroup.Item key={item._id} className="py-4 px-2">
                      <h1 className="h3">{item.title || item.meta_title}</h1>
                      <div>
                        {item.keywords.map((keyword) => (
                          <Badge key={keyword} className="me-1">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                      <ReactMarkdown className="my-1">
                        {item.meta_description}
                      </ReactMarkdown>
                      {item.url ? (
                        <a
                          href={`https://docs.reactivesearch.io${item.url}`}
                          className="link-primary"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Documentation Page for{" "}
                          {item.heading
                            ? `${item.meta_title} > ${item.heading}`
                            : item.meta_title}
                        </a>
                      ) : null}
                    </ListGroup.Item>
                  ) : null
                )}
              </ListGroup>
            </div>
          </div>
        )}
      />
    </ReactiveBase>
  );
}

const App = () => <Main />;

export default App;
