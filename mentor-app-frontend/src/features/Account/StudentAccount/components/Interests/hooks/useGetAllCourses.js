import { request, gql } from "graphql-request";
import { useState, useEffect } from "react";

const useGetAllCourses = () => {
  const query = gql`
    query getAllCourses {
      get_all_courses {
        course_id
        course_title
      }
    }
  `;

  const [courses, setCourses] = useState([]); 

  const getAllCourses = async () => {
    const data = await request("http://127.0.0.1:8080/graphql", query);

    const coursesData = data?.get_all_courses;
    if (coursesData && !coursesData.length) {
      setCourses([]);
    }

    let foundCourses = [];
    coursesData.forEach((courseData) => {
      const course = {
        id: courseData.course_id,
        label: courseData.course_title,
      };

      foundCourses.push(course);
    });

    setCourses(foundCourses);
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return courses;
};

export default useGetAllCourses;
