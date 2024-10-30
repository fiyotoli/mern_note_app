import React from "react";

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-5">
      <img src={imgSrc} alt="No notes" className="w-75" style={{ maxWidth: "300px" }} />

      <p className="text-center text-muted" style={{ maxWidth: "400px", fontSize: "0.875rem", marginTop: "1.25rem" }}>
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
