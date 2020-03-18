import React from "react";
import { Col, Row, Container } from "../components/Grid/Grid";

function Home({ logout }) {
    return (
        <Container fluid>
            <Row>
                <Col size="s12">
                    <h1>Hello world</h1>
                </Col>
            </Row>

        </Container>
    )
}
export default Home;