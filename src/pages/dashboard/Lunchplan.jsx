import React, {useContext, useState} from "react";
import {Button, Card, Divider, InputNumber} from "antd";
import * as Moment from "moment";
import Mealplan from "../../components/Mealplan";
import {useMutationValue, useQueryValue} from "../../utility";
import useDeepCompareEffect from "use-deep-compare-effect";
import {GraphQLContext} from "graphql-react";
import {useSelector} from "react-redux";
import {operateMutation} from "../../api";

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

// language=GraphQL
const createMealMutation = `
    mutation($description: String!) {
        createMeal(meal: {description: $description})
    }
`;

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
    const token = useSelector(it => it.token);

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
    const graphql = useContext(GraphQLContext);

    const loading = loadingMeals || loadingMealplan;
    const enableEditor = !loading && week === loadedWeek && !savingLunchplan;

    return (
        <div>
            <Card title="Lunchplan"
                  actions={[<Button
                      disabled={!enableEditor}
                      type="primary"
                      loading={savingLunchplan}
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
                <Button
                    style={{marginLeft: '1em'}}
                    loading={loading}
                    onClick={() => {
                        return setLoadedWeek(week);
                    }}>
                    Load
                </Button>
                <Divider/>
                <Mealplan
                    week={week}
                    meals={meals}
                    mealplan={editorMealplan}
                    onChange={setEditorMealplan}
                    enabled={enableEditor}
                    onAddMeal={(meal) => {
                        return operateMutation(graphql, createMealMutation, token, {
                            description: meal
                        }).then(reloadMeals);
                    }}
                />
            </Card>
        </div>
    );
}