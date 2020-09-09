import dayjs from 'dayjs';

export const hasAttributeTrait = (attributeValue) => {
    return {
        setAttribute(name, value) {
            attributeValue[name] = value;
        },
        setAttributeByElement(e) {
            const { value, checked, type, name } = e.target;
            if (type === 'checkbox') {
                attributeValue[name] = checked;
            } else if (type === 'number') {
                attributeValue[name] = Number(value);
            } else if (type === 'datetime-local') {
                attributeValue[name] = dayjs(value).toString('YYYY-MM-DD HH:mm:ss');
            } else {
                attributeValue[name] = value;
            }
        },
    }
}
