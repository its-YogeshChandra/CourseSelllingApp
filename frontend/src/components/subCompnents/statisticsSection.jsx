import { GraduationCap, FileText, Trophy, Users } from "lucide-react";

export default function StatisticsSection() {
  return (
    <div className="h-max bg-white font-inter mt-5">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We Are Proud
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            You don't have to struggle alone, you've got our assistance and
            help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <StatCard
            icon={<GraduationCap className="w-8 h-8" />}
            number="15k"
            label="Successfully Trained"
          />
          <StatCard
            icon={<FileText className="w-8 h-8" />}
            number="60k"
            label="Students Enrolled"
          />
          <StatCard
            icon={<Trophy className="w-8 h-8" />}
            number="80k"
            label="Satisfaction Rate"
          />
          <StatCard
            icon={<Users className="w-8 h-8" />}
            number="15k"
            label="Students Community"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, number, label }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
        <div className="text-red-500">{icon}</div>
      </div>
      <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
        {number}
      </div>
      <div className="text-gray-700 font-medium">{label}</div>
    </div>
  );
}
