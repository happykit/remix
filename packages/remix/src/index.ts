import { nanoid } from "nanoid";
import { parse } from "cookie";

/**
 * Generic Feature Flags
 *
 * Entries consist of the feature flag name as the key and the resolved variant's value as the value.
 */
type Flags = {
  // A flag can resolve to null when a percentage based rollout is set based
  // on a criteria not present on the user, e.g. when bucketing by trait,
  // but no such trait was sent
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
type Traits = { [key: string]: any };

type EvaluationRequestBody = {
  visitorKey: string | null;
  user: FlagUser | null;
  traits: Traits | null;
};

/**
 * Returns existing visitor key from cookie or generates a new one
 */
export function generateVisitorKey(request: Request) {
  return parse(request.headers.get("Cookie") ?? "")?.hkvk || nanoid();
}

export async function getFlags<F extends Flags>(
  options: {
    visitorKey?: string;
    user?: FlagUser;
    traits?: Traits;
  } = {}
) {
  const envKey = process.env.HAPPYKIT_FLAGS_ENV_KEY;

  if (!envKey) {
    throw new Error(
      "@happykit/remix: Missing HAPPYKIT_FLAGS_ENV_KEY environment variable"
    );
  }

  const flagEvaluationRequestBody: EvaluationRequestBody = {
    visitorKey: options.visitorKey || null,
    traits: options.traits || null,
    user: options.user || null,
  };

  const flagBag = await fetch(`https://happykit.dev/api/flags/${envKey}`, {
    method: "POST",
    body: JSON.stringify(flagEvaluationRequestBody),
  }).then<{
    flags: F;
    visitor: { key: string };
  }>((res) => res.json());

  return {
    ...flagBag,
    cookie: flagBag.visitor
      ? {
          "Set-Cookie": `hkvk=${encodeURIComponent(
            flagBag.visitor.key
          )}; Path=/; Max-Age=15552000; SameSite=Lax`,
        }
      : undefined,
  };
}
