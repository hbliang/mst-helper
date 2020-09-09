import { types, applySnapshot, getRoot, getSnapshot } from 'mobx-state-tree';
import { hasAttributeTrait } from './../helper';

export const resolveFormStoreType = (formModelType, defualtValue = {}) => {
    return types
        .model('FormStore', {
            value: types.optional(formModelType, defualtValue),
            submitting: false,
        })
        .views(self => ({
            get root() {
                return getRoot(self);
            },
        }))
        .actions(self => ({
            ...hasAttributeTrait(self.value),
            getValueAsJson() {
                return getSnapshot(self.value);
            },
            setSubmitting(submitting) {
                self.submitting = submitting;
            },
            reset() {
                applySnapshot(self.value, defualtValue);
            },
            clear() {
                applySnapshot(self.value, {});
            },
            setValue(value) {
                self.value = value;
            },
        }));
}
