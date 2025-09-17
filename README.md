# Narrative Awareness (Next.js + Tailwind) — GitHub Pages 対応

社会課題をナラティブ（語り）で伝える一枚もの。Next.js（App Router）+ Tailwind。

## セットアップ（ローカル）

```bash
npm install
npm run dev
# http://localhost:3000
```

## あなたのテキストに差し替え
- `app/NarrativeAwarenessPage.jsx` の `content` を編集
- CTAリンク（参加/寄付/共有）の `href` を実URLに変更

## GitHub Pages に公開する
1. このフォルダを GitHub に新規リポジトリとしてプッシュ（例: `yourname/child-support-site`）
2. Actions タブで初回のワークフローを許可
3. `main`（または `master`）に push すると、自動で `gh-pages` ブランチに `out/` が公開されます
4. GitHub のリポジトリ設定 → Pages で **Branch: gh-pages** を選択

> ルートでなく `/REPO` 配下に公開されるため、`next.config.js` が自動的に `basePath` を `/REPO` に設定します（Actions 上の環境変数から検出）。

### 手動デプロイ（Actions 使わない場合）
```bash
npm run export            # out/ に静的書き出し
# gh-pages ブランチに out/ の中身をコミット
```

### ローカルで静的書き出しを確認
```bash
npm run export
npm run preview:static    # http://localhost:4173
```

---

### メタデータ/OG 画像
- `app/layout.jsx` の `metadataBase` を本番URLに変更
- OG画像を `public/og.png` に置くなどして、必要なら `openGraph.images` を設定
