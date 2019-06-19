export interface ClassType<T> {
  new(...args:any[]):T;
}

export interface NodeClassType<TNode> {
  new():TNode;
}

export type NativeType = string | number | boolean;
