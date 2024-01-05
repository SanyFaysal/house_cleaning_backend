import express from 'express';
import { UserRoutes } from "../modules/user/user.route";
import { CategoryRoutes } from '../modules/category/category.route';


const router = express.Router();


const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/category',
        route: CategoryRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));


export default router;
