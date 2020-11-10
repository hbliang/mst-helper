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
        .models(valuesAttributes)

    const Errors = types
        .models(errorsAttributes)

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
                applySnapshot(self.values, defualtValues);
                applySnapshot(self.errors, defaultErrors);
            },
            clear() {
                applySnapshot(self.values, {});
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
