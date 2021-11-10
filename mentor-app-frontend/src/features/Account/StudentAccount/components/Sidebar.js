import { makeStyles } from "@material-ui/styles";
import React from "react";
import SidebarItem from "../../common/SidebarItem";

const customStyles = makeStyles((theme) => ({
  container: {
    height: "calc(100vh - 60px)",
    width: "200px",
    backgroundColor: "#ffffff5c",
    backdropFilter: "blur(10px)",
  },
}));

const Sidebar = () => {
  const customClasses = customStyles();

  return (
    <div className={customClasses.container}>
      <SidebarItem itemTitle="Awards" />
      <SidebarItem itemTitle="Groups" />
      <SidebarItem itemTitle="Interests" />
      <SidebarItem itemTitle="Appointments" />
      <SidebarItem itemTitle="Recommendation" />
      <SidebarItem itemTitle="My Mentors" />
      <SidebarItem itemTitle="Settings" />
      <SidebarItem itemTitle="Switch profile" />
      <SidebarItem itemTitle="Create a new profile" />
    </div>
  );
}

export default Sidebar;
