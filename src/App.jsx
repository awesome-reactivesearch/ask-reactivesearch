import React from "react";
import { Badge, Card, Container, ListGroup, Navbar } from "react-bootstrap";
import {
  ReactiveBase,
  ReactiveList,
  SearchBox,
} from "@appbaseio/reactivesearch";

import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./App.module.css";

import "./App.css";

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
      <Navbar bg="white" className="shadow" expand="lg">
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
            weight: 10,
          },
          {
            field: "meta_description",
            weight: 3,
          },
          {
            field: "meta_title",
            weight: 3,
          },
          {
            field: "tokens",
            weight: 1,
          },
        ]}
        componentId={"search"}
        URLParams
        showClear
        debounce={500}
        highlight={false}
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
                            <Badge key="keyword">{keyword}</Badge>
                          ))}
                      </div>
                      <div>{item.meta_description}</div>
                      <div>{item.tokens}</div>
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
