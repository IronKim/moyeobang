const normalizePhoneNumber = (value = '') => value.replace(/\D/g, '').slice(0, 11);

const formatPhoneNumber = (value = '') => {
    const digits = normalizePhoneNumber(value);

    if (!digits) {
        return '';
    }

    if (digits.startsWith('02')) {
        if (digits.length <= 2) {
            return digits;
        }

        if (digits.length <= 5) {
            return `${digits.slice(0, 2)}-${digits.slice(2)}`;
        }

        const middleLength = digits.length <= 9 ? 3 : 4;
        const middle = digits.slice(2, 2 + middleLength);
        const last = digits.slice(2 + middleLength);

        return last ? `${digits.slice(0, 2)}-${middle}-${last}` : `${digits.slice(0, 2)}-${middle}`;
    }

    if (digits.length <= 3) {
        return digits;
    }

    if (digits.length <= 6) {
        return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }

    if (digits.length <= 10) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

const normalizeEmail = (value = '') => value.trim();

const normalizeBusinessNumber = (value = '') => value.replace(/\D/g, '').slice(0, 10);

const formatBusinessNumber = (value = '') => {
    const digits = normalizeBusinessNumber(value);

    if (digits.length <= 3) {
        return digits;
    }

    if (digits.length <= 5) {
        return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }

    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
};

export const phone = {
    normalize: normalizePhoneNumber,
    format: formatPhoneNumber,
};

export const email = {
    normalize: normalizeEmail,
};

export const business = {
    normalize: normalizeBusinessNumber,
    format: formatBusinessNumber,
};