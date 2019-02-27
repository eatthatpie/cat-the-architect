import AnimationState from "./AnimationState";
import AnimationStateInterface from "@/interfaces/AnimationStateInterface";
import BootableInterface from "@/interfaces/BootableInterface";
import LauncherConfigInterface from "@/interfaces/LauncherConfigInterface";
import MediatorColleagueBase from "@/common/MediatorColleagueBase";
import MediatorColleagueInterface from "@/interfaces/MediatorColleagueInterface";
import MediatorMessageInterface from "@/interfaces/MediatorMessageInterface";
import AnimationSetInterface from "@/interfaces/AnimationSetInterface";
import AnimatableInterface from "@/interfaces/AnimatableInterface";

export default class AnimationManager extends MediatorColleagueBase implements BootableInterface {
    private animationSetCollection: Array<AnimationSetInterface>;

    public boot(config: LauncherConfigInterface) {
        
    }

    public addAnimationSet(animationSet: AnimationSetInterface): void {
        if (this.animationSetCollection.filter(item => item.getName() === animationSet.getName()).length > 0) {
            throw new Error(`
                [Animation Manager] Cannot add animation set with given name "${animationSet.getName()}"; name already in use.
            `);

            return;
        }

        this.animationSetCollection.push(animationSet);
    }

    public play(name: string, entity: AnimatableInterface) {
        // get set from collection by name
        // add it to animation state
        const entryAnimationState = new AnimationState();

        // @TODO: dodaj parametry i event hooki (onEnd, onStart, etc);

        entity.setAnimationState(entryAnimationState);
    }

    public retriveMediatorMessage(mediatorMessage: MediatorMessageInterface, sender: MediatorColleagueInterface): void {
        if (mediatorMessage.type === 'updateAnimationState') {
            const currentState = mediatorMessage.params.state;
            const updatedState = this.updateAnimationState(currentState, mediatorMessage.params.elapsedTime);

            mediatorMessage.params.updatedState = updatedState;
        }

        if (mediatorMessage.type === 'addAnimationSet') {
            this.addAnimationSet(mediatorMessage.params.animationSet);
        }
    }

    public shutdown(): void {
        
    }

    private updateAnimationState(animationState: AnimationStateInterface, elapsedTime: number): AnimationStateInterface {
        const frameTime = animationState.increaseFrameTime(elapsedTime);

        const animationSet = animationState.getAnimationSet();
        if (animationSet) {
            animationState.getAnimationSet().update(elapsedTime);
        }

        return animationState;
    }
};