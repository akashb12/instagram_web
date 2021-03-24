import React, { useEffect, useState, useContext } from "react";
import { SearchedUsers } from "../../Context/Context";
import "./NavBar.css";
import { Link, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootStore } from "../..";
const NavBar = () => {
    const token: string = window.sessionStorage.getItem("token")!;
    const state = useSelector((state: RootStore) => state.mainReducer.auth!);
    const [Profile, setProfile] = useState<string>("");
    const [Id, setId] = useState<number>(0);
    const [SearchedUser, setSearchedUser] = useState<string>("");
    const [Check, setCheck] = useState(false);
    const { Users, setUsers } = useContext(SearchedUsers);
    const existingIds = Users.map((user: UserProfile) => user.id);
    let location = useLocation();

    useEffect(() => {
        setProfile(state.profileImage!);
        setId(state.id!);
    }, [state]);

    useEffect(() => {

        if (Check) {
            console.log("checked")
            const delayDebounceFn = setTimeout(() => {
                axios
                    .post("/api/user/searchUser?token=" + token, { name: SearchedUser })
                    .then((response) => {
                        setUsers(response.data.users);

                    });
            }, 3000);

            return () => clearTimeout(delayDebounceFn);
        }
    }, [SearchedUser]);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedUser(e.target.value);
        if (e.target.value.length >= 1) {
            setCheck(true)
        }
        else {
            setCheck(false)
            setUsers([]);
        }
    };
    return (
        <div className="navbar">
            <div className="section_one">
                <div className="insta-logo">
                    <img src="/insta-icon.png" alt="no image" />
                </div>
            </div>
            <div className="section_two">
                <div className="search-bar">
                    {location.pathname === "/" && (
                        <input
                            type="text"
                            placeholder="Search"
                            className="navbar-search"
                            onChange={handleChange}
                            value={SearchedUser}
                        />
                    )}
                </div>
            </div>
            <div className="section_three">
                <li>
                    <Link style={{ color: "black" }} to="/">
                        <MdHome className="navbar-icons" />
                    </Link>
                </li>
                <li>
                    <Link to={"/profile/" + Id}>
                        <img className="profile" src={Profile && Profile} alt="no image" />
                    </Link>
                </li>
            </div>
        </div>
    );
};

export default NavBar;
