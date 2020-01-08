import React from "react";
import API from "./../Utils/API";
// import {
//     setSelectedStudent
// } from '../../actions'
import { Link } from "react-router-dom";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: null,
      loading: true
    };
    this.renderEditable = this.renderEditable.bind(this);
  }

  async componentWillMount() {
    try {
      let res = await API.get("/students");
      this.setState({ data: res.data, loading: false });
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={async e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          console.log("cellInfo", cellInfo.original.id);

          try {
            let res = await API.patch(
              `students/${cellInfo.original.id}`,
              { name: data[cellInfo.index][cellInfo.column.id] },
              {
                headers: { Authorization: localStorage.getItem("token") }
              }
            );
            if (res.data) {
              let res = await API.get("/students");
              this.setState({ data: res.data });
            }
            //this.setState({ data: res.data });
          } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
          }
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  toggleSelectOne(obj) {
    this.setState({
      selected: obj
    });
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          loading={this.state.loading}
          data={data}
          defaultSorted={[
            {
              id: "full",
              desc: true
            }
          ]}
          columns={[
            {
              Header: "select",
              Cell: ({ original }) => {
                return (
                  <input
                    type="checkbox"
                    className="checkbox d-block text-center "
                    checked={
                      this.state.selected &&
                      this.state.selected.id === original.id
                    }
                    onChange={() => this.toggleSelectOne(original)}
                  />
                );
              }
            },
            {
              Header: "Name",
              accessor: "name",
              Cell: this.renderEditable
            },
            {
              Header: "Score Average",
              accessor: "score_average"
            },
            {
              Header: "Subject Count",
              id: "subject_count",
              accessor: "subject_count"
            },
            {
              Header: "Action",
              accessor: "subject_count",
              Cell: cell => {
                return (
                  <Link to={`/user/${cell.original.id}`}> Open Result</Link>
                );
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
