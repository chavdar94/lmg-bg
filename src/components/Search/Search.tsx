import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default async function Search() {
  return (
    <form action="/search" method="GET">
      <div className="flex w-full items-center space-x-2">
        <Input
          name="q"
          type="text"
          placeholder="Търси..."
          className="md:w-[100px] lg:w-[300px]"
        />
        <Button>
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
}
