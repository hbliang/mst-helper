import dayjs from 'dayjs';

export const hasValuesTrait = (values) => {
    return {
        setValue(name, value) {
            values[name] = value;
        },
        setValueByElement(e) {
            const { value, checked, type, name } = e.target;
            if (type === 'checkbox') {
                values[name] = checked;
            } else if (type === 'number') {
                values[name] = Number(value);
            } else if (type === 'datetime-local') {
                values[name] = dayjs(value).toString('YYYY-MM-DD HH:mm:ss');
            } else {
                values[name] = value;
            }
        },
    }
}
