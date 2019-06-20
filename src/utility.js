import {useMutation, useQuery} from "./api";

export function useQueryValue(query, path, def = undefined) {
    const {cacheValue = {}, load} = useQuery(query);
    if (cacheValue.data) {
        let v = cacheValue.data;
        for (const p of path) {
            v = v[p];
            if (!v) {
                v = def;
                break;
            }
        }
        return [false, v, load];
    } else {
        return [true, def, load];
    }
}

export function useMutationValue(mutation, variables) {
    const {loading, load} = useMutation(mutation, variables);
    return [loading, load];
}
