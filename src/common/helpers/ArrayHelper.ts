export default class ArrayHelper {
    public static forEachInMatrix(matrix: Array<Array<any>>, callback: Function): void {
        for (let i = 0; i < matrix.length; i++) {
            const row = matrix[i];

            if (!row) {
                continue;
            }

            for (let j = 0; j < row.length; j++) {
                const item = row[j];

                if (!item) {
                    continue;
                }

                const callbackOutput = callback({ i, j, item });

                if (callbackOutput) {
                    return callbackOutput;
                }
            }
        }
    }

    public static doPairMatchMatrixDimensions(matrix: Array<Array<any>>, i, j): Boolean {
        return !(
            i < 0 ||
            j < 0 ||
            i >= matrix.length ||
            (matrix[0].length > 0 && j >= matrix[0].length) ||
            (matrix[0].length === 0 && j > 0)
        );
    }
};
