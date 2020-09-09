import { types, applySnapshot } from 'mobx-state-tree';


export const resolveFilterStoreType = (filterModelType, defualtValue = {}) => {
    return types
        .model('FilterStore', {
            filter: types.optional(filterModelType, defualtValue),
        })
        .views(self => ({
        }))
        .actions(self => ({
            setFilterValue(name, value) {
                self.filter[name] = value;
            },
            resetFilter() {
                applySnapshot(self.filter, defualtValue);
            },
        }));
}
