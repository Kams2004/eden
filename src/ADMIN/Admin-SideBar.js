import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../AuthContext";
import "./Admin-SideBar.css";

const Sidebar = ({ onItemClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation("admin");
  const { user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 473 && isExpanded) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const handleItemClick = (item) => {
    onItemClick(item);
  };

  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className={`admin-sidebar-container ${isExpanded ? "admin-sidebar-expanded" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="admin-sidebar admin-sidebar-warp">
        <div className="admin-sidebar-user-container">
          <div className="admin-user-initials">
            {getUserInitials(user?.name || "User")}
          </div>
          {isExpanded && user?.accessToken && (
            <div className="admin-sidebar-user-info">
              <p>{t("helloUser", { name: user.name })}</p>
              <small>{user.email}</small>
            </div>
          )}
        </div>

        <nav className="admin-sidebar-nav">
          <ul>
            <li onClick={() => handleItemClick("Users")}>
              <i className="bi bi-person"></i>
              {isExpanded && <span>{t("users")}</span>}
            </li>
            <li onClick={() => handleItemClick("Groups")}>
              <i className="bi bi-people"></i>
              {isExpanded && <span>{t("groups")}</span>}
            </li>
            <li onClick={() => handleItemClick("Doctors")}>
              <i className="bi bi-person-fill"></i>
              {isExpanded && <span>{t("doctors")}</span>}
            </li>
            <li onClick={() => handleItemClick("Requests")}>
              <i className="bi bi-file-earmark-text"></i>
              {isExpanded && <span>{t("requests")}</span>}
            </li>
            {/* <li onClick={() => handleItemClick("Patients")}>
              <i className="bi bi-person-lines-fill"></i>
              {isExpanded && <span>{t("patients")}</span>}
            </li>
            <li onClick={() => handleItemClick("Doctors/Prescriptions")}>
              <i className="bi bi-file-earmark-medical"></i>
              {isExpanded && <span>{t("doctorsPrescriptions")}</span>}
            </li> */}
            <li onClick={() => handleItemClick("Settings")}>
              <i className="bi bi-gear"></i>
              {isExpanded && <span>{t("settings")}</span>}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
