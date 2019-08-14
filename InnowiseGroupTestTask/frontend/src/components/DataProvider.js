import React, { Component } from "react";
import PropTypes from "prop-types";

class DataProvider extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        render: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading...",
            updated: props.updated
        };
    }

    componentDidMount = () => {
        this.tick();

        if (this.state.updated) {
            this.timerID = setInterval(
                () => this.tick(),
                3000
            );
        }
    };

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        fetch(this.props.endpoint)
            .then(response => {
                if (response.status !== 200) {
                    return this.setState({ placeholder: "Something went wrong" });
                }
                return response.json();
            })
            .then(data => this.setState({ data: data, loaded: true }));
    }

    render() {
        const { data, loaded, placeholder } = this.state;
        return loaded ? this.props.render(data) : <p>{placeholder}</p>;
    }
}

export default DataProvider;
