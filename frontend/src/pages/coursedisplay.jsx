import CourseDisplayCard from "../components/courseDisplay.card";
import CourseInfo from "../components/courseInfoandReview";
import CourseContent from "../components/coursecontent.jsx";
import CourseBuyCard from "../components/courseBuyCard.jsx";
import CourseInstSection from "../components/courseInstruc.jsx";
import { useSearchParams } from "react-router";
import { courseServices } from "../services/courseService.js";
import { useEffect } from "react";
import { useState } from "react";
import Footer from "../components/footer.jsx";

export default function CourseDisplay() {
  const [courseVal, setCourseVal] = useState();
  const [lessonVal, setLessonVal] = useState();

  //check the id from the query params and use it to fetch the data
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("id");

  // fetch data from backend using this id
  useEffect(() => {
    const func = async () => {
      const combinedData = await courseServices.getCourseandLessonData(
        courseId
      );

      //set data into the state variables
      setCourseVal(combinedData.data.course);
      setLessonVal(combinedData.data.lessons);
    };
    func();
  }, []);

  return (
    <div className="w-screen h-screen gap-y-4">
      <CourseDisplayCard courseData={courseVal} />
      <div className="w-full min-h-[800px] mt-5 flex flex-col gap-x-3 items-center lg:flex lg:flex-row  ">
        <div className="w-full h-max flex flex-col md:px-3 lg:ml-10">
          <CourseInfo courseData={courseVal} />
          <CourseContent lessonData={lessonVal} />
        </div>
        <div className="w-screen h-max px-5 ">
          <CourseBuyCard courseData = {courseVal} />
          <CourseInstSection />
        </div>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
