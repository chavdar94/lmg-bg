import db from "@/lib/client";
import { cache } from "react";

export const getCategories = cache(async () => {
  return db.serviceCategory.findMany();
});

export const getServices = cache(async () => {
  return db.service.findMany({
    where: {
      isDeleted: false,
    },
  });
});
