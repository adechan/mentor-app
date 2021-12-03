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

  const [hasStudentAccount, setHasStudentAccount] = useState(true);

  return (
    <div className={customClasses.container}>
      <SidebarItem
        itemTitle="Reviews"
        onClick={() => {
          history.push("/mentor-account/reviews");
          setSelected("Reviews");
        }}
        selected={selected}
      />
      <SidebarItem
        itemTitle="Mentoring"
        onClick={() => {
          history.push("/mentor-account/mentoring");
          setSelected("Mentoring");
        }}
        selected={selected}
      />
      <SidebarItem
        itemTitle="Appointments"
        onClick={() => {
          history.push("/mentor-account/appointments");
          setSelected("Appointments");
        }}
        selected={selected}
      />
      <SidebarItem
        itemTitle="My Students"
        onClick={() => {
          history.push("/mentor-account/my-students");
          setSelected("My Students");
        }}
        selected={selected}
      />
      <SidebarItem
        itemTitle="Settings"
        onClick={() => {
          history.push("/mentor-account/settings");
          setSelected("Settings");
        }}
        selected={selected}
      />

      {hasStudentAccount ? (
        <SidebarItem
          itemTitle="Switch to student"
          onClick={() => {
            history.push("/student-account");
            setSelected("Switch profile");
          }}
          selected={selected}
        />
      ) : (
        <SidebarItem
          itemTitle="Create a new profile"
          onClick={() => {
            history.push("/create-profile-student/basic");
            setSelected("Create a new profile");
          }}
          selected={selected}
        />
      )}
    </div>
  );
};

export default Sidebar;
