import React, {useState} from "react";
import {Button, Card, Divider, InputNumber} from "antd";
import * as Moment from "moment";
import Mealplan from "../../components/Mealplan";
import {useMutationValue, useQueryValue} from "../../utility";
import useDeepCompareEffect from "use-deep-compare-effect";

// language=GraphQL
const lunchplanQuery = week => `{
    lunchplan(week: ${week}) {
        mealplan {
            monday
            tuesday
            wednesday
            thursday
            friday
        }
    }
}`;
// language=GraphQL
const mealsQuery = `{
    meals {
        id
        description
        timesChosen
    }
}`;

// language=GraphQL
const lunchplanMutation = `
    mutation($week: Int!, $mealplan: MealplanInput!) {
        saveLunchplan(lunchplan: {week: $week, mealplan: $mealplan})
    }`;

function diffMealplan(base, other) {
    const res = {};
    ["monday", "tuesday", "wednesday", "thursday", "friday"].forEach(day => {
        if (base[day] === other[day]) {
            return;
        }

        if (!other[day]) {
            res[day] = 0;
        } else {
            res[day] = other[day];
        }
    });
    return res;
}

export default function Lunchplan() {
    const [week, setWeek] = useState(Moment().isoWeek());
    const [loadedWeek, setLoadedWeek] = useState(week);

    const [loadingMeals, meals, reloadMeals] = useQueryValue(mealsQuery, ["meals"], []);
    const [loadingMealplan, savedMealplan] = useQueryValue(lunchplanQuery(loadedWeek), ["lunchplan", "mealplan"], {});

    const [editorMealplan, setEditorMealplan] = useState({});
    useDeepCompareEffect(() => setEditorMealplan(savedMealplan), [savedMealplan]);

    const mealplanDiff = diffMealplan(savedMealplan, editorMealplan);
    const [savingLunchplan, executeMutation] = useMutationValue(lunchplanMutation, {
        week: loadedWeek,
        mealplan: mealplanDiff
    });

    const loading = loadingMeals || loadingMealplan;
    const enableEditor = !loadingMeals && !loadingMealplan && week === loadedWeek && !savingLunchplan;

    return (
        <div>
            <Card title="Lunchplans"
                  actions={[<Button
                      disabled={!enableEditor}
                      type="primary"
                      onClick={() => {
                          console.log(mealplanDiff);
                          if (Object.entries(mealplanDiff).length > 0) {
                              executeMutation().then(() => reloadMeals());
                          }
                      }}
                  >
                      Save
                  </Button>]}
            >
                Lunchplan for week
                <InputNumber
                    style={{marginLeft: '1em'}}
                    min={1}
                    max={Moment().isoWeeksInYear()}
                    defaultValue={week}
                    onChange={setWeek}
                />
                <Button style={{marginLeft: '1em'}} onClick={() => {
                    return setLoadedWeek(week);
                }}>Load</Button>
                <Divider/>
                {loading
                    ? <span>Loading...</span>
                    : <Mealplan
                        week={week}
                        meals={meals}
                        mealplan={editorMealplan}
                        onChange={setEditorMealplan}
                        enabled={enableEditor}
                    />
                }
            </Card>
        </div>
    );
}