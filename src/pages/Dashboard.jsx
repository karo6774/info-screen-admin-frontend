import React from "react";
import {Button, PageHeader} from "antd";

const Dashboard = props => (
    <div className="dashboard-page">
        <PageHeader title="Admin Dashboard" extra={
            <span>
                Logged in as {}
                <Button>Log Out</Button>
            </span>
        }/>
    </div>
);

export default Dashboard;
