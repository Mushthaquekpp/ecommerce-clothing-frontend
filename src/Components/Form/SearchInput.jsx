import React from "react";
import { Form, Button } from "react-bootstrap";

const SearchInput = () => {
  return (
    <>
      <Form className="d-flex align-items-center">
        <input
          type="text"
          className="form-control border-0"
          placeholder="Search..."
        />
        <Button className="btn btn-secondary">Search</Button>
      </Form>
    </>
  );
};

export default SearchInput;
