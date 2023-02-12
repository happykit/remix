export function Layout(props: { children: React.ReactElement }) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>
        Welcome to{" "}
        <a
          href="https://github.com/happykit/remix"
          target="_blank"
          rel="noopener noreferrer"
        >
          @happykit/remix
        </a>
      </h1>
      {props.children}
      <h2>Check other examples</h2>
      <ul>
        <li>
          <a href="/">main</a>
        </li>
        <li>
          <a href="/with-traits">with traits</a>
        </li>
        <li>
          <a href="/with-user">with user</a>
        </li>
        <li>
          <a href="/with-visitor-key">with visitor-key</a>
        </li>
        <li>
          <a href="/with-everything">with everything</a>
        </li>
      </ul>
    </div>
  );
}
