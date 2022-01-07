import {
    Redirect, Route,
  } from 'react-router-dom';

const ConditionalRoute = (props) => {
  const { condition } = props;

  if (condition) {
    return <Route {...props} />;
  }

  return <Redirect {...props} />;
};

export default ConditionalRoute;
