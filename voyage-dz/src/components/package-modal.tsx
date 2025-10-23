"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PackageForm, PackageFormValues } from "@/components/package-form";
import { Package } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PackageModalProps {
  children: React.ReactNode;
  initialData?: Package | null;
}

export const PackageModal: React.FC<PackageModalProps> = ({ children, initialData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: PackageFormValues) => {
    setIsLoading(true);
    try {
      const formattedValues = {
        ...values,
        price: parseFloat(values.price),
        imageUrls: values.imageUrls ? values.imageUrls.split(',').map((url: string) => url.trim()) : [],
      };

      const url = initialData
        ? `/api/dashboard/packages/${initialData.id}`
        : "/api/dashboard/packages";
      const method = initialData ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedValues),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      toast.success(initialData ? "Package updated successfully." : "Package created successfully.");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Package" : "Add New Package"}</DialogTitle>
          <DialogDescription>
            {initialData ? "Update the details of your package." : "Fill in the details to create a new package."}
          </DialogDescription>
        </DialogHeader>
        <PackageForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
