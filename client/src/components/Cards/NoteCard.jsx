import React, { useState } from "react";
import { MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  onEdit,
  onDelete,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleReadMore = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="border rounded p-4 bg-white shadow-sm hover:shadow-lg transition-shadow duration-200 d-flex flex-column" style={{ height: "100%" }}>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h6 className="h6 text-primary text-capitalize">{title}</h6>
          <span className="small text-success">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
      </div>

      <p className="small text-muted mt-2">{content?.slice(0, 60)}...</p>

      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="small text-muted">
          {tags.map((item) => (
            <span key={item} className="me-1">
              #{item}
            </span>
          ))}
        </div>

        <div className="d-flex gap-2 my-2">
          <MdCreate
            className="icon-btn text-primary hover:text-success-emphasis"
            onClick={onEdit}
          />

          <MdDelete
            className="icon-btn text-danger hover:text-danger-emphasis"
            onClick={onDelete}
          />
        </div>
      </div>

      <button
        className="btn btn-primary text-white mt-auto" // mt-auto pushes the button to the bottom
        onClick={handleReadMore}
      >
        Read More
      </button>

      {/* Modal for displaying full content */}
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div 
            className="modal-overlay" 
            onClick={handleCloseModal}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black
              zIndex: 999, // Ensures it covers everything
            }}
          />
          
          <div className="modal fade show" style={{ display: "block", zIndex: 1000 }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{title}</h5>
                  <button type="button" className="close ms-auto btn btn-primary text-white" onClick={handleCloseModal}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <p>{content}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger  text-white" onClick={handleCloseModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteCard;
