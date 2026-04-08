// app/layout.js
import './globals.css';

export const metadata = {
  title: 'LumiCal | Interactive Wall Calendar', // The text in the browser tab
  description: 'A beautiful, interactive wall calendar experience.',
  icons: {
    // This creates an instant calendar icon for your browser tab!
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📅</text></svg>',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}