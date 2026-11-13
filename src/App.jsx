
import { useState } from "react";
import {
  usePrivy,
  useWallets
} from "@privy-io/react-auth";

const features = [
  { icon: "⇄", name: "Swap", description: "Swap supported cryptocurrencies." },
  { icon: "◈", name: "Buy Crypto", description: "Buy digital assets easily." },
  { icon: "◉", name: "Staking", description: "Stake assets and explore rewards." },
  { icon: "↓", name: "Deposit", description: "Deposit crypto into your account." },
  { icon: "↑", name: "Withdraw", description: "Withdraw assets securely." },
  { icon: "◎", name: "Prediction Market", description: "Explore prediction markets." },
  { icon: "▣", name: "Portfolio", description: "Track your digital assets." },
  { icon: "◷", name: "Transactions", description: "View your transaction history." }
];

export default function App() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();
  const [active, setActive] = useState("Dashboard");
  const [notice, setNotice] = useState("");

  const wallet = wallets?.[0];
  const address = wallet?.address;

  function comingSoon(name) {
    setNotice(name + " is coming soon!");
    setTimeout(() => setNotice(""), 2500);
  }

  async function copyAddress() {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setNotice("Wallet address copied!");
    } catch {
      setNotice("Unable to copy address.");
    }
    setTimeout(() => setNotice(""), 2500);
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">Y</span>
          YALO <span className="purple">DEX</span>
        </div>

        <p className="nav-title">MAIN MENU</p>

        {["Dashboard", "Swap", "Buy Crypto", "Staking"].map(item => (
          <button
            key={item}
            className={"nav-link " + (active === item ? "active" : "")}
            onClick={() => {
              setActive(item);
              if (item !== "Dashboard") comingSoon(item);
            }}
          >
            {item}
          </button>
        ))}

        <p className="nav-title">FINANCE</p>

        {["Deposit", "Withdraw", "Portfolio", "Transactions"].map(item => (
          <button
            key={item}
            className={"nav-link " + (active === item ? "active" : "")}
            onClick={() => {
              setActive(item);
              comingSoon(item);
            }}
          >
            {item}
          </button>
        ))}

        <p className="nav-title">DISCOVER</p>
        <button
          className="nav-link"
          onClick={() => comingSoon("Prediction Market")}
        >
          Prediction Market
        </button>

        <div className="sidebar-bottom">
          <span className="online-dot">● System Online</span>
          <p>YALO DEX Platform</p>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="breadcrumb">
            YALO DEX / <strong>{active}</strong>
          </div>

          {!ready ? (
            <button className="wallet-btn" disabled>
              Loading...
            </button>
          ) : authenticated ? (
            <button className="wallet-btn" onClick={logout}>
              Disconnect
            </button>
          ) : (
            <button className="wallet-btn" onClick={login}>
              Connect Wallet
            </button>
          )}
        </header>

        <section className="content">
          <div className="welcome">
            <div>
              <h1>Welcome to YALO DEX</h1>
              <p>Your gateway to decentralized finance.</p>
            </div>
            <span className="status">● COMING SOON</span>
          </div>

          <section className="announcement">
            <span className="tag">YALO TOKEN</span>
            <h2>YALO Token is Coming Soon!</h2>
            <p>
              The YALO native token is currently in preparation.
              Stay tuned for official announcements.
            </p>
          </section>

          {authenticated && (
            <section className="wallet-panel">
              <span className="tag">YOUR ACCOUNT</span>
              <h2>Wallet Connected</h2>
              <p>{user?.email?.address || "Authenticated user"}</p>
              <div className="address">
                {address
                  ? address.slice(0, 8) + "..." + address.slice(-6)
                  : "Wallet initializing..."}
              </div>
              {address && (
                <button className="secondary-btn" onClick={copyAddress}>
                  Copy Address
                </button>
              )}
            </section>
          )}

          {!authenticated && (
            <section className="hero">
              <span className="tag">THE FUTURE OF DeFi</span>
              <h2>Decentralized Finance.<br />
                <span>Reimagined.</span>
              </h2>
              <p>
                Discover a new way to experience decentralized finance.
                Connect your wallet to get started.
              </p>
              <button className="primary-btn" onClick={login}>
                Get Started →
              </button>
            </section>
          )}

          <div className="section-heading">
            <h2>Explore YALO DEX</h2>
            <span>Services coming soon</span>
          </div>

          <div className="cards">
            {features.map(feature => (
              <div className="card" key={feature.name}>
                <div className="card-icon">{feature.icon}</div>
                <span className="soon">COMING SOON</span>
                <h3>{feature.name}</h3>
                <p>{feature.description}</p>
                <button onClick={() => comingSoon(feature.name)}>
                  Explore
                </button>
              </div>
            ))}
          </div>

          <footer className="footer">
            <strong>© 2026 YALO DEX</strong>
            <a href="mailto:modcrypto@0xyalo.xyz">
              modcrypto@0xyalo.xyz
            </a>
            <span>Built for decentralized finance.</span>
          </footer>
        </section>
      </main>

      {notice && <div className="notice">{notice}</div>}
    </div>
  );
                }
