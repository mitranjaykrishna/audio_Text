"use client";
import ContentComponent from "@/components/ContentComponent";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import "./mainContainer.css";

const MainContainer = () => {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState([]);
  const backgroundMainContainer = {
    backgroundImage: `url("/bg.jpg")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

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

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: transcript }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setSummary(result?.summary?.content?.split("\n"));
      } else {
        console.error("Failed to generate key pointer");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  useEffect(() => {
    console.log(summary);
  }, [summary]);

  return (
    <div
      className="  flex flex-col justify-between gap-5 items-center p-8"
      style={backgroundMainContainer}
    >
      <div className="w-full flex flex-col lg:flex-row justify-between  items-center">
        <h1 className="text-[40px] font-bold text-[#fff]">Call Summary</h1>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 uploadBG">
          <p className="lg:text-[20px] font-semibold text-[#fff]">
            {" "}
            Upload Your Audio File here
          </p>
          <div>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="text-[#a4d751] lg:text-[20px]"
            />
          </div>

          {/* <div>
            <strong>Transcription:</strong>
          </div> */}
          <Button
            variant="contained"
            sx={{ background: "blue !important" }}
            onClick={handleClick}
          >
            <p className="text-[#]">Generate Key Pointer</p>
          </Button>
        </div>
        {/* <div className="" > */}

        {/* </div> */}
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <ContentComponent
          heading={"Call Text"}
          bg={"/callBG.png"}
          whiteText={true}
          data={transcript}
          summary={false}
        />

        <ContentComponent
          heading={"Summarized"}
          bg={"summaryBG.jpg"}
          data={summary}
          summary={true}
        />
      </div>
    </div>
  );
};

export default MainContainer;
