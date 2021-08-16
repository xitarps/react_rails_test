import { Table, message, Popconfirm } from "antd";
import React from "react";
import AddGameModal from "./AddGameModal";

class Games extends React.Component {

  // antd display the data in the table:
  columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Style",
      dataIndex: "style",
      key: "style",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "",
      key: "action",
      render: (_text, record) => (
        <Popconfirm title="Are you sure to delete this game?" onConfirm={() => this.deleteGame(record.id)} okText="Yes" cancelText="No">
          <a href="#" type="danger">
            Delete{" "}
          </a>
        </Popconfirm>
      ),
    },
  ];


  // hold the list in an array:
  state = {
    games: [],
  };

  componentDidMount() {
    this.loadGames();
  }


  // retrieve the list from the API controller:
  loadGames = () => {
    const url = "api/v1/games/index";
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        data.forEach((game) => {
          const newEl = {
            key: game.id,
            id: game.id,
            title: game.title,
            style: game.style,
            quantity: game.quantity,
          };

          this.setState((prevState) => ({
            games: [...prevState.games, newEl],
          }));
        });
      })
      .catch((err) => message.error("Error: " + err));
  };

  reloadGames = () => {
    this.setState({ games: [] });
    this.loadGames();
  };

  //the deletion call on the API and table reloading:
  deleteGame = (id) => {
    const url = `api/v1/games/${id}`;

    fetch(url, {
      method: "delete",
    })
      .then((data) => {
        if (data.ok) {
          this.reloadGames();
          return data.json();
        }
        throw new Error("Network error.");
      })
      .catch((err) => message.error("Error: " + err));
  };

  render() {
    return (
      <>
        <Table className="table-striped-rows" dataSource={this.state.games} columns={this.columns} pagination={{ pageSize: 5 }} />

        <AddGameModal reloadGames={this.reloadGames} />
      </>
    );
  }
}

export default Games;