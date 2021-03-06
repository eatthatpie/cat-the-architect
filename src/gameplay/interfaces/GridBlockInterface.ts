import GridCoordInterface from "./GridCoordInterface";
import { Direction } from "@/common/Types";

export default interface GridBlockInterface {
    absorb(
        gridBlock: GridBlockInterface,
        coords?: GridCoordInterface
    ): GridBlockInterface;
    addRotationStep(cells: Array <any>): void;
    collapse(): void;
    getCollisionPositionWith(
        gridBlock: GridBlockInterface,
        direction: Direction,
        coords?: GridCoordInterface
    ): GridCoordInterface;
    getHeight(): number;
    getNextRotationArray(): Array<any>;
    getWidth(): number;
    isCollapsable(): Boolean;
    isCollidingWith(
        gridBlock: GridBlockInterface,
        coords?: GridCoordInterface
    ): Boolean;
    rotate(): void;
    setCells(cells: Array<any>): void;
    toArray(): Array<any>;
};