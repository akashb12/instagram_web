import React, { useEffect, useState } from "react";
// import { useParams,Link } from "react-router-dom";
import { RootStore } from "../..";
import { useSelector } from 'react-redux';
import axios from 'axios';
import NavBar from "../NavBar/NavBar";


interface savedPosts {
    id: number,
    posts: UserPosts
}
const SavedPosts: React.FC = () => {
    const token: string = window.sessionStorage.getItem('token')!;
    const state = useSelector((state: RootStore) => state.mainReducer.auth!);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const [AllSavedPosts, setAllSavedPosts] = useState<savedPosts[]>([{
        id: 0,
        posts: { attachment_url: "", id: 0 }
    }]);

    useEffect(() => {
        axios.post(`/api/post/getSavedPosts/${state?.id}`, null, config).then((response) => {
            console.log(response.data)
            setAllSavedPosts(response.data.allPosts)
        });
    }, [state]);
    return (
        <>
        <NavBar />
<div className="profile_page">
            <div className="profile_page_images">
                {
                    AllSavedPosts && AllSavedPosts.length >= 1 && AllSavedPosts.map((post: savedPosts) => {
                        return (
                            <img className="image_gallery" src={post.posts.attachment_url} alt="no image" />
                        )
                    })
                }</div>
        </div>
        </>
    )
}

export default SavedPosts
