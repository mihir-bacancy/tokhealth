import React from "react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import API from "./../Utils/API";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true
        };
    }
    async componentWillMount() {
        try {
            let res = await API.get(
                `students/${this.props.props.match.params.userId}/results`,
                { headers: { Authorization: localStorage.getItem("token") } }
            );
            this.setState({ data: res.data, loading: false });
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }
    render() {
        const { data } = this.state;
        return (
            <div>
                <ReactTable
                    data={data}
                    loading={this.state.loading}
                    columns={[
                        {
                            Header: "Score",
                            accessor: "score"
                            // Cell: this.renderEditable
                        },
                        {
                            Header: "Subject",
                            accessor: "subject"
                            // Cell: this.renderEditable
                        },
                        {
                            Header: "Test Date",
                            id: "subject_count",
                            accessor: "test_dt",
                            Cell: cell => {
                                let d = new Date(cell.original.test_dt);
                                return `${d.getDate()} - ${d.getMonth() +
                                    1} - ${d.getFullYear()}`;
                            }
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default App;
