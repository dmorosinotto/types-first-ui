/*
   Copyright Avero, LLC

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

import { Observable } from 'rxjs';

// function that takes a state instance and returns a new, transformed state instance
export type StateTransform<T extends object> = (state: T) => T;

// we differ from redux action defintion in that we require a payload
// having a uniform structure gives us nice inference capabilities
export interface Action {
  type: string;
  payload: object;
}

export type Dispatch<TActions extends Action> = (a: TActions) => void;

export type IReducer<TState extends object, TAction extends Action> = (
  state: TState,
  action: TAction
) => TState;

export type Epic<
  TWatchedAction extends Action,
  TReturnedAction extends Action,
  TEpicDependencies extends object
> = (
  action$: Observable<TWatchedAction>,
  deps: TEpicDependencies
) => Observable<TReturnedAction>;

export type SingleActionEpic<
  TAllActions extends Action,
  TAction extends TAllActions,
  TEpicDependencies extends object
> = Epic<TAction, TAllActions, TEpicDependencies>;

export type MiddlewareEpic<
  TAllActions extends Action,
  TEpicDependencies extends object
> = Epic<TAllActions, never, TEpicDependencies>;

export type AllActionsEpic<
  TAllActions extends Action,
  TEpicDependencies extends object
> = Epic<TAllActions, TAllActions, TEpicDependencies>;

// Eventually should be moved to async package
export interface IError<T extends Action> {
  message: string;
  id: string;
  timeout?: number;
  action?: T & { meta: { errorId: IError<T>['id'] } };
  buttonText?: string;
  topic: T['type'];
}
export type ErrorCreator<T extends Action> = (action: T, err: any) => IError<T>;

// Utility - infers the type of the first argument of a function
export type Arg0<T> = T extends (args0: infer R, ...any: any[]) => any ? R : never;
