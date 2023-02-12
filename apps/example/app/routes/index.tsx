import { useLoaderData } from "@remix-run/react";
import { getFlags } from "@happykit/remix";
import { Layout } from "app/layout";

export async function loader() {
  const flagBag = await getFlags<{ textColor: string }>();
  return { flags: flagBag.flags };
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
