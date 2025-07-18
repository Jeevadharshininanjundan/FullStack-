import {Navigate} from "react-router-dom";
import {useUser} from '../context/AuthContext.jsx';

const PrivateRoute = ({children}) => {
    const {user,loading} = useUser();

     console.log("Loading:", loading);
     console.log("User :", user);
    if(loading){
        return <p className="text-white text-center p-4">Loading...</p>;
    }
    if (!user) {
        return <Navigate to="/login" replace/>
    }
    return children;
};

export default PrivateRoute ;