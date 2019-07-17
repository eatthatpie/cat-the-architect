import BlockTypes from '../resources/BlockTypes';
import RotatableGridBlockContract from "../interfaces/RotatableGridBlockContract";

export default class RotatableGridBlockGenerator {
    protected blocksCollection: Array<RotatableGridBlockContract>;

    constructor() {
        this.blocksCollection = [
            {
                cols: 4,
                rows: 4,
                rotationSteps: [
                    [
                        { row: 1, col: 2 },
                        { row: 2, col: 2 },
                        { row: 3, col: 2 },
                        { row: 4, col: 2 }
                    ],
                    [
                        { row: 2, col: 1 },
                        { row: 2, col: 2 },
                        { row: 2, col: 3 },
                        { row: 2, col: 4 }
                    ]
                ]
            },
            {
                cols: 3,
                rows: 3,
                rotationSteps: [
                    [
                        { row: 1, col: 1 },
                        { row: 1, col: 2 },
                        { row: 2, col: 2 },
                        { row: 3, col: 2 }
                    ],
                    [
                        { row: 1, col: 3 },
                        { row: 2, col: 1 },
                        { row: 2, col: 2 },
                        { row: 2, col: 3 }
                    ],
                    [
                        { row: 1, col: 1 },
                        { row: 2, col: 1 },
                        { row: 3, col: 1 },
                        { row: 3, col: 2 }
                    ],
                    [
                        { row: 1, col: 1 },
                        { row: 1, col: 2 },
                        { row: 1, col: 3 },
                        { row: 2, col: 1 }
                    ]
                ]
            },
            {
                cols: 3,
                rows: 3,
                rotationSteps: [
                    [
                        { row: 1, col: 1 },
                        { row: 1, col: 2 },
                        { row: 2, col: 1 },
                        { row: 3, col: 1 }
                    ],
                    [
                        { row: 1, col: 1 },
                        { row: 1, col: 2 },
                        { row: 1, col: 3 },
                        { row: 2, col: 3 }
                    ],
                    [
                        { row: 1, col: 2 },
                        { row: 2, col: 2 },
                        { row: 3, col: 1 },
                        { row: 3, col: 2 }
                    ],
                    [
                        { row: 1, col: 1 },
                        { row: 2, col: 1 },
                        { row: 2, col: 2 },
                        { row: 2, col: 3 }
                    ]
                ]
            },
            // 3 + 1
            {
                cols: 3,
                rows: 3,
                rotationSteps: [
                    [
                        { row: 1, col: 2 },
                        { row: 2, col: 1 },
                        { row: 2, col: 2 },
                        { row: 2, col: 3 }
                    ],
                    [
                        { row: 1, col: 2 },
                        { row: 2, col: 2 },
                        { row: 2, col: 3 },
                        { row: 3, col: 2 }
                    ],
                    [
                        { row: 2, col: 1 },
                        { row: 2, col: 2 },
                        { row: 2, col: 3 },
                        { row: 3, col: 2 }
                    ],
                    [
                        { row: 1, col: 2 },
                        { row: 2, col: 2 },
                        { row: 2, col: 1 },
                        { row: 3, col: 2 }
                    ]
                ]
            },
            {
                cols: 3,
                rows: 3,
                rotationSteps: [
                    [
                        { row: 1, col: 2 },
                        { row: 1, col: 3 },
                        { row: 2, col: 1 },
                        { row: 2, col: 2 }
                    ],
                    [
                        { row: 1, col: 1 },
                        { row: 2, col: 1 },
                        { row: 2, col: 2 },
                        { row: 3, col: 2 }
                    ]
                ]
            },
            {
                cols: 3,
                rows: 3,
                rotationSteps: [
                    [
                        { row: 1, col: 1 },
                        { row: 1, col: 2 },
                        { row: 2, col: 2 },
                        { row: 2, col: 3 }
                    ],
                    [
                        { row: 1, col: 2 },
                        { row: 2, col: 1 },
                        { row: 2, col: 2 },
                        { row: 3, col: 1 }
                    ]
                ]
            },
            {
                cols: 2,
                rows: 2,
                rotationSteps: [
                    [
                        { row: 1, col: 1 },
                        { row: 1, col: 2 },
                        { row: 2, col: 1 },
                        { row: 2, col: 2 }
                    ]
                ]
            }
        ];
    }

    public generate(): RotatableGridBlockContract {
        let randomIndex = Math.floor(Math.random() * this.blocksCollection.length);
        let randomType = Math.floor(Math.random() * BlockTypes.length);

        randomIndex = randomIndex >= this.blocksCollection.length
            ? randomIndex - 1
            : randomIndex;

        let out = this.blocksCollection[randomIndex];

        const type = BlockTypes[randomType];

        out.rotationSteps = out.rotationSteps.map(item => {
            return item.map(subitem => Object.assign(subitem, { type }))
        });

        return out;
    }
}