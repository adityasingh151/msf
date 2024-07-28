import React from "react";

const RewardsSection = React.forwardRef(({ title, rewards }, ref) => {
    return (
      <section
        ref={ref}
        data-animation="animate-slide-in-bottom"
        className="py-4 bg-gradient-to-r from-indigo-50 to-blue-100"
      >
        <div className="container mx-auto px-8">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
              {title}
            </h2>
            <table className="w-full text-lg leading-relaxed text-gray-700">
              <thead>
                <tr>
                  <th className="text-left">For Students</th>
                  <th className="text-left">For Schools</th>
                </tr>
              </thead>
              <tbody>
                {rewards.map((reward, index) => (
                  <tr key={index}>
                    <td className="p-4 border-b border-gray-300">{reward.students}</td>
                    <td className="p-4 border-b border-gray-300">{reward.schools}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  });
  
  export default RewardsSection;
  