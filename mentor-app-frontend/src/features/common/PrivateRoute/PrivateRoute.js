import { useSelector } from "react-redux";
import ConditionalRoute from "../ConditionalRoute/ConditionalRoute";

const PrivateRoute = (props) => {
    const isLoggedIn = useSelector((store) => store.account.accountId);

    return (
        <ConditionalRoute
          to="/login"
          {...props}
          condition={Boolean(isLoggedIn)}
        />
      );
}

export default PrivateRoute
