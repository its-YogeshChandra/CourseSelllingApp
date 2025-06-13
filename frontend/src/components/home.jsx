import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BigCardHome from "./subCompnents/bigCard.home.jsx";
import CourseSection from "./subCompnents/courseSection.jsx";
import CourseCatalogue from "./subCompnents/courseCatalogue.jsx";
import EducationSection from "./subCompnents/educationSection.jsx";
import TeacherSection from "./subCompnents/teacherSection.jsx";
import StatisticsSection from "./subCompnents/statisticsSection.jsx";
import Membership from "./subCompnents/membership.jsx";
import Footer from "./footer.jsx";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <BigCardHome />
      <CourseSection />
      <CourseCatalogue />
      <EducationSection />
      <StatisticsSection />
      <Membership />
      <TeacherSection />
      <Footer />
    </div>
  );
}
