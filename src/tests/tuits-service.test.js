import {
    createTuit,
    deleteTuit,
    findTuitById,
    findAllTuits,
    findTuitByUser
} from "../services/tuits-service";

import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";

let ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
};

let newUser;

beforeAll(async () => {
              newUser = await createUser(ripley);
          }
)

afterAll(
    () => {
        return deleteUsersByUsername(ripley.username);
    }
)
describe('Create tuit', () => {
    // TODO: implement this
    const news = {
        tuit: 'I hate American Airlines, March 18.'
    }
    let tuitId;
    // setup test before running test
    // beforeAll(() => {
    //     // remove any/all users to make sure we create it in the test
    //     return deleteUsersByUsername(ripley.username);
    // })

    // clean up after test runs
    afterAll(() =>
                 // remove any data we created
             {
                 return deleteTuit(tuitId);
             }
    )
    test('can create tuit with REST API', async () => {
        const newTuit = await createTuit(newUser._id, news);
        tuitId = newTuit._id;
        expect(newTuit.postedBy).toEqual(newUser._id);
        expect(newTuit.tuit).toEqual(news.tuit);
    })
});

describe('Delete tuit', () => {
    // TODO: implement this
    const alert = {
        tuit: 'This tuit is only for deleted!'
    }
    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
    })

    test('can delete tuit wtih REST API', async () => {
        const newTuit = await createTuit(newUser._id, alert);

        expect(newTuit.postedBy).toEqual(newUser._id);
        expect(newTuit.tuit).toEqual(alert.tuit);

        const status = await deleteTuit(newTuit._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    })

});

describe('findTuitById', () => {
    // TODO: implement this
    const news = {
        tuit: 'I hate American Airlines, March 18.'
    }
    let tuitId;

    // // setup test before running test
    // beforeAll(() => {
    //     // remove any/all users to make sure we create it in the test
    // })
    //
    // // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteTuit(tuitId);
    })

    test('can retrieve a tuit by their primary key with REST API', async () => {
        const newTuit = await createTuit(newUser._id, news);
        tuitId = newTuit._id;
        expect(newTuit.postedBy).toEqual(newUser._id);
        expect(newTuit.tuit).toEqual(news.tuit);

        const existingTuit = await findTuitById(newTuit._id);

        expect(existingTuit.postedBy).toEqual(newUser);
        expect(existingTuit.tuit).toEqual(news.tuit);
    })

});

describe('can retrieve all tuits with REST API', () => {
    // TODO: implement this
    let tuitContents = [
        "American", "Airline", "Sucks!!!"
    ];

    beforeAll(() => {
                  return Promise.all(
                      tuitContents.map(
                          myTuit =>
                              createTuit(newUser._id, {tuit: myTuit})
                      ));
              }
    );

    afterAll(async () => {
                 const insertedTuits = await findTuitByUser(newUser._id);
                 return Promise.all(insertedTuits.map(tuit =>
                                                          deleteTuit(tuit._id)));
             }
    );

    test('can retrieve all tuits with REST API', async () => {
        const tuits = await findAllTuits();

        expect(tuits.length).toBeGreaterThanOrEqual(tuitContents.length);
        // let's check each tuit we inserted
        const tuitsWeInserted = tuits.filter(
            myTuit => tuitContents.indexOf(myTuit.tuit) >= 0);

        expect(tuitsWeInserted.length).toBeGreaterThanOrEqual(tuitContents.length);
        // compare the actual tuits in database with the ones we sent
        tuitsWeInserted.forEach(myTuit => {
            const tuitContent = tuitContents.find(
                (tuitContent) => tuitContent === myTuit.tuit
            );
            expect(myTuit.tuit).toEqual(tuitContent);
            expect(myTuit.postedBy).toEqual(newUser)
        });
    })
});