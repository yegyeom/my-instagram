import "../../styles/css/main.css";
import Header from "./Header";
import { useEffect, useState, useContext } from "react";
import UserContext from "../../contexts/users";
import { getUserList, getFollowingList, postFollow, postUnFollow } from "../../api/user";

const Follow = () => {
    const { userId } = useContext(UserContext).state;
    const [users, setUsers] = useState([]);
    const [followingList, setFollowingList] = useState([]);

    useEffect(() => {
        async function fetchFollowingList() {
            try {
                const res = await getFollowingList();
                const followingIdList = res.data.map((item) => item.followingId);
                setFollowingList(followingIdList);
            } catch (error) {
                console.log('목록 불러오기 실패');
                console.log(error);
            }
        }

        fetchFollowingList();
    }, []);

    const handleFollow = (item) => {
        return async (e) => {
            try {
                await postFollow(item.id);

                setFollowingList((prevState) => {
                    const newFollowingList = [...prevState];
                    newFollowingList.push(item.id);

                    return newFollowingList;
                });
            } catch (error) {
                console.log('팔로잉 실패!');
                console.log(error);
            }
        }
    };

    const handleUnFollow = (item) => {
        return async (e) => {
            try {
                await postUnFollow(item.id);
                setFollowingList((prevState) => {
                    const newFollowingList = [...prevState];

                    for (let i = 0; i < newFollowingList.length; i++) {
                        if (newFollowingList[i] === item.id) {
                            newFollowingList.splice(i, 1);
                            break;
                        }
                    }

                    return newFollowingList;
                });
            } catch (error) {
                console.log('언팔로우 실패!');
                console.log(error);
            }
        }
    };

    const userList = users.filter(item => item.userId !== userId).map((item, idx) => {
        return (
            <div key={idx}>
                <div className="user-list" >
                    <div className="user-info">
                        <span>{item.userId}</span> &nbsp;
                        <span>{item.name}</span>
                    </div>
                    {followingList.includes(item.id)
                        ? <button onClick={handleUnFollow(item)} className="user-following-button">팔로잉</button>
                        : <button onClick={handleFollow(item)} className="user-follow-button">팔로우</button>
                    }
                </div >
                <hr />
            </div>
        )
    })

    useEffect(() => {
        async function fetchUserList() {
            try {
                const res = await getUserList();
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUserList();
    }, []);

    return (
        <div className="home-layout">
            <Header />
            <div className="page">
                <div className="follow-layout">{userList}</div>
            </div>
        </div>
    )
}

export default Follow;