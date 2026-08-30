import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUp, Check, Copy, Sparkles } from "lucide-react";
import {
  ClayCard3D,
  ClayCoin,
  ClayGift,
  ClayHome,
  ClaySpark,
  ClayUsers,
  ClayWallet,
} from "@/components/ClayIcons";
import { ScratchCard } from "@/components/ScratchCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FAP Rewards — Scratch, Refer & Earn Real Cash" },
      {
        name: "description",
        content:
          "Scratch premium reward cards, invite friends and withdraw your earnings to UPI instantly with FAP Rewards.",
      },
      { property: "og:title", content: "FAP Rewards — Scratch, Refer & Earn" },
      {
        property: "og:description",
        content: "Scratch cards, referral bonuses and instant UPI withdrawals in one playful rewards wallet.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Tab = "home" | "refer" | "wallet";
type Txn = { id: number; label: string; when: string; amount: number };

const REFERRAL_LINK = "https://t.me/FAPRewards_OfficialBot?start=jaswanth";

function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [balance, setBalance] = useState(67.88);
  const [pending, setPending] = useState(2);
  const [scratched, setScratched] = useState(1);
  const [copied, setCopied] = useState(false);
  const [upi, setUpi] = useState("");
  const [amount, setAmount] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [txns, setTxns] = useState<Txn[]>([
    { id: 1, label: "Scratch reward", when: "Aug 30, 08:10 AM", amount: 67.88 },
  ]);

  const cards = useMemo(
    () => Array.from({ length: pending }, (_, i) => ({ id: i, amount: 9 + Math.round(Math.random() * 8970) / 100 })),
    [pending],
  );

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleReveal = (value: number) => {
    setBalance((b) => +(b + value).toFixed(2));
    setScratched((s) => s + 1);
    setTxns((t) => [{ id: Date.now(), label: "Scratch reward", when: "Just now", amount: value }, ...t]);
    flash(`You won ₹${value.toFixed(2)}!`);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-32 pt-5">
      <Header balance={balance} />

      <div key={tab} className="mt-5 flex-1 animate-rise space-y-4">
        {tab === "home" && (
          <HomeTab
            balance={balance}
            scratched={scratched}
            cards={cards}
            onReveal={handleReveal}
            onAddCard={() => setPending((p) => p + 1)}
          />
        )}
        {tab === "refer" && (
          <ReferTab
            balance={balance}
            copied={copied}
            onCopy={() => {
              navigator.clipboard?.writeText(REFERRAL_LINK);
              setCopied(true);
              flash("Referral link copied");
              setTimeout(() => setCopied(false), 2000);
            }}
          />
        )}
        {tab === "wallet" && (
          <WalletTab
            balance={balance}
            txns={txns}
            upi={upi}
            amount={amount}
            setUpi={setUpi}
            setAmount={setAmount}
            onWithdraw={() => {
              const v = parseFloat(amount);
              if (!upi.includes("@")) return flash("Enter a valid UPI ID");
              if (!v || v < 50) return flash("Minimum withdrawal is ₹50");
              if (v > balance) return flash("Not enough balance");
              setBalance((b) => +(b - v).toFixed(2));
              setTxns((t) => [
                { id: Date.now(), label: `Withdrawal to ${upi}`, when: "Just now", amount: -v },
                ...t,
              ]);
              setAmount("");
              flash("Withdrawal requested 🎉");
            }}
          />
        )}
      </div>

      {toast && (
        <div className="pointer-events-none fixed inset-x-0 bottom-28 z-50 flex justify-center px-6">
          <div className="clay-sm animate-pop px-5 py-3 text-sm font-semibold text-foreground">{toast}</div>
        </div>
      )}

      <TabBar tab={tab} setTab={setTab} />
    </main>
  );
}

function Header({ balance }: { balance: number }) {
  return (
    <header className="flex items-center gap-3">
      <div className="clay-sm animate-float grid size-14 shrink-0 place-items-center p-2.5">
        <ClaySpark className="size-full" />
      </div>
      <div className="flex-1">
        <h1 className="font-display text-2xl font-extrabold leading-tight">
          FAP <span className="text-gradient">Rewards</span>
        </h1>
        <p className="text-sm text-muted-foreground">Scratch. Refer. Earn.</p>
      </div>
      <div className="clay-sm px-4 py-2 font-display text-sm font-bold text-[var(--mint)]">
        ₹{balance.toFixed(2)}
      </div>
    </header>
  );
}

function BalanceCard({ label, value, sub }: { label: string; value: number; sub: string }) {
  return (
    <section className="clay relative overflow-hidden px-6 py-7 text-center">
      <ClayCoin className="pointer-events-none absolute -right-6 -top-6 size-28 animate-float opacity-70" />
      <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="text-gradient mt-2 font-display text-5xl font-extrabold">₹{value.toFixed(2)}</p>
      <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 px-1 font-display text-lg font-bold">
      <span className="size-3 rounded-md fill-mint" />
      {children}
    </h2>
  );
}

function HomeTab({
  balance,
  scratched,
  cards,
  onReveal,
  onAddCard,
}: {
  balance: number;
  scratched: number;
  cards: { id: number; amount: number }[];
  onReveal: (n: number) => void;
  onAddCard: () => void;
}) {
  return (
    <>
      <BalanceCard label="Available balance" value={balance} sub={`${scratched} card(s) scratched`} />

      <section className="clay space-y-4 px-6 py-6 text-center">
        <div className="mx-auto size-20 animate-float">
          <ClayCard3D className="size-full" />
        </div>
        <h2 className="font-display text-xl font-bold">Scratch cards</h2>
        <p className="text-sm text-muted-foreground">
          You have <strong className="text-foreground">{cards.length}</strong> card(s). Drag across a card to
          scratch it by hand.
        </p>
        <button
          onClick={onAddCard}
          className="clay-press w-full rounded-full fill-primary py-4 font-display text-base font-bold uppercase tracking-wide text-primary-foreground shadow-[0_12px_26px_-10px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
        >
          <Sparkles className="mr-2 inline size-5" />
          Get a card
        </button>
      </section>

      <SectionTitle>Earned cards</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
        {cards.map((c) => (
          <ScratchCard key={c.id} amount={c.amount} onRevealed={onReveal} />
        ))}
        {cards.length === 0 && (
          <p className="col-span-2 py-6 text-center text-sm text-muted-foreground">
            No cards yet — refer a friend to earn one.
          </p>
        )}
      </div>
    </>
  );
}

function ReferTab({ balance, copied, onCopy }: { balance: number; copied: boolean; onCopy: () => void }) {
  const steps = [
    "Share your personal link with friends.",
    "They start the bot and tap Join on all channels.",
    "You instantly earn a free scratch card.",
    "Scratch cards pay ₹9 – ₹98.70, redeemable anytime.",
  ];
  return (
    <>
      <section className="clay relative overflow-hidden px-6 py-6">
        <ClayGift className="pointer-events-none absolute -right-4 -top-3 size-24 animate-float opacity-80" />
        <h2 className="font-display text-2xl font-extrabold">Refer &amp; Earn</h2>
        <p className="mt-2 max-w-[85%] text-sm leading-relaxed text-muted-foreground">
          Invite friends. When they join and qualify, you win a free scratch card worth up to ₹98.70.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <div className="clay-inset flex-1 truncate px-4 py-3 text-sm font-medium text-[var(--mint)]">
            {REFERRAL_LINK}
          </div>
          <button
            onClick={onCopy}
            aria-label="Copy referral link"
            className="clay-sm clay-press grid size-12 shrink-0 place-items-center text-primary"
          >
            {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
          </button>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <Stat label="Earnings today" value={`₹${balance.toFixed(2)}`} />
        <Stat label="Earnings yesterday" value="₹0.00" />
        <Stat label="Referrals" value="1" />
        <Stat label="Qualified" value="1" />
      </div>

      <section className="clay space-y-4 px-6 py-6">
        <h2 className="font-display text-xl font-bold">How it works</h2>
        {steps.map((s, i) => (
          <div key={s} className="flex items-start gap-3">
            <span className="clay-sm grid size-9 shrink-0 place-items-center rounded-full fill-mint font-display text-sm font-bold text-white">
              {i + 1}
            </span>
            <p className="pt-1.5 text-sm leading-snug text-muted-foreground">{s}</p>
          </div>
        ))}
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="clay-sm px-4 py-4">
      <p className="font-display text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-extrabold">{value}</p>
    </div>
  );
}

function WalletTab({
  balance,
  txns,
  upi,
  amount,
  setUpi,
  setAmount,
  onWithdraw,
}: {
  balance: number;
  txns: Txn[];
  upi: string;
  amount: string;
  setUpi: (v: string) => void;
  setAmount: (v: string) => void;
  onWithdraw: () => void;
}) {
  return (
    <>
      <BalanceCard label="Wallet balance" value={balance} sub="Withdraw to your UPI anytime" />

      <section className="clay space-y-4 px-6 py-6">
        <div className="flex items-center gap-3">
          <ClayWallet className="size-11" />
          <h2 className="font-display text-xl font-bold">Withdraw</h2>
        </div>
        <input
          value={upi}
          onChange={(e) => setUpi(e.target.value)}
          placeholder="yourname@upi"
          className="clay-inset w-full px-5 py-4 text-base outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="decimal"
          placeholder="Amount (min ₹50)"
          className="clay-inset w-full px-5 py-4 text-base outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
        />
        <button
          onClick={onWithdraw}
          className="clay-press w-full rounded-full fill-mint py-4 font-display text-base font-bold uppercase tracking-wide text-white shadow-[0_12px_26px_-10px_color-mix(in_oklab,var(--mint)_75%,transparent)]"
        >
          <ArrowUp className="mr-2 inline size-5" />
          Withdraw
        </button>
      </section>

      <SectionTitle>Transactions</SectionTitle>
      <div className="space-y-3">
        {txns.map((t) => (
          <div key={t.id} className="clay-sm flex items-center gap-3 px-4 py-4">
            <span className="clay-inset grid size-11 shrink-0 place-items-center rounded-2xl">
              <ArrowUp
                className={`size-5 ${t.amount > 0 ? "rotate-180 text-[var(--mint)]" : "text-primary"}`}
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-bold">{t.label}</p>
              <p className="text-xs text-muted-foreground">{t.when}</p>
            </div>
            <p
              className={`font-display text-sm font-extrabold ${
                t.amount > 0 ? "text-[var(--mint)]" : "text-primary"
              }`}
            >
              {t.amount > 0 ? "+" : "−"}₹{Math.abs(t.amount).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function TabBar({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const items: { id: Tab; label: string; Icon: (p: { className?: string }) => React.ReactElement }[] = [
    { id: "home", label: "Home", Icon: ClayHome },
    { id: "refer", label: "Refer", Icon: ClayUsers },
    { id: "wallet", label: "Wallet", Icon: ClayWallet },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md px-4 pb-4">
      <div className="clay flex items-center justify-around px-3 py-3 backdrop-blur-xl">
        {items.map(({ id, label, Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`clay-press flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 transition-all duration-300 ${
                active ? "scale-105" : "opacity-60"
              }`}
            >
              <Icon className={`size-8 transition-transform duration-300 ${active ? "-translate-y-0.5" : ""}`} />
              <span
                className={`font-display text-xs font-bold ${active ? "text-primary" : "text-muted-foreground"}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
