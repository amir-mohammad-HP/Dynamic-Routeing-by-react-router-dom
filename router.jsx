import {createBrowserRouter} from 'react-router-dom';
import React from 'react';

import PublicLayout from './layouts/PublicLayout';
import UserLayout from './layouts/UserLayout';

import NotFound from './pages/NotFound';
import Main from './pages/Main';
import Signup from "./pages/Signup"

const routes = [

    {
        name: "user",
        path:'/',
        element: <UserLayout />,
        children:[

            {   
                name: 'dashboard',
                path:'/dashboard',
                element: <Dashboard />
            },
            {
                name: 'users',
                path:'/users',
                element: <Users />
            },
            {
                name: 'new user',
                path:'/users/new',
                element: <UserForm key='userCreate' />
            },
            {   
                name: 'user',
                path:'/users/:id',
                element: <UserForm key='userUpdate' />
            },

        ],
    },
    {   
        name: 'public',
        path:'/',
        element: <PublicLayout />,
        children:[
        
            {   
                name: 'main',
                path:'/',
                element: <Main />
            },
            // {    
                   name: 'login',
            //     path:'/login',
            //     element: <LoginView />
            // },
            {
                name: 'signup',
                path:'/signup/:id/:idk/:idf',
                element: <Signup />
            },

        ]
    },
    {
        name: '404',
        path:'*',
        element: <NotFound />
    },
]
const router = createBrowserRouter(routes);

export default router;


export const getRoute = (name, kwargs = {}, hashtag='') => {
    const parts = name.split('->');
    let route = routes;
    let finalRoute = "#";
    for(let n in parts){
        let namespace = parts[n];
        route.find((item) => {
            if (namespace === item.name){
                if (item.children) {
                    route = item.children;
                } else {
                    finalRoute = item.path;
                    return true;
                }
            }else {
                finalRoute = "#";
            }
        });
        
        if (Object.keys(kwargs).length > 0){
            for (const [key, value] of Object.entries(kwargs)) {

                const rgx = new RegExp(`(\/:(${key})\/)`);
                const rgx1 = new RegExp(`:(${key})$`);

                finalRoute = finalRoute.replace(rgx, `/${value}/`);
                finalRoute = finalRoute.replace(rgx1, `${value}`);
              }
        }
    }
    if (finalRoute === '#'){
        throw `namespace << ${parts} >> is not defined`
    }
    if (hashtag){
        finalRoute = `${finalRoute}#${hashtag}`
    }
    return finalRoute;
}
