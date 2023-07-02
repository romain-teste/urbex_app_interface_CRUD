import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { photoPlace } from "../api";

const PlaceCard = ({ place, photo }) => {
  const [photos, setPhoto] = useState([]);

  useEffect(() => {
    const fetchPhoto = async () => {
      const dataPhoto = await photoPlace(place.id);
      setPhoto(dataPhoto);
      console.log(dataPhoto);
    };

    fetchPhoto();
  }, [place.id]);
  console.log(photos.path);
  return (
    <div>
      <h3>{place.nom}</h3>
      {photos.length > 0 && (
        <img
          src={`${process.env.PUBLIC_URL}/img/${photos[0].path}`}
          alt={photos[0].path}
        />
      )}
      <p>Type: {place.lieuType}</p>
      <p>Pays: {place.lieuPays}</p>
      <p>Région: {place.lieuRegion}</p>
      <Link to={`/place/${place.id}`}>Voir les détails</Link>
    </div>
  );
};

export default PlaceCard;
