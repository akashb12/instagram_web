import React, { useEffect, useState } from 'react'
import { RootStore } from "../..";
import { useSelector } from "react-redux";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import { useParams, Link } from "react-router-dom";
import './DetailProduct.css'
import { Modal } from "react-bootstrap";



// interface
interface PostsUser {
    id: number;
    username: string;
    profile_image: string;
}

interface Posts {
    id: number;
    attachment_url: string;
    caption: string;
    likes: Likes[];
    user: PostsUser;
    comments: Comments[];
}

interface SavedPost {
    id: number;
    user_id: number;
    post_id: number;
}

interface Comments {
    comment: string;
    user: PostsUser;
}


const DetailProductPage: React.FC = () => {
    const token: string = window.sessionStorage.getItem('token')!;
    const state = useSelector((state: RootStore) => state.mainReducer.auth!);
    const id = useParams<Params>().id;
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const [PostDetails, setPostDetails] = useState<Posts>({
        id: 0,
        attachment_url: "",
        caption: "",
        likes: [],
        user: {
            id: 0,
            username: "",
            profile_image: "",
        },
        comments: [],
    });

    useEffect(() => {
        getFeeds();
    }, [state]);

    const Auth = () => {
        window.sessionStorage.removeItem('token')
        window.location.replace('/login')
    }

    const getFeeds = () => {
        axios
            .post(`/api/post/getPostDetails/${id}`, null, config)
            .then((response) => {
                if (response.data.status) {
                    setPostDetails({
                        id: response.data.post.id,
                        attachment_url: response.data.post.attachment_url,
                        caption: response.data.post.caption,
                        likes: response.data.post.likes,
                        user: {
                            id: response.data.post.user.id,
                            username: response.data.post.user.username,
                            profile_image: response.data.post.user.profile_image,
                        },
                        comments: response.data.post.comments,
                    })
                } else {
                    Auth();
                }
            }).catch((error) => {
                console.log('error', error)
            })
    };

    useEffect(() => {
        console.log('data', PostDetails)
    }, [PostDetails]);

    return (
        <>
            <NavBar />
            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '92vh' }}>
                <Modal
                    className="post_modal"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={true}
                >
                    <div className="row ml-0 mr-0">
                        <div className="post_left_side col-md-8 pr-0 pl-0">
                            <img className="left_side_image" src={PostDetails && PostDetails.attachment_url} alt="no image" />
                        </div>
                        <div className="post_right_side col-md-4 pr-0 pl-0">
                            <div className="post_user">
                                <img className="profile" src={PostDetails && PostDetails.user.profile_image} alt="no image" />
                                <span className="post_username"><strong>{PostDetails && PostDetails.user.username}</strong></span>

                            </div>

                            <hr />
                            <div className="post_user">
                                <img className="profile" src={PostDetails && PostDetails.user.profile_image} alt="no image" />
    <span className="post_username"><strong>{PostDetails && PostDetails.user.username}</strong></span>&nbsp;<span>{PostDetails && PostDetails.caption}</span>

                            </div>
                        </div>
                    </div>
                </Modal>
            </div>

        </>
    )
}

export default DetailProductPage
