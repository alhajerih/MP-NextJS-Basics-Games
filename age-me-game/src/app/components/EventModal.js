"use client";
/* EventModel responsible  to manage the display of the choices and milestones and close it  */
export default function EventModal({ show, message, onYes, onNo, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="event-message">{message}</h2>
        {onYes && onNo ? (
          <div className="modal-buttons">
            <button className="modal-btn yes" onClick={onYes}>
              Yes
            </button>
            <button className="modal-btn no" onClick={onNo}>
              No
            </button>
          </div>
        ) : (
          <button className="modal-btn close" onClick={onClose}>
            Close
          </button>
        )}
      </div>
    </div>
  );
}
