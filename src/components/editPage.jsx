import React, { Component } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditPage = () => {
  const { id } = useParams();
  const [lieuNom, setLieuNom] = useState("");
  const [lieuPays, setLieuPays] = useState("");
  const [lieuRegion, setLieuRegion] = useState("");
  const [lieuType, setLieuType] = useState("");
  const [lieuLoc, setLieuLoc] = useState("");
  const [lieuDesc, setLieuDesc] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/demo/lieu/${id}`);
        const data = await response.json();
        setLieuNom(data.nom);
        setLieuPays(data.lieuPays);
        setLieuRegion(data.lieuRegion);
        setLieuType(data.lieuType);
        setLieuLoc(data.loc);
        setLieuDesc(data.desc);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Créez un objet avec les données de l'utilisateur
    const newLieu = {
      lieuNom: lieuNom,
      lieuPays: lieuPays,
      lieuRegion: lieuRegion,
      lieuType: lieuType,
      lieuLoc: lieuLoc,
      lieuDesc: lieuDesc,
    };

    try {
      // Envoyer la requête POST à l'API
      const response = await axios.put(
        "http://localhost:8080/demo/modiflieu/" +
          id +
          "?newNomLieu=" +
          newLieu.lieuNom +
          "&newLocalisation=" +
          newLieu.lieuLoc +
          "&newDescription=" +
          newLieu.lieuDesc +
          "&newLieuPays=" +
          newLieu.lieuPays +
          "&newLieuRegion=" +
          newLieu.lieuRegion +
          "&newLieuType=" +
          newLieu.lieuType,
        newLieu
      );
      console.log(response.data); // Afficher la réponse de l'API

      // Réinitialiser les champs du formulaire après l'ajout de l'utilisateur
      // setLieuNom("");
      // setLieuLoc("");
      // setLieuDesc("");
      // setLieuPays("");
      // setLieuRegion("");
      // setLieuType("");
      // Vérifier si un fichier est sélectionné
      if (selectedFile) {
        // Construire un objet FormData pour envoyer le fichier à l'API
        const formData = new FormData();
        formData.append("file", selectedFile, selectedFile.name);

        // Envoyer la requête POST à l'API pour transférer le fichier et obtenir le nom du document
        const fileResponse = await axios.post(
          `http://localhost:8080/demo/addphoto?idlieux=${response.data.idLieu}`,
          formData
        );

        console.log(fileResponse.data); // Afficher la réponse de l'API pour le transfert de fichier

        // Réinitialiser le champ de saisie de fichier après le transfert
        setSelectedFile(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom:
        <input
          type="text"
          value={lieuNom}
          onChange={(event) => setLieuNom(event.target.value)}
        />
      </label>
      <br />
      <label>
        Localisation:
        <input
          type="text"
          value={lieuLoc}
          onChange={(event) => setLieuLoc(event.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={lieuDesc}
          onChange={(event) => setLieuDesc(event.target.value)}
        />
      </label>
      <br />
      <label>
        Pays:
        <input
          type="text"
          value={lieuPays}
          onChange={(event) => setLieuPays(event.target.value)}
        />
      </label>
      <br />
      <label>
        Region:
        <input
          type="text"
          value={lieuRegion}
          onChange={(event) => setLieuRegion(event.target.value)}
        />
      </label>
      <br />
      <label>
        Type de lieu:
        <input
          type="text"
          value={lieuType}
          onChange={(event) => setLieuType(event.target.value)}
        />
      </label>
      <br />
      <label>
        Photo:
        <input
          type="file"
          onChange={(event) => setSelectedFile(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Ajouter un lieu</button>
    </form>
  );
};

export default EditPage;
