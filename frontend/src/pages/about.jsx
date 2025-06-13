import React from "react";
import AgencySection from "../components/agency.about.jsx";
import TeamMembersSection from "../components/teampanel.about.jsx";

function AbouUs() {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <div className="w-screen h-[300px]  relative font-inter">
        <img
          src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-full w-full object-none z-0 "
        />
        <div className="absolute w-full h-full bg-gray-950/50  top-0 left-0 z-40 flex place-content-center items-center">
          <p className="text-5xl font-extrabold text-white"> About us</p>
        </div>
      </div>
      <div className="w-screen h-auto">
        <AgencySection />
      </div>

      <div className="w-screen lg:h-[450px]  mb-10 flex items-center lg:pl-10 lg:pt-10 relative  max-lg:flex max-lg:flex-col max-lg:gap-y-2 max-lg:p-2 md:h-[800px] ">
        <div className="lg:w-[600px] lg:h-[90%] lg:rounded-2xl z-0 lg:absolute lg:left-[290px] max-lg:w-full max-lg:h-[50%] ">
          <img
            src="https://images.unsplash.com/photo-1603201667141-5a2d4c673378?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlYW18ZW58MHwwfDB8fHwy"
            className=" rounded-2xl w-full h-full "
            alt=""
          />
        </div>
        <div className="lg:w-[410px] lg:h-[70%] lg:rounded-2xl lg:absolute lg:right-[330px] lg:border-6 z-10 border-white  max-lg:w-full max-lg:h-[50%]">
          {" "}
          <img
            src="https://images.unsplash.com/photo-1603202662747-00e33e7d1468?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="rounded-2xl w-full h-full"
          />
        </div>
      </div>

      <div className="w-screen h-auto">
        <TeamMembersSection />
      </div>
    </div>
  );
}

export default AbouUs;
