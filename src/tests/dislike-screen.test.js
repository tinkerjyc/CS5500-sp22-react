/**
 * @file Implement unit tests for dislike screen.
 */
import React from 'react'
import {act, create} from "react-test-renderer"
import Profile from "../components/profile"
import MyDislikes from "../components/profile/my-dislikes"
import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Tuits from "../tests/react-test-renderer/tuits/tuits";

const MOCKED_TUITS =
    [{tuit: "alice's tuit", postBy: "123", _id: "1231", stats: {likes: 31, dislikes: 11}},
        {tuit: "bob's tuit", postBy: "153", _id: "1253", stats: {likes: 131, dislikes: 211}}];
// const MOCKED_TUITS = [
//     {tuit: "alice's tuit", postBy: "123", _id: "1231"},
//     {tuit: "bob's tuit", postBy: "234", _id: "2341"},
//     {tuit: "charlie's tuit", postBy: "345", _id: "3451"}
// ];

console.error = () => {
};
test('renders dislikes tab on profile', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => render(
        <HashRouter>
            <Profile/>
        </HashRouter>
    ));

    const dislikeTab = screen.getByText(/Dislikes/i);
    expect(dislikeTab).toBeInTheDocument();
})

test('renders a list of tuits on the screen', () => {
    let tuitsRender
    act(() => {
        tuitsRender = create(
            <Tuits
                tuits={MOCKED_TUITS}/>
        )
    })
    const root = tuitsRender.root
    // eslint-disable-next-line testing-library/await-async-query
    const ttrTuits = root.findAllByProps({
        className: 'ttr-tuit'
    })
    expect(ttrTuits.length).toBe(MOCKED_TUITS.length)
    ttrTuits.forEach((ttrTuit, ndx) => {
        // eslint-disable-next-line testing-library/no-node-access
        expect(ttrTuit.props.children).toBe(MOCKED_TUITS[ndx].tuit)
    })
})

test('renders disliked tuit under dislike screen', async () => {
    let tuitsRender
    act(() => {
        tuitsRender = create(
            <MyDislikes tuitList={MOCKED_TUITS}/>
        )
    })

    const root = tuitsRender.root
    // eslint-disable-next-line testing-library/await-async-query
    const ttrTuits = root.findAllByProps({
        className: 'tuit-content'
    })

    expect(ttrTuits.length).toBe(MOCKED_TUITS.length)
    ttrTuits.forEach((ttrTuit, ndx) => {
        // eslint-disable-next-line testing-library/no-node-access
        expect(ttrTuit.props.children[0]).toBe(MOCKED_TUITS[ndx].tuit)
    })
})