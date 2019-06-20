import React from "react";
import "./Dashboard.scss";
import {Button, PageHeader} from "antd";
import {useDispatch, useSelector} from "react-redux";
import Message from "./dashboard/Message";
import Lunchplan from "./dashboard/Lunchplan";



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
            </main>
        </div>
    );
};

export default Dashboard;
