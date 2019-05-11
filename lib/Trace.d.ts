/**
 * @file Adapted from https://github.com/garyb/purescript-debug
 */
import { Applicative1, Applicative2, Applicative2C, Applicative3 } from './Applicative';
import { Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
import { Monad1, Monad2, Monad2C, Monad3 } from './Monad';
import { Lazy } from './function';
/**
 * Log any value to the console for debugging purposes and then return a value. This will log the value's underlying
 * representation for low-level debugging
 *
 * @since 2.0.0
 */
export declare function trace<A>(message: unknown, out: Lazy<A>): A;
/**
 * Log any value and return it
 *
 * @since 2.0.0
 */
export declare function spy<A>(a: A): A;
/**
 * Log a message to the console for debugging purposes and then return the unit value of the Applicative `F`
 *
 * @since 2.0.0
 */
export declare function traceA<F extends URIS3>(F: Applicative3<F>): <U, L>(message: unknown) => Type3<F, U, L, void>;
export declare function traceA<F extends URIS2>(F: Applicative2<F>): <L>(message: unknown) => Type2<F, L, void>;
export declare function traceA<F extends URIS2, L>(F: Applicative2C<F, L>): (message: unknown) => Type2<F, L, void>;
export declare function traceA<F extends URIS>(F: Applicative1<F>): (message: unknown) => Type<F, void>;
/**
 * Log any value to the console and return it in `Monad` useful when one has monadic chains
 *
 * @since 2.0.0
 */
export declare function traceM<F extends URIS3>(F: Monad3<F>): <U, L, A>(a: A) => Type3<F, U, L, A>;
export declare function traceM<F extends URIS2>(F: Monad2<F>): <L, A>(a: A) => Type2<F, L, A>;
export declare function traceM<F extends URIS2, L>(F: Monad2C<F, L>): <A>(a: A) => Type2<F, L, A>;
export declare function traceM<F extends URIS>(F: Monad1<F>): <A>(a: A) => Type<F, A>;
