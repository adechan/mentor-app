import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import SidebarItem from "../../common/SidebarItem";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { accountActions } from "../../../../store/slices/accountSlice";

const customStyles = makeStyles((theme) => ({
  container: {
    height: "calc(100vh - 60px)",
    width: "200px",
    backgroundColor: "#ffffff5c",
    backdropFilter: "blur(10px)",

    [theme.breakpoints.down('xs')]: {
      height: 'auto',
      width: '100vw'
    }
  },
}));

const Sidebar = () => {
  const customClasses = customStyles();
  const [selected, setSelected] = useState("");
  const history = useHistory();

  const  dispatch = useDispatch();
  const profiles = useSelector((store) => store.account.profiles);

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

      {profiles.studentId ? (
        <SidebarItem
          itemTitle="Switch to student"
          onClick={() => {
            history.push("/student-account/awards");
            setSelected("Switch profile");
            dispatch(accountActions.SET_SELECTED_PROFILE_ID(profiles?.studentId));
          }}
          selected={selected}
        />
      ) : (
        <SidebarItem
          itemTitle="Create student profile"
          onClick={() => {
            history.push("/mentor-account/create-student/basic");
            setSelected("Create a new profile");
          }}
          selected={selected}
        />
      )}
    </div>
  );
};

export default Sidebar;
