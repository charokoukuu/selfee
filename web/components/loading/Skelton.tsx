import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="m-8 flex h-64 items-center justify-center">
      <div className="animate-wave h-48 w-48 rounded-md bg-gray-300"></div>
    </div>
  );
};

export default Skeleton;
