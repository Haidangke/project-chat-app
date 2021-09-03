export default function getLastMessage(data, idUser) {
    const lengthData= data.length;
    for (let i = lengthData - 1; i >= 0; i--) {
        if (data[i].idUser === idUser) {
            return data[i];
        }
    }
}