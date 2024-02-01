import React from 'react';
import "../CSS-files/Home.css"

const DataItem = ({ number, platform, ltp, bsp, diff, save }) => {
  // Extracting the numeric part from the save value
  const saveValue = parseFloat(save.replace(/[^\d.-]/g, ''));

  // Calculating the diff percentage and handling NaN
  const diffValue = parseFloat(diff);
  const formattedDiff = isNaN(diffValue) ? '0.00%' : `${diffValue.toFixed(2)}%`;

  // Function to determine the color based on the value
  const getTextClass = (value) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      return numericValue > 0 ? 'positive' : 'negative';
    }
    return '';
  };

  return (
    <div className='datadata'>
      <div className="datadatatext" id='datadatafirst'>{number}</div>
      <div className="datadatatext" id='datadataplatform'>{platform}</div>
      <div className={`datadatatext`} id='datadataltp'>{ltp}</div>
      <div className={`datadatatext`} id='datadatabsp'>{bsp}</div>
      <div className={`datadatatext ${getTextClass(formattedDiff)}`} id='datadatadiff'>{formattedDiff}</div>
      <div className={`datadatatext ${getTextClass(saveValue)}`} id='datadatasave'>{save}</div>
    </div>
  );
};

export default DataItem;
