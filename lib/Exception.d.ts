/**
 * @file Adapted from https://github.com/purescript/purescript-exceptions
 */
import { Either } from './Either';
import { IO } from './IO';
import { Option } from './Option';
/**
 * Create a JavaScript error, specifying a message
 *
 * @since 2.0.0
 */
export declare const error: (message: string) => Error;
/**
 * Get the error message from a JavaScript error
 *
 * @since 2.0.0
 */
export declare const message: (e: Error) => string;
/**
 * Get the stack trace from a JavaScript error
 *
 * @since 2.0.0
 */
export declare const stack: (e: Error) => Option<string>;
/**
 * Throw an exception
 *
 * @since 2.0.0
 */
export declare const throwError: <A>(e: Error) => IO<A>;
/**
 * Catch an exception by providing an exception handler
 *
 * @since 2.0.0
 */
export declare const catchError: <A>(ma: IO<A>, handler: (e: Error) => IO<A>) => IO<A>;
/**
 * Runs an IO and returns eventual Exceptions as a `Left` value. If the computation succeeds the result gets wrapped in
 * a `Right`.
 *
 * @since 2.0.0
 */
export declare const tryCatch: <A>(ma: IO<A>) => IO<Either<Error, A>>;