// import "./rightbar.css";
// import { Users } from "../../dummyData";
// import Online from "../online/Online";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import { Add, Remove } from "@mui/icons-material";

// export default function Rightbar({ user }) {
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//     const [friends, setFriends] = useState([]);
//     const { user: currentUser, dispatch } = useContext(AuthContext);
//     const [followed, setFollowed] = useState(
//       currentUser.followings.includes(user?.id)
//     );
  
//     useEffect(() => {
//       const getFriends = async () => {
//         try {
//           const friendList = await axios.get("/users/friends/" + user._id);
//           setFriends(friendList.data);
//         } catch (err) {
//           console.log(err);
//         }
//       };
//       getFriends();
//     }, [user]);


//     const handleClick = async () => {
//       try {
//         if (followed) {
//           await axios.put(`/users/${user._id}/unfollow`, {
//             userId: currentUser._id,
//           });
//           dispatch({ type: "UNFOLLOW", payload: user._id });
//         } else {
//           await axios.put(`/users/${user._id}/follow`, {
//             userId: currentUser._id,
//           });
//           dispatch({ type: "FOLLOW", payload: user._id });
//         }
//         setFollowed(!followed);
//       } catch (err) {
//       }
//     };

//   const HomeRightbar = () => {
    
//     return (
//       <>
//         <div className="birthdayContainer">
//           <img className="birthdayImg" src="https://tse3.mm.bing.net/th?id=OIP.LcfpheYTy_yJR7n58D_AMQEsEs&pid=Api&P=0&h=180" alt="" />
//           <span className="birthdayText">
//             <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
//           </span>
//         </div>
//         <img className="rightbarAd" src="https://tse3.mm.bing.net/th?id=OIP.LcfpheYTy_yJR7n58D_AMQEsEs&pid=Api&P=0&h=180" alt="" />
//         <h4 className="rightbarTitle">Online Friends</h4>
//         <ul className="rightbarFriendList">
//           {Users.map((u) => (
//             <Online key={u.id} user={u} />
//           ))}
//         </ul>
//       </>
//     );
//   };

//   const ProfileRightbar = () => {
//     return (
//       <>
//         {user.username !== currentUser.username && (
//           <button className="rightbarFollowButton" onClick={handleClick}>
//             {followed ? "Unfollow" : "Follow"}
//             {followed ? <Remove /> : <Add />}
//           </button>
//         )}
//         <h4 className="rightbarTitle">User information</h4>
//         <div className="rightbarInfo">
//           <div className="rightbarInfoItem">
//             <span className="rightbarInfoKey">City:</span>
//             <span className="rightbarInfoValue">{user.city}</span>
//           </div>
//           <div className="rightbarInfoItem">
//             <span className="rightbarInfoKey">From:</span>
//             <span className="rightbarInfoValue">{user.from}</span>
//           </div>
//           <div className="rightbarInfoItem">
//             <span className="rightbarInfoKey">Relationship:</span>
//             <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 1 ? "Married" : "-"}</span>
//           </div>
//         </div>
//         <h4 className="rightbarTitle">User friends</h4>
//         <div className="rightbarFollowings">
//           {friends.map((friend) => (
//             <Link
//               to={"/profile/" + friend.username}
//               style={{ textDecoration: "none" }}
//             >
//               <div className="rightbarFollowing">
//                 <img
//                   src={
//                     friend.profilePicture
//                       ? PF + friend.profilePicture
//                       : "https://i0.wp.com/vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png?fit=860%2C681&ssl=1"
//                   }
//                   alt=""
//                   className="rightbarFollowingImg"
//                 />
//                 <span className="rightbarFollowingName">{friend.username}</span>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </>
//     );
//   };
//   return (
//     <div className="rightbar">
//       <div className="rightbarWrapper">
//         {user ? <ProfileRightbar /> : <HomeRightbar />}
//       </div>
//     </div>
//   );
// }

import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (currentUser.followings.includes(user?._id)) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      
    } catch (err) {
      console.log(err); 
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="https://tse3.mm.bing.net/th?id=OIP.LcfpheYTy_yJR7n58D_AMQEsEs&pid=Api&P=0&h=180" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="https://tse3.mm.bing.net/th?id=OIP.LcfpheYTy_yJR7n58D_AMQEsEs&pid=Api&P=0&h=180" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {/* {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )} */}
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {currentUser.followings.includes(user?._id) ? "Unfollow" : "Follow"}
            {currentUser.followings.includes(user?._id) ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                       ? PF + friend.profilePicture
                      : "https://i0.wp.com/vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png?fit=860%2C681&ssl=1"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}