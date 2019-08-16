import React from "react";
import Container from 'react-bootstrap/Container'

class Content extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return <Container className="mb-3">
            {this.props.children}
        </Container>
    }
}


export default Content
