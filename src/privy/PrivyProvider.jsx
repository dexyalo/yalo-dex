
import { PrivyProvider as Provider } from "@privy-io/react-auth";

const PRIVY_APP_ID = "cmwe424iq004q0gjmcizod4qk";

export function PrivyProvider({ children }) {
  return (
    <Provider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ["email", "wallet"],
        appearance: {
          theme: "dark",
          accentColor: "#8b5cf6",
          logo: undefined,
          showWalletLoginFirst: false
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets"
        }
      }}
    >
      {children}
    </Provider>
  );
}
