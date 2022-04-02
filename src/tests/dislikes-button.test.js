/**
 * @file Implement unit tests for dislike button.
 */
import TuitStats from "../components/tuits/tuit-stats";
import { act } from 'react-dom/test-utils';
import {screen, render, fireEvent, waitFor} from "@testing-library/react";
import {HashRouter} from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;
console.error = () => {};
// mock axios with the create
// const mockAxios = jest.genMockFromModule('axios')
// mockAxios.create = jest.fn(() => mockAxios)
    //
    // () =>
    // Promise.resolve({ data: false }));

const MOCKED_USER = {username: "alice", _id: "123"};

const MOCKED_TUIT =
    {tuit: "alice's tuit", postBy: "123", _id: "1231", stats: {likes: 31, dislikes: 11}};

let likeTuitMock = jest.fn();
let dislikeTuitMock = jest.fn();

test('tuit stats renders dislike button', async() => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async () => render(
        <HashRouter>
            <TuitStats tuit={MOCKED_TUIT} likeTuit={likeTuitMock} dislikeTuit={dislikeTuitMock}/>
        </HashRouter>
    ));

    const dislikeButton = screen.getByTestId('test-dislikeButton');
    expect(dislikeButton).toBeInTheDocument();
})

test('tuit stats renders dislike stats', async() => {

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async () => render(
        <HashRouter>
            <TuitStats tuit={MOCKED_TUIT} likeTuit={likeTuitMock} dislikeTuit={dislikeTuitMock}/>
        </HashRouter>
    ));

    const dislikeStat = screen.getByText(/11/i);
    expect(dislikeStat).toBeInTheDocument();
})

test('click dislike button will trigger dislikeTuitMock function', async() => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async () => render(
        <HashRouter>
            <TuitStats tuit={MOCKED_TUIT} likeTuit={likeTuitMock} dislikeTuit={dislikeTuitMock}/>
        </HashRouter>
    ));

    const dislikeButton = screen.getByTestId('test-dislikeButton');
    await fireEvent.click(dislikeButton);
    expect(dislikeTuitMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText(MOCKED_TUIT.stats.dislikes)).toBeInTheDocument();
})

// test('click dislike button will increase dislike stats if it has not been disliked before', async() => {
//     mockAxios.get.mockImplementation((url) => {
//         switch (url) {
//             // case `${USERS_API}/me/likes/${MOCKED_TUIT._id}`:
//             //     return Promise.resolve({data: false})
//             default:
//                 return Promise.resolve({data: MOCKED_TUIT}).catch(e=>console.log(e))
//         }})
//
//     dislikeTuitMock = jest.fn((tuit) => {
//         tuit.stats.dislikes += 1
//
//     });
//     // eslint-disable-next-line testing-library/no-unnecessary-act
//     await act( async () => render(
//         <HashRouter>
//             <TuitStats tuit={MOCKED_TUIT} likeTuit={likeTuitMock} dislikeTuit={dislikeTuitMock}/>
//         </HashRouter>
//     ));
//
//     const dislikeButton = screen.getByTestId('test-dislikeButton');
//     fireEvent.click(dislikeButton);
//     expect(dislikeTuitMock).toHaveBeenCalledTimes(1);
//     expect(screen.getByText(MOCKED_TUIT.stats.dislikes)).toBeInTheDocument();
//     // await waitFor(() => {
//     //     // expect(screen.getByText(MOCKED_TUIT.stats.dislikes)).toBeInTheDocument();
//     //     console.log("check", MOCKED_TUIT)
//     // });
//
// })