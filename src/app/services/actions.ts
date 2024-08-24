import db from "@/lib/client";
import { getOrSetCache } from "@/lib/serverUtils";
import { cache } from "react";

export const getCategories = cache(async () => {
  return getOrSetCache("service-categories", async () =>
    db.serviceCategory.findMany()
  );
});

export const getServices = cache(async () => {
  return getOrSetCache("services", async () =>
    db.service.findMany({
      where: {
        isDeleted: false,
      },
    })
  );
});
