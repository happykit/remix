/**
 * Generic Feature Flags
 *
 * Entries consist of the feature flag name as the key and the resolved variant's value as the value.
 */
type Flags = {
    [key: string]: boolean | number | string | null;
};
/**
 * A user to load the flags for. A user must at least have a `key`. See the
 * supported user attributes [here](#supported-user-attributes).
 * The user information you pass can be used for individual targeting or rules.
 */
type FlagUser = {
    key: string;
    email?: string;
    name?: string;
    avatar?: string;
    country?: string;
};
/**
 * Traits
 *
 * An object which you have access to in the flag's rules.
 * You can target users based on traits.
 */
type Traits = {
    [key: string]: any;
};
/**
 * Returns existing visitor key from cookie or generates a new one
 */
declare function generateVisitorKey(request: Request): string;
declare function getFlags<F extends Flags>(options?: {
    visitorKey?: string;
    user?: FlagUser;
    traits?: Traits;
}): Promise<{
    cookie: {
        "Set-Cookie": string;
    } | undefined;
    flags: F;
    visitor: {
        key: string;
    };
}>;

export { generateVisitorKey, getFlags };
