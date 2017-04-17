// Generated by dts-bundle v0.7.2

declare module 'ash' {
    export { ClassMap } from 'ash/ClassMap';
    export { Signal0 } from 'ash/signals/Signal0';
    export { Signal1 } from 'ash/signals/Signal1';
    export { Signal2 } from 'ash/signals/Signal2';
    export { Signal3 } from 'ash/signals/Signal3';
    export { ComponentMatchingFamily } from 'ash/core/ComponentMatchingFamily';
    export { Engine } from 'ash/core/Engine';
    export { Entity } from 'ash/core/Entity';
    export { IFamily } from 'ash/core/IFamily';
    export { Node, keep } from 'ash/core/Node';
    export { NodeList } from 'ash/core/NodeList';
    export { NodePool } from 'ash/core/NodePool';
    export { System } from 'ash/core/System';
    export { EntityStateMachine } from 'ash/fsm/EntityStateMachine';
    export { EngineStateMachine } from 'ash/fsm/EngineStateMachine';
    export { ITickProvider } from 'ash/tick/ITickProvider';
    export { RAFTickProvider } from 'ash/tick/RAFTickProvider';
    export { ComponentPool } from 'ash/tools/ComponentPool';
    export { ListIteratingSystem } from 'ash/tools/ListIteratingSystem';
}

declare module 'ash/ClassMap' {
    export class ClassMap<TKey, TValue> {
        constructor();
        set(key: TKey, value: TValue): TValue;
        get(key: TKey): TValue;
        has(key: TKey): boolean;
        remove(key: TKey): TValue;
        keys(): TKey[];
        values(): TValue[];
    }
}

declare module 'ash/signals/Signal0' {
    import { SignalBase } from "ash/signals/SignalBase";
    export class Signal0 extends SignalBase<() => void> {
        dispatch(): void;
    }
}

declare module 'ash/signals/Signal1' {
    import { SignalBase } from "ash/signals/SignalBase";
    export class Signal1<T> extends SignalBase<(a: T) => void> {
        dispatch(object: T): void;
    }
}

declare module 'ash/signals/Signal2' {
    import { SignalBase } from "ash/signals/SignalBase";
    export class Signal2<T1, T2> extends SignalBase<(a: T1, b: T2) => void> {
        dispatch(object1: T1, object2: T2): void;
    }
}

declare module 'ash/signals/Signal3' {
    import { SignalBase } from "ash/signals/SignalBase";
    export class Signal3<T1, T2, T3> extends SignalBase<(a: T1, b: T2, c: T3) => void> {
        dispatch(object1: T1, object2: T2, object3: T3): void;
    }
}

declare module 'ash/core/ComponentMatchingFamily' {
    import { ClassMap } from "ash/ClassMap";
    import { Engine } from "ash/core/Engine";
    import { Entity } from "ash/core/Entity";
    import { IFamily } from "ash/core/IFamily";
    import { Node } from "ash/core/Node";
    import { NodeList } from "ash/core/NodeList";
    export class ComponentMatchingFamily<TNode extends Node<any>> implements IFamily<TNode> {
        components: ClassMap<{
            new (): any;
        }, string>;
        constructor(nodeClass: {
            new (): TNode;
        }, engine: Engine);
        readonly nodeList: NodeList<TNode>;
        newEntity(entity: Entity): void;
        componentAddedToEntity(entity: Entity, componentClass: {
            new (..._: any[]): any;
        }): void;
        componentRemovedFromEntity(entity: Entity, componentClass: {
            new (..._: any[]): any;
        }): void;
        removeEntity(entity: Entity): void;
        cleanUp(): void;
    }
}

declare module 'ash/core/Engine' {
    import { Entity } from "ash/core/Entity";
    import { Node } from "ash/core/Node";
    import { NodeList } from "ash/core/NodeList";
    import { Signal0 } from "ash/signals/Signal0";
    import { System } from "ash/core/System";
    export class Engine {
        updating: boolean;
        updateComplete: Signal0;
        familyClass: any;
        constructor();
        addEntity(entity: Entity): void;
        removeEntity(entity: Entity): void;
        getEntityByName(name: string): Entity;
        removeAllEntities(): void;
        readonly entities: Entity[];
        getNodeList<TNode extends Node<any>>(nodeClass: {
            new (): TNode;
        }): NodeList<TNode>;
        releaseNodeList<TNode extends Node<any>>(nodeClass: {
            new (): TNode;
        }): void;
        addSystem(system: System, priority: number): void;
        getSystem<TSystem extends System>(type: {
            new (..._: any[]): TSystem;
        }): TSystem;
        readonly systems: System[];
        removeSystem(system: System): void;
        removeAllSystems(): void;
        update(time: number): void;
    }
}

declare module 'ash/core/Entity' {
    import { Signal2 } from "ash/signals/Signal2";
    import { ClassMap } from "ash/ClassMap";
    export class Entity {
        componentAdded: Signal2<Entity, {
            new (..._: any[]): any;
        }>;
        componentRemoved: Signal2<Entity, {
            new (..._: any[]): any;
        }>;
        nameChanged: Signal2<Entity, string>;
        previous: Entity;
        next: Entity;
        components: ClassMap<{
            new (..._: any[]): any;
        }, any>;
        constructor(name?: string);
        name: string;
        add<T>(component: T, componentClass?: {
            new (..._: any[]): T;
        }): this;
        remove<T>(componentClass: {
            new (..._: any[]): T;
        }): T;
        get<T>(componentClass: {
            new (..._: any[]): T;
        }): T;
        getAll(): any[];
        has<T>(componentClass: {
            new (..._: any[]): T;
        }): boolean;
    }
}

declare module 'ash/core/IFamily' {
    import { Entity } from "ash/core/Entity";
    import { Node } from "ash/core/Node";
    import { NodeList } from "ash/core/NodeList";
    export interface IFamily<TNode extends Node<any>> {
        nodeList: NodeList<TNode>;
        newEntity(entity: Entity): void;
        removeEntity(entity: Entity): void;
        componentAddedToEntity(entity: Entity, componentClass: {
            new (..._: any[]): any;
        }): void;
        componentRemovedFromEntity(entity: Entity, componentClass: {
            new (..._: any[]): any;
        }): void;
        cleanUp(): void;
    }
}

declare module 'ash/core/Node' {
    import { Entity } from "ash/core/Entity";
    export class Node<TNode> {
        entity: Entity;
        previous: TNode;
        next: TNode;
    }
    export function keep(type: {
        new (..._: any[]): any;
    }): Function;
}

declare module 'ash/core/NodeList' {
    import { Signal1 } from "ash/signals/Signal1";
    import { Node } from 'ash/core/Node';
    export class NodeList<TNode extends Node<any>> {
        head: TNode;
        tail: TNode;
        nodeAdded: Signal1<TNode>;
        nodeRemoved: Signal1<TNode>;
        constructor();
        add(node: TNode): void;
        remove(node: TNode): void;
        removeAll(): void;
        readonly empty: Boolean;
        swap(node1: TNode, node2: TNode): void;
        insertionSort(sortFunction: Function): void;
        mergeSort(sortFunction: (a: TNode, b: TNode) => number): void;
    }
}

declare module 'ash/core/NodePool' {
    import { ClassMap } from "ash/ClassMap";
    import { Node } from "ash/core/Node";
    export class NodePool<TNode extends Node<any>> {
        constructor(nodeClass: {
            new (): TNode;
        }, components: ClassMap<{
            new (..._: any[]): any;
        }, string>);
        get(): TNode;
        dispose(node: TNode): void;
        cache(node: TNode): void;
        releaseCache(): void;
    }
}

declare module 'ash/core/System' {
    import { Engine } from "ash/core/Engine";
    export abstract class System {
        previous: System;
        next: System;
        priority: number;
        abstract addToEngine(engine: Engine): void;
        abstract removeFromEngine(engine: Engine): void;
        abstract update(time: number): void;
    }
}

declare module 'ash/fsm/EntityStateMachine' {
    import { Entity } from 'ash/core/Entity';
    import { EntityState } from 'ash/fsm/EntityState';
    export class EntityStateMachine {
        entity: Entity;
        constructor(entity: Entity);
        addState(name: string, state: EntityState): this;
        createState(name: string): EntityState;
        changeState(name: string): void;
    }
}

declare module 'ash/fsm/EngineStateMachine' {
    import { EngineState } from 'ash/fsm/EngineState';
    import { Engine } from 'ash/core/Engine';
    export class EngineStateMachine {
        engine: Engine;
        constructor(engine: Engine);
        addState(name: string, state: EngineState): this;
        createState(name: string): EngineState;
        changeState(name: string): void;
    }
}

declare module 'ash/tick/ITickProvider' {
    export interface ITickProvider {
        playing: boolean;
        add(listener: Function): void;
        remove(listener: Function): void;
        start(): void;
        stop(): void;
    }
}

declare module 'ash/tick/RAFTickProvider' {
    import { Signal1 } from 'ash/signals/Signal1';
    import { ITickProvider } from 'ash/tick/ITickProvider';
    export class RAFTickProvider extends Signal1<number> implements ITickProvider {
        playing: boolean;
        constructor();
        start(): void;
        stop(): void;
    }
}

declare module 'ash/tools/ComponentPool' {
    export class ComponentPool {
        static get<T>(componentClass: {
            new (): T;
        }): T;
        static dispose<T>(component: T): void;
        static empty(): void;
    }
}

declare module 'ash/tools/ListIteratingSystem' {
    import { Engine } from 'ash/core/Engine';
    import { Node } from 'ash/core/Node';
    import { NodeList } from 'ash/core/NodeList';
    import { System } from 'ash/core/System';
    export interface ListIteratingSystem<TNode extends Node<any>> {
        nodeAdded?(node: Node<TNode>): void;
        nodeRemoved?(node: Node<TNode>): void;
    }
    export abstract class ListIteratingSystem<TNode extends Node<any>> extends System {
        protected nodeList: NodeList<TNode>;
        protected nodeClass: {
            new (): TNode;
        };
        constructor(nodeClass: {
            new (..._: any[]): TNode;
        });
        addToEngine(engine: Engine): void;
        removeFromEngine(engine: Engine): void;
        update(time: number): void;
        abstract updateNode(node: Node<TNode>, delta: number): void;
    }
}

declare module 'ash/signals/SignalBase' {
    import { ListenerNode } from "ash/signals/ListenerNode";
    export class SignalBase<TListener> {
        protected head: ListenerNode<TListener>;
        protected tail: ListenerNode<TListener>;
        constructor();
        protected startDispatch(): void;
        protected endDispatch(): void;
        readonly numListeners: number;
        add(listener: TListener): void;
        addOnce(listener: TListener): void;
        protected addNode(node: ListenerNode<TListener>): void;
        remove(listener: TListener): void;
        removeAll(): void;
    }
}

declare module 'ash/fsm/EntityState' {
    import { IComponentProvider } from 'ash/fsm/IComponentProvider';
    import { StateComponentMapping } from 'ash/fsm/StateComponentMapping';
    import { ClassMap } from 'ash/ClassMap';
    export class EntityState {
        providers: ClassMap<{
            new (..._: any[]): any;
        }, any>;
        add<TComponent>(type: {
            new (..._: any[]): TComponent;
        }): StateComponentMapping<TComponent>;
        get<TComponent>(type: {
            new (..._: any[]): TComponent;
        }): IComponentProvider<TComponent>;
        has<TComponent>(type: {
            new (..._: any[]): TComponent;
        }): Boolean;
    }
}

declare module 'ash/fsm/EngineState' {
    import { ISystemProvider } from 'ash/fsm/ISystemProvider';
    import { StateSystemMapping } from 'ash/fsm/StateSystemMapping';
    import { System } from 'ash/core/System';
    export class EngineState {
        providers: ISystemProvider<any>[];
        addInstance<TSystem extends System>(system: TSystem): StateSystemMapping<TSystem>;
        addSingleton<TSystem extends System>(type: {
            new (..._: any[]): TSystem;
        }): StateSystemMapping<TSystem>;
        addMethod<TSystem extends System>(method: () => TSystem): StateSystemMapping<TSystem>;
        addProvider<TSystem extends System>(provider: ISystemProvider<TSystem>): StateSystemMapping<TSystem>;
    }
}

declare module 'ash/signals/ListenerNode' {
    export class ListenerNode<TListener> {
        previous: ListenerNode<TListener>;
        next: ListenerNode<TListener>;
        listener: TListener;
        once: boolean;
    }
}

declare module 'ash/fsm/IComponentProvider' {
    export interface IComponentProvider<TComponent> {
        getComponent(): TComponent;
        identifier: any;
    }
}

declare module 'ash/fsm/StateComponentMapping' {
    import { EntityState } from 'ash/fsm/EntityState';
    import { IComponentProvider } from 'ash/fsm/IComponentProvider';
    export class StateComponentMapping<TComponent> {
        constructor(creatingState: EntityState, type: {
            new (..._: any[]): TComponent;
        });
        withInstance(component: TComponent): this;
        withType(type: {
            new (..._: any[]): TComponent;
        }): this;
        withSingleton(type?: {
            new (..._: any[]): any;
        }): this;
        withMethod(method: () => TComponent): this;
        withProvider(provider: IComponentProvider<TComponent>): this;
        add<TComponent>(type: {
            new (..._: any[]): TComponent;
        }): StateComponentMapping<TComponent>;
    }
}

declare module 'ash/fsm/ISystemProvider' {
    import { System } from 'ash/core/System';
    export interface ISystemProvider<TSystem extends System> {
        getSystem(): TSystem;
        identifier: any;
        priority: number;
    }
}

declare module 'ash/fsm/StateSystemMapping' {
    import { EngineState } from 'ash/fsm/EngineState';
    import { ISystemProvider } from 'ash/fsm/ISystemProvider';
    import { System } from 'ash/core/System';
    export class StateSystemMapping<TSystem extends System> {
        constructor(creatingState: EngineState, provider: ISystemProvider<TSystem>);
        withPriority(priority: number): StateSystemMapping<TSystem>;
        addInstance(system: TSystem): StateSystemMapping<TSystem>;
        addSingleton(type: {
            new (..._: any[]): TSystem;
        }): StateSystemMapping<TSystem>;
        addMethod(method: () => TSystem): StateSystemMapping<TSystem>;
        addProvider(provider: ISystemProvider<TSystem>): StateSystemMapping<TSystem>;
    }
}

