import React from 'react';
import {Route, Routes} from "react-router-dom";
import {App} from "../App";
import {Chat} from "../chat/Chat";
import { Registration } from '../registration/Registration';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<App/>}/>
            <Route path={'/chat'} element={<Chat/>}/>
            <Route path={'/registration'} element={<Registration/>}/>
        </Routes>
    );
};
