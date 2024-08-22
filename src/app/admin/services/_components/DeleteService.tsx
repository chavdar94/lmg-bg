"use client";

import { Trash2Icon } from "lucide-react";
import { deleteService } from "../actions";
import { useState } from "react";

type Props = { id: string };
const DeleteService = ({ id }: Props) => {
  // const [] = useState();
  return (
    <button onClick={() => deleteService(id)}>
      <Trash2Icon className="w-4 h-4 text-red-400" />
    </button>
  );
};
export default DeleteService;
