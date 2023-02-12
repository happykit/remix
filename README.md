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


## Disclaimer

Even though this package is currently extremely simple, it is a great starting point for your feature flags.

Feel free to open an issue in case you have additional feature requests.
