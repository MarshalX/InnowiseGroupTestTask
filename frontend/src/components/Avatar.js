import React from "react";
import {Col, Container, Image, Row} from 'react-bootstrap'


class Avatar extends React.Component {
    render() {
        const url = this.props.data[1];

        return <Container>
            <Row>
                <Col xs={6} md={4}>
                    <Image height="50px" src={url} rounded/>
                    {this.props.children}
                </Col>
            </Row>
        </Container>
    }
}

export default Avatar;
