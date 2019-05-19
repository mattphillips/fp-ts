import { Either } from './Either';
import { Monoid } from './Monoid';
import { Ord } from './Ord';
import { Semigroup } from './Semigroup';
import { Eq } from './Eq';
import { Predicate, Refinement } from './function';
import { Separated } from './Compactable';
import { Option } from './Option';
import { Show } from './Show';
/**
 * @since 2.0.0
 */
export declare function getShow<A>(S: Show<A>): Show<Set<A>>;
/**
 * @since 2.0.0
 */
export declare const empty: Set<never>;
/**
 * @since 2.0.0
 */
export declare function toArray<A>(O: Ord<A>): (x: Set<A>) => Array<A>;
/**
 * @since 2.0.0
 */
export declare function getEq<A>(E: Eq<A>): Eq<Set<A>>;
/**
 * @since 2.0.0
 */
export declare function some<A>(x: Set<A>, predicate: Predicate<A>): boolean;
/**
 * Projects a Set through a function
 *
 * @since 2.0.0
 */
export declare function map<B>(E: Eq<B>): <A>(set: Set<A>, f: (x: A) => B) => Set<B>;
/**
 * @since 2.0.0
 */
export declare function every<A>(x: Set<A>, predicate: Predicate<A>): boolean;
/**
 * @since 2.0.0
 */
export declare function chain<B>(E: Eq<B>): <A>(set: Set<A>, f: (x: A) => Set<B>) => Set<B>;
/**
 * `true` if and only if every element in the first set is an element of the second set
 *
 * @since 2.0.0
 */
export declare function subset<A>(E: Eq<A>): (x: Set<A>, y: Set<A>) => boolean;
/**
 * @since 2.0.0
 */
export declare function filter<A, B extends A>(x: Set<A>, predicate: Refinement<A, B>): Set<B>;
export declare function filter<A>(x: Set<A>, predicate: Predicate<A>): Set<A>;
/**
 * @since 2.0.0
 */
export declare function partition<A, B extends A>(x: Set<A>, predicate: Refinement<A, B>): Separated<Set<A>, Set<B>>;
export declare function partition<A>(x: Set<A>, predicate: Predicate<A>): Separated<Set<A>, Set<A>>;
/**
 * Test if a value is a member of a set
 *
 * @since 2.0.0
 */
export declare function elem<A>(E: Eq<A>): (a: A, x: Set<A>) => boolean;
/**
 * Form the union of two sets
 *
 * @since 2.0.0
 */
export declare function union<A>(E: Eq<A>): (x: Set<A>, y: Set<A>) => Set<A>;
/**
 * The set of elements which are in both the first and second set
 *
 * @since 2.0.0
 */
export declare function intersection<A>(E: Eq<A>): (x: Set<A>, y: Set<A>) => Set<A>;
/**
 * @since 2.0.0
 */
export declare function partitionMap<L, R>(SL: Eq<L>, SR: Eq<R>): <A>(x: Set<A>, f: (a: A) => Either<L, R>) => Separated<Set<L>, Set<R>>;
/**
 * Form the set difference (`x` - `y`)
 *
 * @example
 * import { difference } from 'fp-ts/lib/Set'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.deepStrictEqual(difference(eqNumber)(new Set([1, 2]), new Set([1, 3])), new Set([2]))
 *
 *
 * @since 2.0.0
 */
export declare function difference<A>(E: Eq<A>): (x: Set<A>, y: Set<A>) => Set<A>;
/**
 * @since 2.0.0
 */
export declare function getUnionMonoid<A>(E: Eq<A>): Monoid<Set<A>>;
/**
 * @since 2.0.0
 */
export declare function getIntersectionSemigroup<A>(E: Eq<A>): Semigroup<Set<A>>;
/**
 * @since 2.0.0
 */
export declare function reduce<A>(O: Ord<A>): <B>(fa: Set<A>, b: B, f: (b: B, a: A) => B) => B;
/**
 * @since 2.0.0
 */
export declare function foldMap<A, M>(O: Ord<A>, M: Monoid<M>): (fa: Set<A>, f: (a: A) => M) => M;
/**
 * Create a set with one element
 *
 * @since 2.0.0
 */
export declare function singleton<A>(a: A): Set<A>;
/**
 * Insert a value into a set
 *
 * @since 2.0.0
 */
export declare function insert<A>(E: Eq<A>): (a: A, x: Set<A>) => Set<A>;
/**
 * Delete a value from a set
 *
 * @since 2.0.0
 */
export declare function remove<A>(E: Eq<A>): (a: A, x: Set<A>) => Set<A>;
/**
 * Create a set from an array
 *
 * @since 2.0.0
 */
export declare function fromArray<A>(E: Eq<A>): (as: Array<A>) => Set<A>;
/**
 * @since 2.0.0
 */
export declare function compact<A>(E: Eq<A>): (fa: Set<Option<A>>) => Set<A>;
/**
 * @since 2.0.0
 */
export declare function separate<L, R>(EL: Eq<L>, ER: Eq<R>): (fa: Set<Either<L, R>>) => Separated<Set<L>, Set<R>>;
/**
 * @since 2.0.0
 */
export declare function filterMap<B>(E: Eq<B>): <A>(fa: Set<A>, f: (a: A) => Option<B>) => Set<B>;