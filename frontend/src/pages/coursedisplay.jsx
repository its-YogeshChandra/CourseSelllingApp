import CourseDisplayCard from "../components/courseDisplay.card";
import CourseInfo from "../components/courseInfoandReview";
import CourseContent from "../components/coursecontent.jsx";
import CourseBuyCard from "../components/courseBuyCard.jsx";
import CourseInstSection from "../components/courseInstruc.jsx";

export default function CourseDisplay() {
  //check the id from the query params and use it to fetch the data 
  
  return (
    <div className="w-screen h-screen gap-y-4">
      <CourseDisplayCard />
      <div className="w-full min-h-[800px] mt-5 flex flex-col gap-x-3 items-center lg:flex lg:flex-row  ">
        <div className="w-full h-max flex flex-col md:px-3 lg:ml-10">
          <CourseInfo />
          <CourseContent />
        </div>
        <div className="w-screen h-max px-5 ">
          <CourseBuyCard />
          <CourseInstSection />
        </div>
      </div>
    </div>
  );
}
