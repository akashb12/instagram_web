import React, { useEffect, useState,useContext } from 'react'
import { SearchedUsers } from '../../Context/Context'
import './NavBar.css';
import {Link} from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { RootStore } from '../..';
const NavBar = () => {
    const token: string = window.sessionStorage.getItem('token')!;
    const state = useSelector((state: RootStore) => state.mainReducer.auth!);
    const [Profile, setProfile] = useState<string>("");
    const [Id, setId] = useState<number>(0);
    const [SearchedUser, setSearchedUser] = useState<string>("");
    const {Users,setUsers} = useContext(SearchedUsers)

    useEffect(() => {
        setProfile(state.profileImage!)
        setId(state.id!)
    }, [state]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedUser(e.target.value)
        axios.post("/api/user/searchUser?token=" + token, { name: SearchedUser }).then((response) => {

            response.data.users.map((user: UserProfile) => {
                setUsers([...Users, { id: user.id, full_name: user.full_name, profileImage: user.profileImage }])
            })
        });
    }
    return (
        <div className="navbar">
            <div className="section_one">
                <div className="insta-logo">
                    <img src="/insta-icon.png" alt="no image" />
                </div>
            </div>
            <div className="section_two">
                <div className="search-bar">
                    <input type="text" placeholder="Search" className="navbar-search" onChange={handleChange} value={SearchedUser} />
                </div>
            </div>
            <div className="section_three">
                <li>
                    <MdHome className="navbar-icons" />
                </li>
                <li>
                <Link  to={"/profile/" + Id }><img className="profile" src={Profile && Profile} alt="no image" /></Link>
                </li>
            </div>
        </div>
    )
}

export default NavBar
