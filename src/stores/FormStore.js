import { types, applySnapshot, getRoot, getSnapshot } from 'mobx-state-tree';
import { hasAttributeTrait } from './../helper';

export const resolveFormStoreType = (formModelType, defualtValues = {}) => {
    return types
        .model('FormStore', {
            values: types.optional(formModelType, defualtValues),
            submitting: false,
        })
        .views(self => ({
            get root() {
                return getRoot(self);
            },
        }))
        .actions(self => ({
            ...hasAttributeTrait(self.values),
            getValuesAsJson() {
                return getSnapshot(self.values);
            },
            setSubmitting(submitting) {
                self.submitting = submitting;
            },
            reset() {
                applySnapshot(self.values, defualtValues);
            },
            clear() {
                applySnapshot(self.values, {});
            },
            setValues(values) {
                self.values = values;
            },
        }));
}
