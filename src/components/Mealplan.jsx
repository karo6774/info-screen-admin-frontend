import React from "react";
import "./Mealplan.scss";
import MealSelect from "./MealSelect";

const days = [
    {id: "monday", title: "Monday"},
    {id: "tuesday", title: "Tuesday"},
    {id: "wednesday", title: "Wednesday"},
    {id: "thursday", title: "Thursday"},
    {id: "friday", title: "Friday"}
];

const Mealplan = ({week, meals, mealplan, onChange, enabled = true}) => {
    return (
        <div className="meal-plan">
            {days.map(({id, title}) =>
                <div key={id} style={{overflow: "auto", display: 'table', width: '100%'}}>
                    <span style={{display: 'table-cell', verticalAlign: 'middle'}}>{title}</span>
                    <MealSelect
                        meal={mealplan[id]}
                        meals={meals}
                        enabled={enabled}
                        onChange={value =>
                            onChange(
                                Object.assign({}, mealplan, {[id]: value})
                            )}
                        style={{width: '340px', float: 'right'}}
                    />
                </div>
            )}
        </div>
    );
};
export default Mealplan;
