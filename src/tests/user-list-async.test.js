import {findAllUsers} from "../services/users-service";
import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {UserList} from "../components/profile/user-list";

test('user list renders async', async () => {
    const users = await findAllUsers();
    render(
        <HashRouter>
            <UserList users={users}/>
        </HashRouter>);

    const linkElement = screen.getByText(/NASA/i);
    expect(linkElement).toBeInTheDocument();
})