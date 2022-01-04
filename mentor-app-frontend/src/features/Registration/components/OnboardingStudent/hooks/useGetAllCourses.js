import { request, gql } from "graphql-request";
import {useState} from "react";

const useGetAllCourses = () => {
  const query = gql`
    query getAllCourses {
    get_all_courses {
        course_id
        course_title
     }
    }
  `;

    const [courses, setCourses] = useState([{id: 0, title: "Math"}]) // [{id, title}, ...]
   request("http://127.0.0.1:8080/graphql", query).then((data) =>
      console.log(data)
    );
 
  return courses;
};

export default useGetAllCourses;
