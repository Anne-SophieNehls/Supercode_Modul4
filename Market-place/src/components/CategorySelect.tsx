import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";

interface CategorySelectProps {
  onChange: (value: string) => void;
  value: string;
}

export default function CategorySelect({
  onChange,
  value,
}: CategorySelectProps) {
  // Die Komponente holt sich selbststaendig Kategoriedaten aus Supabase
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

  // solange es noch keine Daten gibt, bleibt der Input disabled
  if (categoriesQuery.isError || categoriesQuery.isPending) {
    return (
      <Select disabled>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Alle Kategorien" />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Alle Kategorien" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key="all" value="*">
          Alle Kategorien
        </SelectItem>
        <SelectSeparator />
        {categoriesQuery.data.map((el) => (
          <SelectItem key={el.id} value={el.id}>
            {el.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
