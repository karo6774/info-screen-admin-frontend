import React from "react";
import "./MealSelect.scss";
import {Select} from "antd";

const MealSelect = ({meal, meals, onChange, style, enabled = true}) => {
    return (
        <Select
            style={style}
            value={meal === 0 ? undefined : meal}
            showSearch
            placeholder="Select meal"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={onChange}
            allowClear
            dropdownMatchSelectWidth={false}
            disabled={!enabled}
            className="meal-select"
        >
            {meals.map(it => <Select.Option key={it.id} value={it.id} style={{width: '100%'}}>
                {it.description}
                <span className="times-chosen" style={{float: 'right', opacity: 0.5}}>
                    Chosen {it.timesChosen} time{it.timesChosen !== 1 && 's'}
                </span>
            </Select.Option>)}
        </Select>
    );
};
export default MealSelect;
