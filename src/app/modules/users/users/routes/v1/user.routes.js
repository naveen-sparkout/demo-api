import { createUser,loginUser } from "../../controllers/userController";


//User Routes
export const routes = (app, version) => {
    app.post(
        version + '/create-user',
        createUser,
    );
    app.get(
        version + '/login',
        loginUser,
    );
};