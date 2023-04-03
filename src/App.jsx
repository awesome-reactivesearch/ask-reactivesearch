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
          <span className={`text-white ${styles.headingTag}`}>KNN Search</span>
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
        ]}
        className="mx-5 mt-2"
        componentId={"search"}
        URLParams
        showClear
        distinctField="meta_title.keyword"
        debounce={500}
        highlight={false}
        render={({
          data,
          downshiftProps: {
            isOpen,
            getItemProps,
            highlightedIndex,
            selectedItem,
          },
        }) => {
          return isOpen ? (
            <div className={`${styles.suggestions}`}>
              {data.map((item, index) => (
                <div
                  /* eslint-disable-next-line react/no-array-index-key */
                  key={item._id + index}
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
                      fontWeight: selectedItem === item ? "bold" : "normal",
                      padding: "5px 15px",
                    },
                  })}
                  className="listItem"
                >
                  <div className="fw-bold">{item.value.toUpperCase()}</div>
                  <div>{`${item._source.meta_title} > ${item._source.heading}`}</div>
                  <div>
                    {item._source.keywords &&
                      item._source.keywords.map((keyword) => (
                        <Badge key="keyword" className="me-1">
                          {keyword}
                        </Badge>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null;
        }}
      />

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
                            <Badge key="keyword" className="me-1">
                              {keyword}
                            </Badge>
                          ))}
                      </div>
                      <ReactMarkdown className="my-1">
                        {item.meta_description}
                      </ReactMarkdown>
                      <div className="my-1">{item.heading}</div>
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
