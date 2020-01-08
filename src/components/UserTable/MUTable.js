import React from "react";
import { render } from "react-dom";
import axios from 'axios'
// import {
//     setSelectedStudent
// } from '../../actions'

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [
                {
                    "id": "925001a8-ee6c-482f-9c2e-4a5278900bb6",
                    "id_student": "c33b7445-2b91-43fc-8ca0-2410d979f70f",
                    "score": 45,
                    "subject": "HTML",
                    "test_dt": 1578221536276,
                    "updatedAt": 1578221536277
                },
                {
                    "id": "4a527898-ee6c-482f-9c2e-4a5278900bb6",
                    "id_student": "c33b7445-2b91-43fc-8ca0-2410d979f70f",
                    "score": 58,
                    "subject": "CSS",
                    "test_dt": 1578221536276,
                    "updatedAt": 1578221536277
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
                                Header: "Score",
                                accessor: "score",
                                // Cell: this.renderEditable
                            },
                            {
                                Header: "Subject",
                                accessor: "subject",
                                // Cell: this.renderEditable
                            },
                            {
                                Header: "Test Date",
                                id: "subject_count",
                                accessor: "test_dt",
                                Cell: (cell) => {
                                    console.log("cell", cell)
                                    let d = new Date(cell.original.test_dt)
                                    return `${d.getDate()} - ${(d.getMonth() + 1)} - ${d.getFullYear()}`
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
