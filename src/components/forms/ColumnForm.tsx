import { Dispatch, SetStateAction, useState, FormEvent } from "react";
import { Button } from "components";
import { IColumn } from "utils/interfaces";

export default function AddColumn({
  columns,
  setColumns,
}: {
  columns: IColumn[];
  setColumns: Dispatch<SetStateAction<IColumn[]>>;
}) {
  const [newColumnLabel, setNewColumnLabel] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newColumnLabel === "") return;

    const id = columns.length + 1;
    setColumns([...columns, { id, label: newColumnLabel }]);

    // reset form
    setNewColumnLabel("");
  }
  return (
    <>
      <h2>Add New Column</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="columnLabel"
          value={newColumnLabel}
          onChange={(e) => setNewColumnLabel(e.target.value)}
        />
        <Button type="submit" label="Submit" />
      </form>
    </>
  );
}
