import React, {useState} from "react";
import "./Message.scss";
import {Button, Card, Divider, Icon, Input, Spin} from "antd";
import {useMutationValue, useQueryValue, wrapSetter} from "../../utility";

// language=GraphQL
const newestMessageQuery = `{
    newestMessage {
        date
        header
        text
    }
}`;

// language=GraphQL
const updateMessageMutation = `
    mutation($header: String!, $text: String!) {
        createMessage(message: {header: $header, text: $text})
    }
`;

export default function Message() {
    const [header, setHeader] = useState("");
    const [text, setText] = useState("");

    const [loadingNewestMessage, newestMessage, reloadMessage] = useQueryValue(newestMessageQuery, ["newestMessage"]);
    const [savingMessage, saveMessage] = useMutationValue(updateMessageMutation, {header, text});

    const loading = loadingNewestMessage || savingMessage;

    return (
        <div>
            <Card title="Message of the day"
                  actions={[<Button
                      disabled={header.length < 1 || text.length < 1}
                      type="primary"
                      loading={savingMessage}
                      onClick={() => saveMessage().then(reloadMessage)}
                  >
                      Save
                  </Button>]}>
                <p>
                    <Card size="small" type="inner" title="Current message" style={{whiteSpace: 'pre-wrap'}}>
                        {loading
                            ?
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: '120px'
                            }}>
                                <Spin
                                    indicator={<Icon type="loading" style={{fontSize: 24}} spin/>}
                                />
                            </div>
                            : <span><h4>{newestMessage.header}</h4>{newestMessage.text}</span>}
                    </Card>
                </p>
                <Divider style={{marginBottom: '2px'}} orientation="left">Update message</Divider>
                <Input
                    placeholder="Header"
                    className="message-header-input"
                    size="large"
                    value={header}
                    onChange={wrapSetter(setHeader)}
                />
                <Input.TextArea
                    placeholder="Text"
                    className="message-text-input"
                    value={text}
                    onChange={wrapSetter(setText)}
                />
            </Card>
        </div>
    )
}