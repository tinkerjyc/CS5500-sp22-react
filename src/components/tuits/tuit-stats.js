import React, {useState, useEffect} from "react";
import * as service from "../../services/likes-service";

/**
 * Component for showing tuit stats including number of replies, retuits, likes and dislikes.
 * User can also like/dislike by clicking the according button.
 *
 * @param tuit Tuit object that has the stats
 * @param likeTuit function triggered when user click like button
 * @param dislikeTuit function triggered when user click dislike button
 * @example
 * const tuit = {tuit: "my tuit", postedBy: "123", stats: {replies: 0, retuits: 0, likes: 0,
 *     dislikes: 0}} const likeTuit = () => {} const dislikeTuit = () => {} return (
 *      <TuitStats tuit={tuit}, likeTuit={likeTuit}, dislike={dislikeTuit}/>
 * )
 */
const TuitStats = ({
                       tuit, likeTuit, dislikeTuit = () => {
    }
                   }) => {
    const [isLikedByMe, setLikeTuit] = useState(false);
    const [isDislikedByMe, setDislikeTuit] = useState(false);
    const isTuitLikedByMe = () =>
        service.tuitLikedByMe('me', tuit._id)
            .then((like) => {
                if (like) {
                    setLikeTuit(true);
                } else {
                    setLikeTuit(false);
                }
            })

    const isTuitDislikedByMe = () =>
        service.tuitDislikedByMe('me', tuit._id)
            .then((dislike) => {
                if (dislike) {
                    setDislikeTuit(true);
                } else {
                    setDislikeTuit(false);
                }
            })
    // const isUserLoggedIn = () =>
    //     service.profile()
    //         .then((user) => {
    //             if (user) {
    //                 setLoggedIn(true);
    //             } else {
    //                 setLoggedIn(false);
    //             }
    //         })
    //
    // useEffect(isUserLoggedIn);
    useEffect(isTuitLikedByMe);
    useEffect(isTuitDislikedByMe);
    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"/>
                {tuit.stats && tuit.stats.replies}
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"/>
                {tuit.stats && tuit.stats.retuits}
            </div>
            <div className="col">
                <span onClick={() => likeTuit(tuit)}>
              {
                  isLikedByMe &&
                  <i className="fa-solid fa-thumbs-up me-1" style={{color: 'blue'}}/>
              }
                    {
                        !isLikedByMe &&
                        <i className="fa-light fa-thumbs-up me-1"/>
                    }
                    {tuit.stats && tuit.stats.likes}
            </span>
            </div>
            <div className="col">
                <span className="col" onClick={() => dislikeTuit(tuit)}
                      data-testid="test-dislikeButton">
                {
                    isDislikedByMe &&
                    <i className="fa-solid fa-thumbs-down me-1" style={{color: 'blue'}}
                       data-testid="test-dislikedByMe"/>
                }
                    {
                        !isDislikedByMe &&
                        <i className="fa-light fa-thumbs-down me-1"/>
                    }
                    {tuit.stats && tuit.stats.dislikes}
            </span>
            </div>
            <div className="col">
                <i className="far fa-inbox-out"/>
            </div>
        </div>
    );
}
export default TuitStats;