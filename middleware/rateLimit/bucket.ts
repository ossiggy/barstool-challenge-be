export class Bucket {
  private maxBurst: number;
  private fillRatePerSecond: number;
  private lastRefreshed: number;
  private tokens: number;

  constructor(maxBurst: number, fillRatePerSecond: number) {
    this.maxBurst = maxBurst;
    this.fillRatePerSecond = fillRatePerSecond;
    this.lastRefreshed = Math.floor(Date.now() / 1000);
    this.tokens = maxBurst;
  }

  public requestToken(): boolean {
    this.refreshTokens();

    if (this.tokens >= 1) {
      this.tokens--;
      console.log("Removed a token, " + this.tokens + " left.");
      return true;
    }

    console.log("Not enough tokens left.");
    return false;
  }

  private refreshTokens(): void {
    const now = Math.floor(Date.now() / 1000);
    const timeSinceLastRefresh = now - this.lastRefreshed;
    const addedTokens = timeSinceLastRefresh * this.fillRatePerSecond;
    this.tokens += addedTokens;
    this.tokens = this.tokens > this.maxBurst ? this.maxBurst : this.tokens;
    this.lastRefreshed = now;
  }
}
