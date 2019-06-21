import React, {useState} from "react";
import "./Admins.scss";
import {Card, Tabs} from "antd";

const tabs = [
    {
        key: "change-your-password",
        tab: "Change Password"
    },
    {
        key: "create-admin",
        tab: "Create Admin"
    },
    {
        key: "change-admin-password",
        tab: "Edit Admin"
    }
];

const Admins = () => {
    const [tab, setTab] = useState(tabs[0].key);

    return (
        <div className="admins-panel">
            <Card
                style={{}}
                title="Admins"
            >
                <Tabs
                    activeKey={tab}
                    onChange={setTab}
                    tabPosition="left"
                >
                    {tabs.map(({key, tab}) => <Tabs.TabPane key={key} tab={tab}>
                        content
                    </Tabs.TabPane>)}
                </Tabs>
            </Card>
        </div>
    );
};
export default Admins;
