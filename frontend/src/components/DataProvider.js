import React, {Component} from "react";
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
            placeholder: "Loading..."
        };
        this.loaded = false;
        this.method = props.method || 'get'
    }

    componentDidMount = () => {
        this.tick();

        if (this.props.updated) {
            this.timerID = setInterval(
                () => this.tick(),
                3000
            );
        }
    };

    componentWillUnmount = () => {
        clearInterval(this.timerID);
    };

    tick = () => {
        this.loaded = false;

        fetch(this.props.endpoint, {'method': this.method})
            .then(response => {
                if (response.status !== 200) {
                    return this.setState({placeholder: "Something went wrong"});
                }
                return response.json();
            })
            .then(data => {
                this.loaded = true;
                this.setState({data: data});
            });
    };

    render() {
        const {data, placeholder} = this.state;
        return this.loaded ? this.props.render(data) : <p>{placeholder}</p>;
    }
}

export default DataProvider
