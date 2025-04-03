import { tenantStore } from "../../tenants/tenant-store";

export const PixResolver = {
  queryPixKey: ({ key }: { key: string }, context: any) => {
    const userId = context?.state?.user?.id;
    if (!userId) throw new Error("Unauthorized");

    const success = simularConsultaPix(key);
    const result = tenantStore.consumeToken(userId, success);

    return result;
  },
};

function simularConsultaPix(key: string): boolean {
  return Math.random() > 0.2;
}
