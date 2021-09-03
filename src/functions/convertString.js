export default function convertString(value) {
    value = value.replace(/ +/g, "");
    value = value.toLowerCase().trim();
    return value;
}