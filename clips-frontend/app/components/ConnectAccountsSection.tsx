"use client";

import SocialAccountCardGrid from "./SocialAccountCardGrid";

export default function ConnectAccountsSection() {
  const handleConnect = (platform: string) => console.log("Connect:", platform);

  return <SocialAccountCardGrid onConnect={handleConnect} />;
}
