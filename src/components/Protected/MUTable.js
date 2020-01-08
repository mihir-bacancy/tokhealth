import React from "react";
import { render } from "react-dom";
import axios from 'axios'
// import {
//     setSelectedStudent
// } from '../../actions'
import { Link } from 'react-router-dom'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [
                {
                    "score_average": 90.3,
                    "subject_count": 3,
                    "id": "1ed85783-1c78-4bb1-b3f6-55a2f9a068fe",
                    "name": "bacancy",
                    "updatedAt": 1578038514804
                },
                {
                    "score_average": 90.3,
                    "subject_count": 3,
                    "id": "cdc201f1-b0f0-4342-a8d4-30b901789599",
                    "name": "Bacancy1",
                    "updatedAt": 1578296881345
                }
            ]
        };
        this.renderEditable = this.renderEditable.bind(this);
    }
    renderEditable(cellInfo) {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.data];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    console.log("cellInfo", cellInfo.original.id)
                    // API hits here

                    let url = `https://aw078d3c17.execute-api.us-east-1.amazonaws.com/dev/students/${cellInfo.original.id}`
                    let config = {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        }
                    }
                    axios.patch(url, config, {
                        'name': data[cellInfo.index][cellInfo.column.id]
                    })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch(err => console.log("err", err));
                    data[cellInfo.index].full = data[cellInfo.index].age * 2;
                    this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }
    render() {
        const { data } = this.state;
        // const data =


        return (
            <div>
                <ReactTable
                    data={data}
                    defaultSorted={[
                        {
                            id: "full",
                            desc: true
                        }
                    ]}
                    columns={
                        [
                            {
                                Header: "Name",
                                accessor: "name",
                                Cell: this.renderEditable
                            },
                            {
                                Header: "Score Average",
                                accessor: "score_average",
                                // Cell: this.renderEditable
                            },
                            {
                                Header: "Subject Count",
                                id: "subject_count",
                                accessor: "subject_count"
                            },
                            {
                                Header: "Action",
                                accessor: "subject_count",
                                Cell: (cell) => {
                                    return <Link to={`/user/${cell.original.id}`}> Open Result</Link>
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


export default App
