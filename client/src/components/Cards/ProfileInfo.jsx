import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <div className="d-flex align-items-center gap-3">
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ width: "48px", height: "48px" }}
      >
        <div
          className="bg-primary text-white fs-3 rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "48px", height: "48px", fontWeight: "bold" }}
        >
          {getInitials(userInfo?.username)}
        </div>
      </div>

      {/* Profile Username */}
      <div className="d-flex flex-column justify-content-center">
        <p className="small font-weight-bold mb-0">{userInfo?.username}</p>
      </div>

      {/* Logout Button */}
      <button className="btn btn-primary btn-sm text-white" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfileInfo;
