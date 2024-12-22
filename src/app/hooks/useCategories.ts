import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "../services/categoriesService";

export function useCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: categoriesService.getAll,
  });

  return {
    categories: data ?? [],
    isLoading,
  };
}
