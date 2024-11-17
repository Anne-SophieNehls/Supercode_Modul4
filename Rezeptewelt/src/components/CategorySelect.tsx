import { supabase } from "../lib/supabase";
import { useQuery } from "@tanstack/react-query";

interface CategorySelectProps {
  onChange: (value: string) => void;
  value: string;
}

export default function CategorySelect({
  onChange,
  value,
}: CategorySelectProps) {
  const categoriesQuery = useQuery({
    queryKey: ["supabase", "categories"],
    queryFn: async () => {
      const result = await supabase.from("categories").select("*");
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });

  if (categoriesQuery.isError || categoriesQuery.isPending) {
    return (
      <select name="" id="">
        Waiting for categories
      </select>
    );
  }

  return (
    <select onChange={(e) => onChange(e.target.value)} value={value}>
      <option key="all" value="*">
        Alle Kategorien
      </option>

      {categoriesQuery.data.map((el) => (
        <option key={el.id} value={el.id}>
          {el.name}
        </option>
      ))}
    </select>
  );
}
