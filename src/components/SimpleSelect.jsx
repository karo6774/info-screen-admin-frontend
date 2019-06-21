import React from "react";
import {Divider, Icon, Select} from "antd";

const SimpleSelect = ({
                          value, items, onChange, style, enabled = true, showAddItem, onAddItem,
                          renderItem = (it) => it
                      }) => {
    return (
        <Select
            style={style}
            value={value === 0 ? undefined : value}
            showSearch
            placeholder="Select meal"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={onChange}
            allowClear
            dropdownMatchSelectWidth={false}
            disabled={!enabled}
            className="meal-select"
            dropdownRender={menu => (
                showAddItem
                    ? <React.Fragment>
                        <div style={{padding: '8px', cursor: 'pointer'}} onClick={onAddItem}>
                            <Icon type="plus"/> Add meal
                        </div>
                        <Divider style={{margin: '4px 0'}}/>
                        {menu}
                    </React.Fragment>
                    : menu
            )}
        >
            {items.map(it => <Select.Option key={it.id} value={it.id} style={{width: '100%'}}>
                {renderItem(it)}
            </Select.Option>)}
        </Select>
    );
};
export default SimpleSelect;
