import "./globals.css";

function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Notes App</title>
      </head>
      <body className="dark bg-neutral-950 text-neutral-50">{children}</body>
    </html>
  );
}

export default RootLayout;
