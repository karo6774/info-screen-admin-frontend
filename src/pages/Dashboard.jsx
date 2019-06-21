import React from "react";
import "./Dashboard.scss";
import {Button, PageHeader} from "antd";
import {useDispatch, useSelector} from "react-redux";
import Admins from "./dashboard/Admins";
import Lunchplan from "./dashboard/Lunchplan";
import Message from "./dashboard/Message";

const Dashboard = () => {
    const username = useSelector(it => it.username);

    const dispatch = useDispatch();

    return (
        <div className="dashboard-page">
            <PageHeader title="Admin Dashboard" extra={
                <span>
                    Logged in as {username}
                    <Button
                        style={{marginLeft: '1em'}}
                        onClick={() => dispatch({type: "logout"})}
                    >Log Out</Button>
                </span>
            }/>
            <main className="dashboard-main">
                <Lunchplan/>
                <Message/>
                <Admins/>
            </main>
        </div>
    );
};

export default Dashboard;
