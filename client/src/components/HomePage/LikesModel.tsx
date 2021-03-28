import React, { useState, useEffect, useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { ModalContext } from '../../Context/Context';


const LikesModel = () => {
    const { LikesData, setLikesData } = useContext(ModalContext);

    const hideModal = () => {
        setLikesData({ isOpen: false })
    };
    return (
        <>
            <Modal aria-labelledby="contained-modal-title-vcenter"
                centered show={LikesData.isOpen} onHide={hideModal}>
                <div className="container" style={{ margin: "10px auto" }}>
                    <div className="row">
                        <div className="col-12 ">
                            <ul className="list-group">
                                {
                                    LikesData && LikesData.AllLikes && LikesData.AllLikes.length && LikesData.AllLikes.map((like: Likes) => {
                                        return (
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <div className="image-parent">
                                                    <img src={like.user.profile_image} className="img-fluid" alt="quixote" />
                                                </div>
                                                {like.user.username}

                                            </li>

                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default LikesModel
