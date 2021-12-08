import { useContext } from "react";
import "../../styles/css/main.css";
import Header from "./Header";
import UserContext from "../../contexts/users";
import { getTodayDateString } from '../../utils/date'

const Profile = () => {
    const { userId } = useContext(UserContext).state;

    return (
        <div className="home-layout">
            <Header />
            <div className="page">
                <div className="follow-layout">
                    <div>아이디: {userId}</div>
                    <div>{getTodayDateString()}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile;