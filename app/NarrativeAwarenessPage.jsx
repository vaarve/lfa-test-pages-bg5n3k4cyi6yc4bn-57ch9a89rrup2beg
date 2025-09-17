'use client';
import React, { useEffect, useMemo, useRef, useState } from "react";

// ▼ 使い方
// 1) 下の content オブジェクトに、あなたのテキストをコピペしてください。
// 2) <CTA> のリンク（署名/寄付/参加）に実際のURLを設定してください。
// 3) デザインはモバイル→PCの順で最適化。アクセシビリティ配慮済み。

const content = {
  siteTitle: "「助けを求められない子」に出会う仕組み",
  hero: {
    kicker: "見えないところに、助けを求められない子がいます。",
    title: "まず、出会うことから始めよう。",
    lead: "支援は“ある”。でも、そこまでたどり着けない子がいる——私たちは、その子に出会える仕組みをつくります。",
  },
  sections: [
    {
      id: "s1",
      label: "はじめに",
      h2: "はじめに",
      body: [
        "見えないところで、助けを必要としている子がいます。家の事情で夜まで起きていたり、学校に行けなくなったり。家族の世話を一人で背負って、心がすりへってしまう子もいます。支援は「ある」のに、そこまでたどり着けていない子がいるのです。"
      ]
    },
    {
      id: "s2",
      label: "届かない理由",
      h2: "どうして届かないの？",
      body: [
        "今の仕組みは「家族が自分で申し込む」ことが前提です。けれど、しんどい時ほど手続きはできません。役所の人も手いっぱいで、家の外まで探しに行くことは難しいのが現実です。しかも、支援がばらばらで、情報がつながりにくい。だから、支援が届かなかったり、途中で切れてしまったりします。"
      ]
    },
    {
      id: "s3",
      label: "私たちがやること",
      h2: "私たちがやること（3つ）",
      body: [
        "1. 会いに行く人をつくる — 待つのではなく、こちらから会いに行きます。困っている家庭と信頼関係をつくり、申請や病院・相談につながるお手伝いを、その場で一緒にします。",
        "2. 支援をまとめてつなぐ — 国が用意した6つの家庭支援を、必要に合わせて“まとめて”利用できるようにします。窓口が違っても、同じチームで話し合い、情報を共有して、必要な支援に迷わず届くようにします。",
        "3. だれでも来られる場所をひらく — 登録いらずの居場所を週4日。おとなのカフェや保護者会も。施設の中で食べ物や学用品を安く買えるようにして、「ついで」に来やすい動線をつくります。面倒な手続きも、その場で一緒にできます。"
      ],
      steps: ["会いに行く人をつくる", "支援をまとめてつなぐ", "だれでも来られる場所をひらく"]
    },
    {
      id: "s4",
      label: "地域から",
      h2: "まずは二つの地域から",
      body: [
        "尼崎と葛飾で、私たちはこのモデルを試します。地域のみなさんとも力を合わせ、方法を磨いて、広げていきます。"
      ]
    },
    {
      id: "s5",
      label: "あなたにお願い",
      h2: "あなたにお願い",
      body: [
        "「助けを求められない子」に、出会える仕組みをつくりたい。応援してくれる人、一緒に動いてくれる人を探しています。"
      ],
      actions: [
        { kind: "sign", title: "参加フォームに記入する", href: "#" },
        { kind: "donate", title: "活動を寄付で支える", href: "#" },
        { kind: "join", title: "仲間に広める（共有）", href: "#" }
      ]
    }
  ],
  footer: {
    note: "このページの文章は提供された原稿に基づきます。引用の際は出典を明記してください。",
  },
};


function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const observer = useRef(null);

  useEffect(() => {
    const options = { root: null, rootMargin: "0px 0px -60% 0px", threshold: 0.1 };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, options);
    observer.current = obs;

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [ids]);

  return active;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? scrolled / height : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function Kicker({ children }) {
  return (
    <p className="text-sm md:text-base tracking-wide uppercase font-semibold text-gray-500">
      {children}
    </p>
  );
}

function H1({ children }) {
  return (
    <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
      {children}
    </h1>
  );
}

function Lead({ children }) {
  return (
    <p className="mt-4 text-base md:text-lg text-gray-700 max-w-3xl">{children}</p>
  );
}

function Shell({ children }) {
  return <div className="mx-auto w-full max-w-5xl px-4 md:px-6">{children}</div>;
}

function Pill({ active, children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs md:text-sm border ${
        active ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300"
      }`}
    >
      {children}
    </span>
  );
}

function CTA({ href = "#", children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold border shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
    >
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-24 py-10 text-sm text-gray-600">
      <Shell>
        <p>{content.footer.note}</p>
      </Shell>
    </footer>
  );
}

export default function NarrativeAwarenessPage() {
  const ids = useMemo(() => content.sections.map((s) => s.id), []);
  const active = useActiveSection(ids);
  const progress = useScrollProgress();

  return (
    <main className="font-sans text-gray-900 bg-white">
      {/* スキップリンク */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white border rounded px-3 py-2">本文へスキップ</a>

      {/* 固定ヘッダー */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <Shell>
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black" aria-hidden />
              <span className="text-sm font-bold tracking-wide">{content.siteTitle}</span>
            </div>
            <nav aria-label="ページ内メニュー" className="hidden md:flex gap-2">
              {content.sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="text-sm">
                  <Pill active={active === s.id}>{s.label}</Pill>
                </a>
              ))}
            </nav>
          </div>
        </Shell>
        {/* 進捗バー */}
        <div className="h-1 w-full bg-gray-200">
          <div className="h-1 bg-black" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      </header>

      {/* ヒーロー */}
      <section aria-labelledby="hero-title" className="pt-16 md:pt-24 pb-16 md:pb-24 bg-gradient-to-b from-neutral-50 to-white">
        <Shell>
          <Kicker>{content.hero.kicker}</Kicker>
          <H1>
            <span id="hero-title">{content.hero.title}</span>
          </H1>
          <Lead>{content.hero.lead}</Lead>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTA href="#s5">今すぐできることを見る</CTA>
            <a href="#s1" className="inline-flex items-center underline text-sm">まずは話を聞く</a>
          </div>
        </Shell>
      </section>

      {/* 本文 */}
      <div id="main">
        {content.sections.map((s, idx) => (
          <article
            id={s.id}
            key={s.id}
            className="scroll-mt-24 border-t first:border-t-0"
            aria-labelledby={`${s.id}-title`}
          >
            <Shell>
              <div className="grid md:grid-cols-12 gap-6 md:gap-8 py-14 md:py-20">
                {/* サイドラベル */}
                <div className="md:col-span-3 order-2 md:order-1">
                  <div className="sticky top-20 md:top-24">
                    <Pill active>{s.label}</Pill>
                  </div>
                </div>

                {/* テキスト本体 */}
                <div className="md:col-span-9 order-1 md:order-2">
                  <h2 id={`${s.id}-title`} className="text-2xl md:text-3xl font-extrabold">
                    {s.h2}
                  </h2>

                  {s.body && (
                    <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed text-gray-800">
                      {s.body.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  )}

                  {(s.fact || s.aside) && (
                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                      {s.fact && (
                        <div className="rounded-2xl border p-4 md:p-6 shadow-sm">
                          <p className="text-sm text-gray-500">FACT</p>
                          <p className="mt-2 text-lg font-semibold">{s.fact}</p>
                        </div>
                      )}
                      {s.aside && (
                        <div className="rounded-2xl border p-4 md:p-6">
                          <p className="text-sm text-gray-500">NOTE</p>
                          <p className="mt-2 text-base md:text-lg">{s.aside}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {Array.isArray(s.steps) && s.steps.length > 0 && (
                    <ol className="mt-6 grid md:grid-cols-3 gap-4">
                      {s.steps.map((step, i) => (
                        <li key={i} className="rounded-2xl border p-5">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border font-bold">
                              {i + 1}
                            </span>
                            <span className="text-sm uppercase tracking-wide text-gray-600">STEP {i + 1}</span>
                          </div>
                          <p className="mt-3 text-base md:text-lg font-semibold">{step}</p>
                        </li>
                      ))}
                    </ol>
                  )}

                  {Array.isArray(s.actions) && s.actions.length > 0 && (
                    <div className="mt-6">
                      <div className="flex flex-wrap gap-3">
                        {s.actions.map((a, i) => (
                          <CTA key={i} href={a.href}>{a.title}</CTA>
                        ))}
                      </div>
                    </div>
                  )}

                  {idx < content.sections.length - 1 && (
                    <div className="mt-10">
                      <a href={`#${content.sections[idx + 1].id}`} className="inline-flex items-center gap-2 text-sm underline">
                        つづきを読む
                        <span aria-hidden>→</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Shell>
          </article>
        ))}
      </div>

      <section className="py-16 md:py-24 bg-neutral-50 border-t">
        <Shell>
          <h2 className="text-2xl md:text-3xl font-extrabold">ここから一緒に。</h2>
          <p className="mt-4 text-base md:text-lg max-w-3xl text-gray-700">
            小さく始めるあなたの一歩が、だれかの“当たり前”を守ります。チームや友人と共有して、輪を広げてください。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CTA href="#s5">今日できることを見る</CTA>
            <a href="#" className="inline-flex items-center underline text-sm">このページを共有する</a>
          </div>
        </Shell>
      </section>

      <Footer />
    </main>
  );
}
