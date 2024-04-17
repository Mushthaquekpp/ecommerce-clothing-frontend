import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UserMenu from "../../Components/Layout/UserMenu";
import Layout from "../../Components/Layout/Layout";

const Profile = () => {
  return (
    <div>
      <Layout>
        <Row className="justify-content-md-center mt-5">
          <Col md="4">
            <div>
              <UserMenu />
            </div>
          </Col>
          <Col md="8">
            <div>Profile</div>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Profile;
