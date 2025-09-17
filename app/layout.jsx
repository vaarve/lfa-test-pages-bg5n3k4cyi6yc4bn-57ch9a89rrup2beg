import "./globals.css";

export const metadata = {
  title: "「助けを求められない子」に出会う仕組み",
  description: "支援は“ある”。でも、そこまでたどり着けない子に出会う仕組みをつくる。ナラティブでやさしく解きほぐす一枚もの。",
  metadataBase: new URL("https://example.com"), // 公開後に正しいURLへ
  openGraph: {
    title: "「助けを求められない子」に出会う仕組み",
    description: "ナラティブで社会課題をやさしく解きほぐす一枚もの。",
    type: "website",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-white text-gray-900">{children}</body>
    </html>
  );
}
