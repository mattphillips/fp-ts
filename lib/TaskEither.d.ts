/**
 * @file `TaskEither<L, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `L`. If you want to represent an asynchronous computation that never fails, please see `Task`.
 */
import { Alt2 } from './Alt';
import { Bifunctor2 } from './Bifunctor';
import * as E from './Either';
import { Predicate, Refinement, Lazy } from './function';
import { IOEither } from './IOEither';
import { Monad2 } from './Monad';
import { MonadIO2 } from './MonadIO';
import { MonadTask2 } from './MonadTask';
import { Monoid } from './Monoid';
import { Semigroup } from './Semigroup';
import { Task } from './Task';
import { Option } from './Option';
import { IO } from './IO';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        TaskEither: TaskEither<L, A>;
    }
}
/**
 * @since 2.0.0
 */
export declare const URI = "TaskEither";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface TaskEither<L, A> extends Task<E.Either<L, A>> {
}
/**
 * @since 2.0.0
 */
export declare const left: <L>(l: L) => TaskEither<L, never>;
/**
 * @since 2.0.0
 */
export declare const right: <A>(a: A) => TaskEither<never, A>;
/**
 * @since 2.0.0
 */
export declare function rightIO<A>(ma: IO<A>): TaskEither<never, A>;
/**
 * @since 2.0.0
 */
export declare function leftIO<L>(ml: IO<L>): TaskEither<L, never>;
/**
 * @since 2.0.0
 */
export declare const rightTask: <A>(ma: Task<A>) => TaskEither<never, A>;
/**
 * @since 2.0.0
 */
export declare const leftTask: <L>(ml: Task<L>) => TaskEither<L, never>;
/**
 * @since 2.0.0
 */
export declare const fromEither: <L, A>(ma: E.Either<L, A>) => TaskEither<L, A>;
/**
 * @since 2.0.0
 */
export declare function fromOption<L, A>(ma: Option<A>, onNone: () => L): TaskEither<L, A>;
/**
 * @since 2.0.0
 */
export declare const fromIOEither: <L, A>(fa: IOEither<L, A>) => TaskEither<L, A>;
/**
 * @since 2.0.0
 */
export declare function fromPredicate<L, A, B extends A>(predicate: Refinement<A, B>, onFalse: (a: A) => L): (a: A) => TaskEither<L, B>;
export declare function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => TaskEither<L, A>;
/**
 * @since 2.0.0
 */
export declare const fold: <L, A, R>(onLeft: (l: L) => Task<R>, onRight: (a: A) => Task<R>) => (ma: TaskEither<L, A>) => Task<R>;
/**
 * @since 2.0.0
 */
export declare const getOrElse: <L, A>(f: (l: L) => Task<A>) => (ma: TaskEither<L, A>) => Task<A>;
/**
 * @since 2.0.0
 */
export declare function filterOrElse<L, A, B extends A>(predicate: Refinement<A, B>, zero: (a: A) => L): (ma: TaskEither<L, A>) => TaskEither<L, B>;
export declare function filterOrElse<L, A>(predicate: Predicate<A>, zero: (a: A) => L): (ma: TaskEither<L, A>) => TaskEither<L, A>;
/**
 * @since 2.0.0
 */
export declare const orElse: <L, A, M>(f: (l: L) => TaskEither<M, A>) => (ma: TaskEither<L, A>) => TaskEither<M, A>;
/**
 * @since 2.0.0
 */
export declare const swap: <L, A>(ma: TaskEither<L, A>) => TaskEither<A, L>;
/**
 * @since 2.0.0
 */
export declare function getSemigroup<L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getApplySemigroup<L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getApplyMonoid<L, A>(M: Monoid<A>): Monoid<TaskEither<L, A>>;
/**
 * @since 2.0.0
 */
export declare function tryCatch<L, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => L): TaskEither<L, A>;
/**
 * Make sure that a resource is cleaned up in the event of an exception. The
 * release action is called regardless of whether the body action throws or
 * returns.
 *
 * @since 2.0.0
 */
export declare const bracket: <L, A, B>(acquire: TaskEither<L, A>, use: (a: A) => TaskEither<L, B>, release: (a: A, e: E.Either<L, B>) => TaskEither<L, void>) => TaskEither<L, B>;
/**
 * Convert a node style callback function to one returning a `TaskEither`
 *
 * **Note**. If the function `f` admits multiple overloadings, `taskify` will pick last one. If you want a different
 * behaviour, add an explicit type annotation
 *
 * ```ts
 * // readFile admits multiple overloadings
 *
 * // const readFile: (a: string) => TaskEither<NodeJS.ErrnoException, Buffer>
 * const readFile = taskify(fs.readFile)
 *
 * const readFile2: (filename: string, encoding: string) => TaskEither<NodeJS.ErrnoException, Buffer> = taskify(
 *   fs.readFile
 * )
 * ```
 *
 * @example
 * import { taskify } from 'fp-ts/lib/TaskEither'
 * import * as fs from 'fs'
 *
 * // const stat: (a: string | Buffer) => TaskEither<NodeJS.ErrnoException, fs.Stats>
 * const stat = taskify(fs.stat)
 * assert.strictEqual(stat.length, 0)
 *
 *
 * @since 2.0.0
 */
export declare function taskify<L, R>(f: (cb: (e: L | null | undefined, r?: R) => void) => void): () => TaskEither<L, R>;
export declare function taskify<A, L, R>(f: (a: A, cb: (e: L | null | undefined, r?: R) => void) => void): (a: A) => TaskEither<L, R>;
export declare function taskify<A, B, L, R>(f: (a: A, b: B, cb: (e: L | null | undefined, r?: R) => void) => void): (a: A, b: B) => TaskEither<L, R>;
export declare function taskify<A, B, C, L, R>(f: (a: A, b: B, c: C, cb: (e: L | null | undefined, r?: R) => void) => void): (a: A, b: B, c: C) => TaskEither<L, R>;
export declare function taskify<A, B, C, D, L, R>(f: (a: A, b: B, c: C, d: D, cb: (e: L | null | undefined, r?: R) => void) => void): (a: A, b: B, c: C, d: D) => TaskEither<L, R>;
export declare function taskify<A, B, C, D, E, L, R>(f: (a: A, b: B, c: C, d: D, e: E, cb: (e: L | null | undefined, r?: R) => void) => void): (a: A, b: B, c: C, d: D, e: E) => TaskEither<L, R>;
/**
 * @since 2.0.0
 */
export declare const taskEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadIO2<URI> & MonadTask2<URI>;
/**
 * Like `TaskEither` but `ap` is sequential
 *
 * @since 2.0.0
 */
export declare const taskEitherSeq: typeof taskEither;
