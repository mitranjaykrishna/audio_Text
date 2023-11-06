import React from "react";
import "./contentComponent.css";

const ContentComponent = ({ heading, data, bg, whiteText, summary }) => {
  const backgroundStyle = {
    backgroundImage: `url(${bg})`, // Replace with the actual path to your image
    backgroundSize: "cover", // Adjust as needed
    backgroundRepeat: "no-repeat", // Adjust as needed
    backgroundPosition: "center", // Adjust as needed
    borderRadius: "10px",
    minHeight: "500px",
    // minWidth: "45vw",
    // maxWidth: "45vw",
  };
  const contentArray = data?.content?.split("\n");

  console.log(data);
  return (
    <div
      className={`flex flex-col  items-center gap-3 p-5 min-w-[80vw] lg:min-w-[45vw] max-w-[80vw] lg:max-w-[45vw] `}
      style={backgroundStyle}
    >
      <h1
        className={`${
          whiteText ? "whiteText" : "blackText"
        } font-semibold text-[25px]`}
      >
        {heading}
      </h1>
      {!summary ? (
        <div className={`${whiteText ? "whiteText" : "blackText"}`}>{data}</div>
      ) : (
        <ul>
          {data?.map((item) => {
            return <li>{item}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default ContentComponent;
