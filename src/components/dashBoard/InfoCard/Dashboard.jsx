import React from 'react';
import PropTypes from 'prop-types';

const InfoCard = ({ icon, count, label, bgColor }) => {
  return (
    <div className="flex items-center bg-white p-4 shadow rounded-lg">
      <div className={`flex items-center justify-center h-12 w-12 rounded-full ${bgColor}`}>
        {icon}
      </div>
      <div className="ml-4">
        <h2 className="text-xl font-bold">{count.toLocaleString()}</h2>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  icon: PropTypes.element.isRequired,
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

const Dashboard = ({ cardsData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      {cardsData.map((card, index) => (
        <InfoCard
          key={index}
          icon={card.icon}
          count={card.count}
          label={card.label}
          bgColor={card.bgColor}
        />
      ))}
    </div>
  );
};

Dashboard.propTypes = {
  cardsData: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element.isRequired,
      count: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      bgColor: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Dashboard;
