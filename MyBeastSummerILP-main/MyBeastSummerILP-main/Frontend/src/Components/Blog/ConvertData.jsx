import React from 'react';

const ConvertDate = ({ dateString }) => {
  // Convert the date string to a Date object
  const date = new Date(dateString);

  // Options for toLocaleString() to display day, date, month, and time
  const options = {
    weekday: 'long', // long, short, narrow
    year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
    day: 'numeric', // numeric, 2-digit
    hour: '2-digit', // numeric, 2-digit
    minute: '2-digit', // numeric, 2-digit
    second: '2-digit', // numeric, 2-digit
    hour12: true // Use 12-hour time
  };

  // Format the date according to the specified options
  const formattedDate = date.toLocaleString('en-US', options);

  return (
    <>
      {formattedDate}
    </>
  );
};


export default ConvertDate;