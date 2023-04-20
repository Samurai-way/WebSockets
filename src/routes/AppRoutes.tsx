import React from 'react';
import {Route, Routes} from "react-router-dom";
import {App} from "../App";
import {Chat} from "../chat/Chat";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<App/>}/>
            <Route path={'/chat'} element={<Chat/>}/>
        </Routes>
    );
};
