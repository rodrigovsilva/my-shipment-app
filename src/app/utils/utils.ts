export default class Utils {

    static padLeft(number, length, char) {
        let result = '' + number;
        while (result.length < length) {
            result = char + result;
        }
        return result;
    }
}
