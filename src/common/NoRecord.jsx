import React from 'react';

function NoRecord() {
  return (
    <div className="inactive p-3 bg-white mb-3 h-40 flex justify-center">
      <p className="border border-pdfRed rounded-md px-5 py-2 w-50p m-auto text-center text-lg text-pdfRed">
        No records found
      </p>
    </div>
  );
}

export default NoRecord;