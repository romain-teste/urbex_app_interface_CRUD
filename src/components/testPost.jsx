import React, { useState } from "react";
import axios from "axios";

const TestPost = () => {
  const [lieuNom, setLieuNom] = useState("");
  const [lieuPays, setLieuPays] = useState("");
  const [lieuRegion, setLieuRegion] = useState("");
  const [lieuType, setLieuType] = useState("");
  const [lieuLoc, setLieuLoc] = useState("");
  const [lieuDesc, setLieuDesc] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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
      const response = await axios.post(
        "http://localhost:8080/demo/addlieu?nomLieu=" +
          newLieu.lieuNom +
          "&localisation=" +
          newLieu.lieuLoc +
          "&description=" +
          newLieu.lieuDesc +
          "&lieuPays=" +
          newLieu.lieuPays +
          "&lieuRegion=" +
          newLieu.lieuRegion +
          "&lieuType=" +
          newLieu.lieuType +
          "&idAdmin=1",
        newLieu
      );
      console.log(response.data); // Afficher la réponse de l'API

      // Réinitialiser les champs du formulaire après l'ajout de l'utilisateur
      setLieuNom("");
      setLieuLoc("");
      setLieuDesc("");
      setLieuPays("");
      setLieuRegion("");
      setLieuType("");
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
      <button type="submit">Ajouter un lieu</button>
    </form>
  );
};

export default TestPost;
