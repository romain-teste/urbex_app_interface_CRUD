import React, { Component } from "react";
import { useState } from "react";
import TestPost from "./testPost";

class TestGet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/demo/alllieu")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  handleDelete(itemId) {
    fetch(`http://localhost:8080/demo/lieu/suppr/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        // Mettre à jour l'état pour refléter la suppression de l'élément
        this.setState((prevState) => ({
          items: prevState.items.filter((item) => item.id !== itemId),
        }));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression :", error);
      });
  }

  handleEdit(item) {
    const url = `/edit/${item.id}`;
    window.open(url, "_blank");
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <React.Fragment>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                id:{item.id} / nom:{item.nom} / pays:{item.lieuPays} / Region:
                {item.lieuRegion} / type de lieu:{item.lieuType} / localisation:
                {item.loc} / description:{item.desc}
                <button onClick={() => this.handleDelete(item.id)}>
                  Supprimer le lieu
                </button>
                <button onClick={() => this.handleEdit(item)}>
                  Modifier le lieu
                </button>
              </li>
            ))}
          </ul>
          <div>
            <h1>Ajouter un utilisateur</h1>
            <TestPost />
          </div>
        </React.Fragment>
      );
    }
  }
}
export default TestGet;
