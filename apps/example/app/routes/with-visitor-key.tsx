import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { generateVisitorKey, getFlags } from "@happykit/remix";
import { Layout } from "app/layout";

export async function loader({ request }: LoaderArgs) {
  const flagBag = await getFlags<{ textColor: string }>({
    visitorKey: generateVisitorKey(request),
  });
  return json(
    { flags: flagBag.flags },
    {
      // set the visitorKey header for the next request
      headers: flagBag.cookie,
    }
  );
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <Layout>
      <p style={{ color: loaderData.flags.textColor }}>
        You are seeing {loaderData.flags.textColor}
      </p>
    </Layout>
  );
}
