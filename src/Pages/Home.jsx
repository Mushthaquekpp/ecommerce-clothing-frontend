import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";
import { prices } from "../Components/Prices";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      } else {
        toast.error(data?.message || "Failed to fetch categories");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getProduct();
    getCategory();
  }, []);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || radio.length) getProduct();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (!checked.length || radio.length) filterProduct();
  }, [checked, radio]);



  
  return (
    <Layout title={"Ecommerce"}>
      <>
        {JSON.stringify(checked, null, 4)}
        <div className="page-title">
          <h1>All Products</h1>
        </div>

        <Row className="justify-content-md-center mt-5">
          <Col md="3">
            <div className="filter-section">
              <h4>Filter By Categories</h4>
              <Form>
                {categories.map((c) => (
                  <Form.Check
                    key={c._id}
                    type="checkbox"
                    label={c.name}
                    name="category"
                    value={c._id}
                    className="custom-radio"
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  />
                ))}
              </Form>
              <h4>Filter By Price</h4>
              <Form>
                {prices.map((p) => (
                  <Form.Check
                    key={p._id}
                    type="radio"
                    label={p.name}
                    name="prices"
                    value={p.array}
                    className="custom-radio"
                  />
                ))}
              </Form>
              <Button className="btn btn-primary my-3 mx-3">Reset</Button>
            </div>
          </Col>
          <Col md="9">
            <div className="product-container">
              {products.map((item) => (
                <Link
                  key={item._id}
                  to={`/dashboard/admin/products/${item.slug}`}
                  className="product-link"
                >
                  <Card className="product-card">
                    <Card.Img
                      variant="top"
                      src={`http://localhost:8080/api/v1/product/photo/${item._id}`}
                      alt={item.name}
                    />
                    <Card.Body style={{ textAlign: "center" }}>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <Card.Text>price: {item.price} ₹</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </>
    </Layout>
  );
};

export default Home;
