import { Comonad2C } from './Comonad';
import { Monoid } from './Monoid';
import { Functor2 } from './Functor';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Traced: Traced<L, A>;
    }
}
/**
 * @since 2.0.0
 */
export declare const URI = "Traced";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface Traced<P, A> {
    (p: P): A;
}
/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 2.0.0
 */
export declare function tracks<P, A>(M: Monoid<P>, f: (a: A) => P): (wa: Traced<P, A>) => A;
/**
 * Get the current position
 *
 * @since 2.0.0
 */
export declare function listen<P, A>(wa: Traced<P, A>): Traced<P, [A, P]>;
/**
 * Get a value which depends on the current position
 *
 * @since 2.0.0
 */
export declare function listens<P, A, B>(wa: Traced<P, A>, f: (p: P) => B): Traced<P, [A, B]>;
/**
 * Apply a function to the current position
 *
 * @since 2.0.0
 */
export declare function censor<P, A>(wa: Traced<P, A>, f: (p: P) => P): Traced<P, A>;
/**
 * @since 2.0.0
 */
export declare function getComonad<P>(monoid: Monoid<P>): Comonad2C<URI, P>;
/**
 * @since 2.0.0
 */
export declare const traced: Functor2<URI>;
