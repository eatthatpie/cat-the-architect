import AbsorbableGridBlockDecorator from "./AbsorbableGridBlockDecorator";
import CollidableGridBlockDecorator from "./CollidableGridBlockDecorator";
import GridBlock from "./GridBlock";

describe(`Grid block decorator`, () => {
    test(`implementations are foldable`, () => {
        const decorator = new AbsorbableGridBlockDecorator(
            new CollidableGridBlockDecorator(
                new GridBlock({ cols: 2, rows: 2 })
            )
        );

        const gridBlock = new GridBlock({ cols: 1, rows: 2 });

        expect(() => decorator.absorb(gridBlock)).not.toThrow();
        expect(() => decorator.isCollidingWith(gridBlock)).not.toThrow();
    });
});