import CheckoutComponent from "../components/cartComponents";
import Footer from "../components/footer.jsx";
import { useSearchParams } from "react-router";

export default function Cart() {
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");
  const values = searchParams.get("data");
  const studentId = searchParams.get("studentId");
  return (
    <div className=" min-h-screen h-auto">
      <CheckoutComponent courseId={values} studentId={studentId} />

      <div className="w-full h-auto mt-3 font-inter pb-10 bg-gray-200">
        <div className=" py-16 px-4 ">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore More Learning Opportunities
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Ready to expand your knowledge? Check out our other courses and
              take your skills to the next level.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-lg">
              Check Our Other Courses
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-auto">
        <Footer />
      </div>
    </div>
  );
}
