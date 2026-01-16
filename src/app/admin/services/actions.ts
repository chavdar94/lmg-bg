"use server";

import db from "@/lib/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getServiceCategories = async () => {
  return await db.serviceCategory.findMany();
};

export type CreateServiceData = {
  title: string;
  price: number;
  categoryId: string;
};

export const createService = async (formData: CreateServiceData) => {
  const price = parseFloat(formData.price as any);
  const price_bgn = price * 1.95583;

  const createdService = await db.service.create({
    data: {
      title: formData.title,
      price: price,
      price_bgn: price_bgn,
      category: {
        connect: {
          id: formData.categoryId,
        },
      },
    },
  });

  revalidatePath("/services");
  redirect("/services");
  // return createdService; // <--- return it
};

export const createServiceCategory = async (formData: FormData) => {
  await db.serviceCategory.create({
    data: {
      title: formData.get("name") as string,
    },
  });
};

export const deleteService = async (id: string) => {
  await db.service.delete({
    where: {
      id,
    },
  });

  revalidatePath("/services");
};

export const deleteServiceCategory = async (id: string) => {
  await db.serviceCategory.delete({
    where: {
      id,
    },
  });
};

export const updateService = async (id: string, formData: FormData) => {
  const price = parseFloat(formData.get("price") as string);
  const priceBgn = price * 1.95583;

  await db.service.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      price: price,
      price_bgn: priceBgn,
      category: {
        connect: { id: formData.get("categoryId") as string },
      },
    },
  });

  revalidatePath("/services");
  redirect("/services");
};

export const updateServiceCategory = async (id: string, formData: FormData) => {
  await db.serviceCategory.update({
    where: {
      id,
    },
    data: {
      title: formData.get("title") as string,
    },
  });
};

export const getService = async (id: string) => {
  return await db.service.findUnique({
    where: {
      id,
    },
    include: {
      category: {
        select: {
          title: true,
        },
      },
    },
  });
};
