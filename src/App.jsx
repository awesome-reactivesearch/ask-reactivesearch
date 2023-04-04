import React from "react";
import { Badge, Container, ListGroup, Navbar } from "react-bootstrap";
import {
  ReactiveBase,
  ReactiveList,
  SearchBox,
} from "@appbaseio/reactivesearch";

import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./App.module.css";

import "./App.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

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
          <a href="">How this is built</a>
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
        componentId={"search"}
        showClear
        distinctField="meta_title.keyword"
        highlight={false}
        autosuggest={false}
      />
      <div className="px-5 pt-2">
        {/* <AIAnswer
          componentId="ai-answer"
          placeholder="Ask your question!"
          showVoiceInput
          showIcon
          react={{ and: "search" }}
          AIConfig={{
            docTemplate:
              "title is '${source.title}', page content is '${source.tokens}', URL is https://docs.reactivesearch.io${source.url}",
            queryTemplate:
              "Answer the query: '${value}', cite URL in your answer below it similar to a science paper format",
            topDocsForContext: 2,
          }}
          title={<b>AI Chatbox 🤩</b>}
          enterButton={true}
        /> */}
      </div>

      <ReactiveList
        componentId="SearchResult"
        dataField="title"
        size={6}
        className="position-relative"
        pagination
        react={{ and: "search" }}
        renderResultStats={(stats) => {
          return stats ? (
            <div className="mx-5">
              {stats.numberOfResults} results found in {stats.time}ms
            </div>
          ) : null;
        }}
        render={({ data }) => {
          return (
            <div className="mx-5 my-2">
              <div className="row">
                <ListGroup className={styles.list} variant="flush">
                  {data.map((item) => (
                    <ListGroup.Item key={item._id} className="py-4 px-2">
                      <h1 className="h3">{item.title || item.meta_title}</h1>
                      <div>
                        {item.keywords &&
                          item.keywords.map((keyword) => (
                            <Badge key={keyword} className="me-1">
                              {keyword}
                            </Badge>
                          ))}
                      </div>
                      <ReactMarkdown className="my-1">
                        {item.meta_description}
                      </ReactMarkdown>
                      {item.heading ? (
                        <div className="my-1">
                          {`${item.meta_title} ${item.heading}`}
                        </div>
                      ) : null}
                      {item.url ? (
                        <a
                          href={`https://docs.reactivesearch.io${item.url}`}
                          className="link-primary"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Documentation Page
                        </a>
                      ) : null}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </div>
          );
        }}
      />
    </ReactiveBase>
  );
}

const App = () => <Main />;

export default App;
