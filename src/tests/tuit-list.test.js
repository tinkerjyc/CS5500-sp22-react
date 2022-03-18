import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
    {username: 'alice', _id:'123'},
    {username: 'bob', _id:'234'},
    {username: 'charlie', _id:'345'}
];

const MOCKED_TUITS = [
    {tuit:"alice's tuit", postedBy:MOCKED_USERS[0]._id, _id:'321'},
    {tuit:"bob's tuit", PostedBy:MOCKED_USERS[1]._id, _id:'432' },
    {tuit:"charlie's tuit", PostedBY:MOCKED_USERS[2]._id, _id:'543'}
];

test('tuit list renders static tuit array', () => {
    // TODO: implement this
    render(
        <HashRouter>
            <Tuits tuits={MOCKED_TUITS}/>
        </HashRouter>);
    const linkElement = screen.getByText(/bob/i);
    expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
    // TODO: implement this
    // Implement in async
})

test('tuit list renders mocked', async () => {
    // TODO: implement this
    axios.get.mockImplementation(() =>
                                     Promise.resolve({data: {tuits: MOCKED_TUITS}}));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);

    const tuit = screen.getByText(/bob's tuit/i);
    expect(tuit).toBeInTheDocument();
});
