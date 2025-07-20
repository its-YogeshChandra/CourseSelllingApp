import { useSelector } from "react-redux";

const useRandomCourses = () => {
  const arrVal = useSelector((state) => state.courseData.allcourses);

  const shuffled = [...arrVal];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, 6);
};
export { useRandomCourses };
