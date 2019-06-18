import React from "react";
import {Button, PageHeader} from "antd";
import {useSelector} from "react-redux";

const Dashboard = () => {
    const username = useSelector(it => it.username);

    return (
        <div className="dashboard-page">
            <PageHeader title="Admin Dashboard" extra={
                <span>
                    Logged in as {username}
                    <Button style={{marginLeft: '1em'}}>Log Out</Button>
                </span>
            }/>
        </div>
    );
};

export default Dashboard;
