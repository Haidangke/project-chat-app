export default function convertNameToAvatar (name) {
    const nameConvert = name.split(' ');
    return nameConvert[nameConvert.length - 1][0];
}