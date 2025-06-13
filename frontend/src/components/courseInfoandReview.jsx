"use client";

import { useState } from "react";

export default function CourseInfo() {
  const [activeTab, setActiveTab] = useState("course-info");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("course-info")}
          className={`pb-3 px-1 mr-8 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "course-info"
              ? "text-red-500 border-red-500"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
        >
          Course Info
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "reviews"
              ? "text-red-500 border-red-500"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
        >
          Reviews
        </button>
      </div>

      {/* Course Info Tab Content */}
      {activeTab === "course-info" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            About Course
          </h2>

          <div className="relative">
            <div
              className={`text-gray-600 leading-relaxed ${
                !isExpanded ? "max-h-32 overflow-hidden" : ""
              }`}
            >
              <p className="mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>

              {isExpanded && (
                <>
                  <p className="mb-4">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source.
                  </p>

                  <p className="mb-4">
                    Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
                    Finibus Bonorum et Malorum" (The Extremes of Good and Evil)
                    by Cicero, written in 45 BC. This book is a treatise on the
                    theory of ethics, very popular during the Renaissance. The
                    first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                    comes from a line in section 1.10.32.
                  </p>

                  <p>
                    The standard chunk of Lorem Ipsum used since the 1500s is
                    reproduced below for those interested. Sections 1.10.32 and
                    1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are
                    also reproduced in their exact original form, accompanied by
                    English versions from the 1914 translation by H. Rackham.
                  </p>
                </>
              )}
            </div>

            {/* Gradient overlay when collapsed */}
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            )}
          </div>

          {/* Show More/Less Button */}
          <button
            onClick={toggleExpanded}
            className="flex items-center justify-between w-full mt-6 py-3 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <span className="font-medium">
              {isExpanded ? "Show Less" : "Show More"}
            </span>
            <span
              className={`text-xl transition-transform duration-200 ${
                isExpanded ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          </button>
        </div>
      )}

      {/* Reviews Tab Content */}
      {activeTab === "reviews" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>

          {/* Upper Review Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">{"★".repeat(5)}</div>
              <span className="text-gray-600 text-sm">4.8 out of 5 stars</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Overall Rating
                </h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center">
                      <span className="text-sm text-gray-600 w-8">
                        {stars}★
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{
                            width: `${
                              stars === 5
                                ? 70
                                : stars === 4
                                ? 20
                                : stars === 3
                                ? 5
                                : stars === 2
                                ? 3
                                : 2
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {stars === 5
                          ? "70%"
                          : stars === 4
                          ? "20%"
                          : stars === 3
                          ? "5%"
                          : stars === 2
                          ? "3%"
                          : "2%"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Review Summary
                </h3>
                <p className="text-gray-600 text-sm">
                  Students love this course for its comprehensive content and
                  practical approach. Most reviews highlight the clear
                  explanations and hands-on projects.
                </p>
              </div>
            </div>
          </div>

          {/* Lower Review Section - Individual Reviews */}
          <div className="space-y-6">
            <h3 className="font-semibold text-gray-900">Student Reviews</h3>

            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  J
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-medium text-gray-900 mr-2">
                      John Smith
                    </h4>
                    <div className="flex text-yellow-400 text-sm mr-2">
                      {"★".repeat(5)}
                    </div>
                    <span className="text-gray-500 text-sm">2 weeks ago</span>
                  </div>
                  <p className="text-gray-600">
                    Excellent course! The instructor explains complex concepts
                    in a very understandable way. The practical projects really
                    helped me apply what I learned. Highly recommended!
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-medium text-gray-900 mr-2">
                      Sarah Johnson
                    </h4>
                    <div className="flex text-yellow-400 text-sm mr-2">
                      {"★".repeat(4)}
                      <span className="text-gray-300">★</span>
                    </div>
                    <span className="text-gray-500 text-sm">1 month ago</span>
                  </div>
                  <p className="text-gray-600">
                    Great content and well-structured lessons. The only thing
                    I'd improve is adding more advanced topics, but overall it's
                    a solid course for beginners to intermediate learners.
                  </p>
                </div>
              </div>
            </div>

            <div className="pb-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-medium text-gray-900 mr-2">
                      Mike Chen
                    </h4>
                    <div className="flex text-yellow-400 text-sm mr-2">
                      {"★".repeat(5)}
                    </div>
                    <span className="text-gray-500 text-sm">3 weeks ago</span>
                  </div>
                  <p className="text-gray-600">
                    This course exceeded my expectations. The hands-on approach
                    and real-world examples made learning enjoyable and
                    effective. Worth every penny!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
