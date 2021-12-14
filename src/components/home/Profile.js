import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import UserContext from "../../contexts/users";
import { getTodayDateString } from '../../utils/date'
import { getFollowingList, getFollowerList } from "../../api/user";

const Profile = () => {
    const { userId } = useContext(UserContext).state;
    const [followingCount, setFollowingCount] = useState(0);
    const [followerCount, setFollowerCount] = useState(0);

    useEffect(() => {
        async function fetchFollowingList() {
            try {
                const res = await getFollowingList();
                setFollowingCount(res.data.length);
            } catch (error) {
                console.error(error);
            }
        }

        fetchFollowingList();
    }, []);

    useEffect(() => {
        async function fetchFollowerList() {
            try {
                const res = await getFollowerList();
                setFollowerCount(res.data.length);
            } catch (error) {
                console.error(error);
            }
        }

        fetchFollowerList();
    }, []);

    return (
        <div className="home-layout">
            <Header />
            <div className="page">
                <div className="follow-layout">
                    <div>아이디: {userId}</div>
                    <div>{getTodayDateString()}</div>
                    <div>팔로잉: {followingCount} &nbsp; 팔로워: {followerCount}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile;