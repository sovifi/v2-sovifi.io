import { THIRDWEB_CONFIG } from './config';

class RPCManager {
  private currentRpcIndex: number = 0;
  private failedAttempts: Map<string, number> = new Map();
  private lastAttemptTime: Map<string, number> = new Map();
  private rpcs: string[];

  constructor() {
    this.rpcs = THIRDWEB_CONFIG.rpc.fallbackRpcs;
    if (!this.rpcs?.length) {
      this.rpcs = ['https://rpc.sepolia.org']; // Fallback RPC
    }
  }

  getCurrentRpc(): string {
    return this.rpcs[this.currentRpcIndex] || this.rpcs[0];
  }

  markRpcFailed(rpc: string): void {
    const attempts = (this.failedAttempts.get(rpc) || 0) + 1;
    this.failedAttempts.set(rpc, attempts);
    this.lastAttemptTime.set(rpc, Date.now());
    
    if (this.currentRpcIndex < this.rpcs.length - 1) {
      this.currentRpcIndex++;
    } else {
      this.currentRpcIndex = 0;
    }
  }

  shouldRetryRpc(rpc: string): boolean {
    const attempts = this.failedAttempts.get(rpc) || 0;
    const lastAttempt = this.lastAttemptTime.get(rpc) || 0;
    const cooldownPeriod = Math.min(
      THIRDWEB_CONFIG.retryConfig.maxDelay,
      THIRDWEB_CONFIG.retryConfig.initialDelay * Math.pow(2, attempts)
    );

    return Date.now() - lastAttempt >= cooldownPeriod;
  }

  resetRpc(rpc: string): void {
    this.failedAttempts.delete(rpc);
    this.lastAttemptTime.delete(rpc);
  }

  getNextAvailableRpc(): string | null {
    const startIndex = this.currentRpcIndex;
    do {
      const rpc = this.rpcs[this.currentRpcIndex];
      if (this.shouldRetryRpc(rpc)) {
        return rpc;
      }
      this.currentRpcIndex = (this.currentRpcIndex + 1) % this.rpcs.length;
    } while (this.currentRpcIndex !== startIndex);

    return null;
  }
}

export const rpcManager = new RPCManager();