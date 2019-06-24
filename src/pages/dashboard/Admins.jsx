import React, {useState} from "react";
import "./Admins.scss";
import {Button, Card, Icon, Input, Modal, Tabs} from "antd";
import {useMutationValue, wrapSetter} from "../../utility";
import {useDispatch, useSelector} from "react-redux";

// language=GraphQL
const EditAdminQuery = `
    mutation($username: String!, $password: String!) {
        updateAdmin(admin: {username: $username, password: $password})
    }
`;

// language=GraphQL
const CreateAdminQuery = `
    mutation($username: String!, $password: String!) {
        createAdmin(admin: {username: $username, password: $password})
    }
`;

// language=GraphQL
const DeleteAdminQuery = `
    mutation($username: String!) {
        deleteAdmin(admin: $username)
    }
`;

const Admins = () => {
    const username = useSelector(it => it.username);
    const dispatch = useDispatch();
    const logOut = () => dispatch({type: "logout"});

    const [changePassword, setChangePassword] = useState("");
    const [createAdmin, setCreateAdmin] = useState({username: "", password: ""});
    const [editAdmin, setEditAdmin] = useState({username: "", password: ""});
    const [deleteAdmin, setDeleteAdmin] = useState("");

    const [changingPassword, performChangePassword] = useMutationValue(
        EditAdminQuery,
        {
            username,
            password: changePassword
        }
    );
    const [creatingAdmin, performCreateAdmin] = useMutationValue(
        CreateAdminQuery,
        createAdmin
    );
    const [editingAdmin, performEditAdmin] = useMutationValue(
        EditAdminQuery,
        editAdmin
    );
    const [deletingAdmin, performDeleteAdmin] = useMutationValue(
        DeleteAdminQuery,
        {username: deleteAdmin}
    );

    const tabs = [
        {
            key: "change-your-password",
            tab: "Change Password",
            content: (
                <React.Fragment>
                    <Input.Password
                        disabled={changingPassword}
                        prefix={<Icon type="lock" style={{opacity: 0.25}}/>}
                        placeholder="New password"
                        value={changePassword}
                        onChange={wrapSetter(setChangePassword)}
                    />
                    <Button
                        disabled={changePassword.length < 1}
                        loading={changingPassword}
                        type="primary"
                        style={{float: "right"}}
                        onClick={() => performChangePassword().then(logOut)}
                    >
                        Save
                    </Button>
                </React.Fragment>
            )
        },
        {
            key: "create-admin",
            tab: "Create Admin",
            content: (
                <React.Fragment>
                    <Input
                        disabled={creatingAdmin}
                        type="email"
                        prefix={<Icon type="user" style={{opacity: 0.25}}/>}
                        placeholder="Username"
                        value={createAdmin.username}
                        onChange={wrapSetter(username => setCreateAdmin({...createAdmin, username}))}
                    />
                    <Input.Password
                        disabled={creatingAdmin}
                        prefix={<Icon type="lock" style={{opacity: 0.25}}/>}
                        placeholder="Password"
                        value={createAdmin.password}
                        onChange={wrapSetter(password => setCreateAdmin({...createAdmin, password}))}
                    />
                    <Button
                        disabled={createAdmin.username.length < 1 || createAdmin.password.length < 1}
                        loading={creatingAdmin}
                        type="primary"
                        style={{float: "right"}}
                        onClick={() => performCreateAdmin()
                            .then(() => {
                                setCreateAdmin({username: "", password: ""});
                            })}
                    >
                        Create
                    </Button>
                </React.Fragment>
            )
        },
        {
            key: "change-admin-password",
            tab: "Edit Admin",
            content: (
                <React.Fragment>
                    <Input
                        disabled={editingAdmin}
                        type="email"
                        prefix={<Icon type="user" style={{opacity: 0.25}}/>}
                        placeholder="Username"
                        value={editAdmin.username}
                        onChange={wrapSetter(username => setEditAdmin({...editAdmin, username}))}
                    />
                    <Input.Password
                        disabled={editingAdmin}
                        prefix={<Icon type="lock" style={{opacity: 0.25}}/>}
                        placeholder="New Password"
                        value={editAdmin.password}
                        onChange={wrapSetter(password => setEditAdmin({...editAdmin, password}))}
                    />
                    <Button
                        disabled={editAdmin.username.length < 1 || editAdmin.password.length < 1}
                        loading={editingAdmin}
                        type="primary"
                        onClick={() => performEditAdmin()
                            .then(() => {
                                if (editAdmin.username === username)
                                    logOut();
                                else {
                                    setEditAdmin({username: "", password: ""})
                                }
                            })}
                        style={{float: "right"}}
                    >
                        Save
                    </Button>
                </React.Fragment>
            )
        },
        {
            key: "delete-admin",
            tab: "Delete Admin",
            content: (
                <React.Fragment>
                    <Input
                        disabled={deletingAdmin}
                        type="email"
                        prefix={<Icon type="user" style={{opacity: 0.25}}/>}
                        placeholder="Username"
                        value={deleteAdmin}
                        onChange={wrapSetter(setDeleteAdmin)}
                    />
                    <Button
                        disabled={deleteAdmin.length < 1}
                        loading={deletingAdmin}
                        type="danger"
                        style={{float: "right"}}
                        onClick={() => {
                            Modal.confirm({
                                title: `Delete ${deleteAdmin}?`,
                                content: (
                                    <React.Fragment>
                                        Are you sure you want to delete <b>{deleteAdmin}</b>?
                                    </React.Fragment>
                                ),
                                onOk: () => performDeleteAdmin()
                                    .then(() => {
                                        if (deleteAdmin === username) {
                                            logOut();
                                        } else {
                                            setDeleteAdmin("");
                                        }
                                    }),
                                onCancel: () => undefined
                            })
                        }}
                    >
                        Delete
                    </Button>
                </React.Fragment>
            )
        }
    ];

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
                    {tabs.map(({key, tab, content}) => <Tabs.TabPane key={key} tab={tab}>
                        <span className="tab-content-wrapper">
                            {content}
                        </span>
                    </Tabs.TabPane>)}
                </Tabs>
            </Card>
        </div>
    );
};
export default Admins;
