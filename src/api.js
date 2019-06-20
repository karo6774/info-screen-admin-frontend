import {useGraphQL} from "graphql-react/universal/useGraphQL";
import {useSelector} from "react-redux";

const Host = "http://localhost:5000";

export async function createToken(username, password) {
    const response = await fetch(`${Host}/token`, {
        mode: 'cors',
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });
    if (response.status !== 200) {
        const e = new Error();
        e.status = response.status;
        e.response = response;
        throw e;
    }
    return response.json().then(it => it.token);
}

export function useQuery(query) {
    const token = useSelector(it => it.token);
    return useGraphQL({
        fetchOptionsOverride(options) {
            options.headers = options.headers || {};
            options.headers['Authorization'] = `Bearer ${token}`;
            options.url = `${Host}/graphql`;
        },
        operation: {
            query
        }
    });
}

export function useMutation(mutation, variables) {
    const token = useSelector(it => it.token);
    return useGraphQL({
        fetchOptionsOverride(options) {
            options.headers = options.headers || {};
            options.headers['Authorization'] = `Bearer ${token}`;
            options.url = `${Host}/graphql`;
        },
        loadOnMount: false,
        loadOnReload: false,
        loadOnReset: false,
        operation: {
            query: mutation,
            variables
        }
    })
}
