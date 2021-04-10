import axios from "axios";
import React, { useState, useEffect } from "react";

export function Feed() {
  const [dataFeed, setDataFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/voiceets")
      .then((response) => {
        setLoading(false);
        setDataFeed(response.data.voiceets);
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <>
      <h2>Last Voiceets</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        dataFeed.length > 0 &&
        dataFeed.map((voiceet) => (
          <li key={voiceet._id}>
            {voiceet.audio} - <b>{voiceet.user}</b>
          </li>
        ))
      )}
    </>
  );
}
