"use client";
import { useState } from "react";

const MainContainer = () => {
  const [transcript, setTranscript] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("audio", file);

      try {
        const response = await fetch("http://localhost:8000/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setTranscript(result.transcript);
        } else {
          console.error("Failed to upload audio file");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <div>
        <strong>Transcription:</strong>
      </div>
    </div>
  );
};

export default MainContainer;
