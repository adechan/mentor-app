import { makeStyles } from "@material-ui/styles";
import React from "react";
import SidebarItem from "../../common/SidebarItem";
import { useState } from "react";
import { useHistory } from "react-router-dom";

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
  const [selected, setSelected] = useState("");
  const history = useHistory();

  return (
    <div className={customClasses.container}>
      <SidebarItem
        itemTitle="Awards"
        onClick={() => {
          history.push('/student-account/awards')
          setSelected("Awards");
        }}
        selected={selected}
      />
      <SidebarItem
        itemTitle="Interests"
        onClick={() => {
          history.push("/student-account/interests");
          setSelected("Interests");
        }}
        selected={selected}
      />
      <SidebarItem
        itemTitle="Appointments"
        onClick={() => {
          history.push("/student-account/appointments");
          setSelected("Appointments")}}
        selected={selected}
      />
      <SidebarItem
        itemTitle="Recommendation"
        onClick={() => {
          history.push('/student-account/recommendations');
          setSelected("Recommendation")}}
        selected={selected}
      />
      <SidebarItem
        itemTitle="My Mentors"
        onClick={() =>{ 
          history.push('/student-account/my-mentors');
          setSelected("My Mentors")}}
        selected={selected}
      />
      <SidebarItem
        itemTitle="Settings"
        onClick={() => {
          history.push('/student-account/settings');
          setSelected("Settings")}}
        selected={selected}
      />
      <SidebarItem
        itemTitle="Switch profile"
        onClick={() => {
          history.push('/student-account/switch-profile');
          setSelected("Switch profile")}}
        selected={selected}
      />
      <SidebarItem
        itemTitle="Create a new profile"
        onClick={() => {
          history.push('/create-profile');
          setSelected("Create a new profile")}}
        selected={selected}
      />
    </div>
  );
};

export default Sidebar;
