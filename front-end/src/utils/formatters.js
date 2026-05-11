const normalizePhoneNumber = (value = '') => String(value ?? '').replace(/\D/g, '').slice(0, 11);

const normalizeKoreaPhoneNumber = (value = '') => String(value ?? '').replace(/\D/g, '').slice(0, 11);

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

const formatKoreaPhoneNumber = (value = '') => {
    const digits = normalizeKoreaPhoneNumber(value);

    if (!digits) {
        return '';
    }

    // 대표번호 (예: 1588-1234)
    if (/^1[5-8]/.test(digits)) {
        if (digits.length <= 4) {
            return digits;
        }
        return `${digits.slice(0, 4)}-${digits.slice(4, 8)}`;
    }

    // 서울(02)
    if (digits.startsWith('02')) {
        if (digits.length <= 2) {
            return digits;
        }
        if (digits.length <= 5) {
            return `${digits.slice(0, 2)}-${digits.slice(2)}`;
        }
        if (digits.length <= 9) {
            return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
        }
        return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
    }

    // 지역/휴대폰/인터넷전화(3자리 국번)
    if (digits.length <= 3) {
        return digits;
    }
    if (digits.length <= 7) {
        return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }
    if (digits.length <= 10) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

const isValidKoreaPhoneNumber = (value = '') => {
    const digits = normalizeKoreaPhoneNumber(value);

    if (!digits) {
        return false;
    }

    return /^(02\d{7,8}|0[3-6][1-5]\d{7,8}|0[7][0-6]\d{7,8}|050\d{8}|010\d{8}|01[16789]\d{7,8}|1[5-8]\d{6})$/.test(digits);
};

const normalizeEmail = (value = '') => value.trim();

const normalizeBusinessNumber = (value = '') => String(value ?? '').replace(/\D/g, '').slice(0, 10);

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

export const koreaPhone = {
    normalize: normalizeKoreaPhoneNumber,
    format: formatKoreaPhoneNumber,
    isValid: isValidKoreaPhoneNumber,
};

export const email = {
    normalize: normalizeEmail,
};

export const business = {
    normalize: normalizeBusinessNumber,
    format: formatBusinessNumber,
};