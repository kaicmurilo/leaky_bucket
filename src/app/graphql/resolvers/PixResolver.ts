import { tenantStore } from "../../tenants/tenant-store";

export const PixResolver = {
  queryPixKey: ({ key }: { key: string }, context: any) => {
    const userId = context?.state?.user?.id;
    if (!userId) throw new Error("Unauthorized");

    const success = Math.random() > 0.2;
    return tenantStore.consumeToken(userId, success);
  },
};
