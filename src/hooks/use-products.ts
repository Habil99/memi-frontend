/**
 * Products Hooks
 *
 * React Query hooks for products
 */

import {
  productsService,
  type CreateProductDto,
  type ProductFilters,
  type UpdateProductDto,
} from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => productsService.getAll(filters),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductDto) => productsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductDto }) =>
      productsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
