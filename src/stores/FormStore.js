import { types, applySnapshot, getRoot, getSnapshot } from 'mobx-state-tree';
import { hasValuesTrait } from './../helper';
import { merge } from 'lodash';

export const resolveFormStore = (params = {}) => {
    const defaultParams = {
        valuesAttributes: {},
        defualtValues: {},
        errorsAttributes: {},
        defaultErrors: {},
    };

    const {
        valuesAttributes,
        defualtValues,
        errorsAttributes,
        defaultErrors,
    } = merge(defaultParams, params);

    const Values = types
        .model(valuesAttributes)

    const Errors = types
        .model(errorsAttributes)

    return types
        .model('FormStore', {
            values: types.optional(Values, defualtValues),
            submitting: false,
            errors: types.optional(Errors, defaultErrors),
        })
        .views(self => ({
            get root() {
                return getRoot(self);
            },
        }))
        .actions(self => ({
            ...hasValuesTrait(self.values),
            getValuesAsJson() {
                return getSnapshot(self.values);
            },
            setSubmitting(submitting) {
                self.submitting = submitting;
            },
            reset() {
                self.resetValues();
                self.resetErrors();
            },
            clear() {
                self.clearValues();
                self.clearErrors();
            },
            resetValues() {
                applySnapshot(self.values, defualtValues);
            },
            clearValues() {
                applySnapshot(self.values, {});
            },
            resetErrors() {
                applySnapshot(self.errors, defaultErrors);
            },
            clearErrors() {
                applySnapshot(self.errors, {});
            },
            setValues(values) {
                self.values = values;
            },
            setErrors(errors) {
                self.errors = errors;
            },
        }));
}
