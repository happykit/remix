# `@happykit/remix`

Feature Flags for your Remix applications

## Get started

`npm install --save @happykit/remix`

### Example

1. Create a free account on [happykit.dev](https://happykit.dev)
2. Create a project
3. In your project, go to **Keys**
4. Copy the **Development Environment Key**
5. Create a file called `.env` and paste your key there


It should look like this:

```sh
HAPPYKIT_FLAGS_ENV_KEY=flags_pub_356397495635411543
```


You can now load your feature flags in your routes:

```tsx
import { useLoaderData } from "@remix-run/react";
import { getFlags } from "@happykit/remix";

// You can fully type your flags
type AppFlags = {
  textColor: string
}

export async function loader() {
  // this is how you load flags from happykit
  const flagBag = await getFlags<AppFlags>();

  // pass them to your application however you like
  return { flags: flagBag.flags };
}

export default function Index() {
  // you can access your flags on loaderData
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div>
      <p style={{ color: loaderData.flags.textColor }}>
        You are seeing {loaderData.flags.textColor}
      </p>
    </div>
  );
}
```

## Example Application

See `apps/example` for an example application.

Check out the pages in `apps/example/app` like
- `with-traits` which shows how to target users by traits
- `with-user` which shows how to target individual users
- `with-visitor-key` which shows how to target anonymous users
- `with-everything` which shows how to combine it all together

## API Documentation

```ts
import { generateVisitorKey, getFlags } from "@happykit/remix"
```

- `getFlags(options: Options): FlagBag`
  - Arguments
    - `options.visitorKey: string | undefined` A unique id for the current visitor. This can be used to consistently target an anonymous user. Be aware of GDPR regulation when using this feature. You can use `generateVisitorKey(request)` to either return the `visitorKey` present on the request's cookies or to generate a new one.
    - `options.user: User | undefined` A user to load the flags for. A user must at least have a key. `option.user` supports known attriutes only, see [supported user attributes](#supported-user-attributes). The user information you pass can be used for individual targeting or rules. This is usually used for authenticated users your application actually knows about.
    - `options.traits: Record<string, JsonValue> | undefined` An object which you have access to in the flag's rules. Unlike with `options.user` the `options.traits` attribute lets you specify completely custom traits as long as they are JSON.serialize'able. You can then target your audience based on those traits using rules in HappyKit.
  - Return Value
    - `flagBag.flags: Record<string, JsonValue>` The evaluated feature flags, for example `{ textColor: "blue", showSignup: true }`.
    - `flagBag.visitor: { key: string } | undefined` Returns an object containing the visitor key used to evaluate the feature flags. Only returned if `options.visitorKey` was set.
    - `flagBag.cookie: { "Set-Cookie": string } | undefined`: Returns an object you can pass to `Request.headers` to set the the `visitorKey` cookie. Only returned if `options.visitorKey` was set.


- `generateVisitorKey(request: Request): string` If the request contains a header for the `visitorKey` this function returns that `visitorKey`. Otherwise it generates a new `visitorKey` and returns that instead. The cookie for the `visitorKey` is called `hkvk`.



#### Supported user attributes

Provide any of these attributes to store them in HappyKit. You will be able to use them for targeting specific users based on rules later on (_not yet available in HappyKit Flags_).

- `key` _(string)_ _required_: Unique key for this user
- `email` _(string)_: Email-Address
- `name` _(string)_: Full name or nickname
- `avatar` _(string)_: URL to users profile picture
- `country` _(string)_: Two-letter uppercase country-code of user's county, see [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1)


## Disclaimer

Even though this package is currently extremely simple, it is a great starting point for your feature flags.

Feel free to open an issue in case you have additional feature requests.
