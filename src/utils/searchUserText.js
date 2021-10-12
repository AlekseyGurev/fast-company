export function searchUserText(user, value) {
    if (String(user).toLowerCase().indexOf(String(value).toLowerCase()) !== -1) {
        return true;
    } else { return false; }
};
