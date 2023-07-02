import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaceById, comPlace, photoPlace } from "../api";
import axios from "axios";
import { supprPlace, supprPhoto, supprCom } from "../api";
import { useNavigate } from "react-router-dom";

const PlaceDetail = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [com, setCom] = useState(null);
  const [photos, setPhoto] = useState([]);
  const [lieuNom, setLieuNom] = useState("");
  const [lieuPays, setLieuPays] = useState("");
  const [lieuRegion, setLieuRegion] = useState("");
  const [lieuType, setLieuType] = useState("");
  const [lieuLoc, setLieuLoc] = useState("");
  const [lieuDesc, setLieuDesc] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlace = async () => {
      const data = await getPlaceById(id);
      setPlace(data);
      setLieuNom(data.nom);
      setLieuLoc(data.loc);
      setLieuDesc(data.desc);
      setLieuPays(data.lieuPays);
      setLieuRegion(data.lieuRegion);
      setLieuType(data.lieuType);
    };
    const fetchCom = async () => {
      const dataCom = await comPlace(id);
      console.log("dataCom=" + dataCom);
      setCom(dataCom);
    };
    const fetchPhoto = async () => {
      const dataPhoto = await photoPlace(id);
      setPhoto(dataPhoto);
      console.log(dataPhoto);
    };

    fetchPhoto();
    fetchCom();
    fetchPlace();
  }, [id]);

  if (!place) {
    return <div>Loading...</div>;
  }

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
        const fileData = new Blob([selectedFile], { type: selectedFile.type });
        formData.append("file", fileData, selectedFile.name);
        console.log(selectedFile.name);

        // Envoyer la requête POST à l'API pour transférer le fichier et obtenir le nom du document
        const fileResponse = await axios.post(
          `http://localhost:8080/demo/photo/addphoto?idlieux=${id}&path=${selectedFile.name}`
        );

        console.log(fileResponse.data); // Afficher la réponse de l'API pour le transfert de fichier

        // Réinitialiser le champ de saisie de fichier après le transfert
        setSelectedFile(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSupprPlace = async (id) => {
    const response = await supprPlace(id);
    console.log(response);
    // Rediriger vers la page d'accueil
    navigate("/");
  };

  const handleSupprPhoto = async (idPhoto) => {
    console.log(idPhoto);
    const response = await supprPhoto(idPhoto);
    console.log(response);
    // Rediriger vers la page d'accueil
  };

  const handleSupprCom = async (idCom) => {
    const response = await supprCom(idCom);
    console.log(response);
    // Rediriger vers la page d'accueil
  };

  return (
    <div>
      {/* <h2>{place.nom}</h2>
      <p>Type: {place.lieuType}</p>
      <p>Pays: {place.lieuPays}</p>
      <p>Région: {place.lieuRegion}</p>
      <p>Description: {place.desc}</p> */}
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
            onChange={(event) => setSelectedFile(event.target.files[0])}
          />
        </label>
        <br />
        <button type="submit">Modifier un lieu</button>
      </form>
      <br />
      <button onClick={() => handleSupprPlace(id)}>Supprimer le lieu</button>
      <br />
      {photos.map((photo) => (
        <div key={photo.idPhoto}>
          <img
            src={`${process.env.PUBLIC_URL}/img/${photo.path}`}
            alt={photo.path}
          />
          <button onClick={() => handleSupprPhoto(photo.idPhoto)}>
            Supprimer la Photo
          </button>
        </div>
      ))}
      {com.map((comment) => (
        <div key={comment.idCom}>
          <p>commentaire n°{comment.idCom}</p>
          <p>{comment.texteCom}</p>
          <button onClick={() => handleSupprCom(comment.idCom)}>
            Supprimer le commentair
          </button>
        </div>
      ))}
      {/* Ajoutez le carrousel des photos et la zone de commentaires ici */}
    </div>
  );
};

export default PlaceDetail;
