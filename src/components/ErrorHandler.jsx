import React from 'react';

const ErrorHandler = (props) => {
  const {errCode, errText} = props.location.state
  if(errCode === 500) return (
    <div className='error-div'>
      <h1>Something broke. Try it again later...</h1>
    </div>
  )
  else return (
    <div className='error-div'>
      <h1>{`${errCode} Page ${errText}`} </h1>
    </div>
  );
};

export default ErrorHandler;