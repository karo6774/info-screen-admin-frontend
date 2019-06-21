import React, {useState} from "react";
import "./Mealplan.scss";
import SimpleSelect from "./SimpleSelect";
import {Input, Modal} from "antd";
import {wrapSetter} from "../utility";

const days = [
    {id: "monday", title: "Monday"},
    {id: "tuesday", title: "Tuesday"},
    {id: "wednesday", title: "Wednesday"},
    {id: "thursday", title: "Thursday"},
    {id: "friday", title: "Friday"}
];

const Mealplan = ({week, meals, mealplan, onChange, enabled = true, onAddMeal}) => {
    const [showModal, setShowModal] = useState(false);

    const [newMeal, setNewMeal] = useState("");
    const [loading, setLoading] = useState(false);

    const onSaveMeal = () => {
        setLoading(true);
        onAddMeal(newMeal).then(() => {
            setLoading(false);
            setShowModal(false);
            setNewMeal("");
        });
    };

    return (
        <div className="meal-plan">
            <Modal
                title="Add meal"
                visible={showModal}
                confirmLoading={loading}
                onOk={onSaveMeal}
            >
                <Input
                    value={newMeal}
                    onChange={wrapSetter(setNewMeal)}
                    placeholder="Meal description"
                    onPressEnter={onSaveMeal}
                />
            </Modal>
            {days.map(({id, title}) =>
                <div key={id} style={{overflow: "auto", display: 'table', width: '100%'}}>
                    <span style={{display: 'table-cell', verticalAlign: 'middle'}}>{title}</span>
                    <SimpleSelect
                        className=".meal-select"
                        value={mealplan[id]}
                        items={meals}
                        enabled={enabled}
                        onChange={value =>
                            onChange(
                                Object.assign({}, mealplan, {[id]: value})
                            )}
                        style={{width: '340px', float: 'right'}}
                        showAddItem={true}
                        onAddItem={() => setShowModal(true)}
                        addItemContent="Add meal"
                        renderItem={it => (
                            <React.Fragment>
                                {it.description}
                                <span className="times-chosen" style={{float: 'right', opacity: 0.5}}>
                                    Chosen {it.timesChosen} time{it.timesChosen !== 1 && 's'}
                                </span>
                            </React.Fragment>
                        )}
                    />
                </div>
            )}
        </div>
    );
};
export default Mealplan;
