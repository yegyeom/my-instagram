import { useContext } from "react";
import "../../styles/css/main.css";
import Header from "./Header";
import UserContext from "../../contexts/users";
import { getTodayDateString } from '../../utils/date'

const Profile = () => {
    const { user } = useContext(UserContext).state;

    return (
        <div className="home-layout">
            <Header />
            <div className="page">
                <span>{user.userId}</span>
                <span>{getTodayDateString()}</span>
            </div>
        </div>
    )
}

export default Profile;