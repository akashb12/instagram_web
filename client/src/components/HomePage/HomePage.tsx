import React, { useContext } from 'react';
import { SearchedUsers } from '../../Context/Context';
import './HomePage.css';
import { Link } from 'react-router-dom'
const HomePage: React.FC = () => {
    const { Users, setUsers } = useContext(SearchedUsers)
    return (
        <>
            <div className="container">
                <div className="row" style={{ position: "relative", left: "26vw" }}>
                    <div className="col-12 col-sm-8 col-lg-5">
                        <ul className="list-group">
                            {
                                Users && Users.map((user: UserProfile) => {
                                    return (
                                        <Link to={"/profile/" + user.id}>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            {user.username}
                                            <div className="image-parent">
                                                <img src={user.profileImage} className="img-fluid" alt="quixote" />
                                            </div>
                                        </li>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
