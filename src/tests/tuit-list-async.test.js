import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";

test('tuit list renders async', async () => {
    // TODO: implement this
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>
    );
    const linkedElement = screen.getByText(/In 2021, our @NASAPersevere Mars rover landed and our Ingenuity helicopter took flight./i);
    expect(linkedElement).toBeInTheDocument();
})