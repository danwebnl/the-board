import { Dispatch, SetStateAction } from "react";
import { ColumnForm, CardForm } from "components/forms";
import { IColumn, ICard } from "utils/interfaces";

export default function FormsContainer({
  displayForm,
  setDisplayForm,
  columns,
  setColumns,
  cards,
  setCards,
}: {
  displayForm: {
    column: boolean;
    card: boolean;
  };
  setDisplayForm: Dispatch<
    SetStateAction<{
      column: boolean;
      card: boolean;
    }>
  >;
  columns: IColumn[];
  setColumns: Dispatch<SetStateAction<IColumn[]>>;
  cards: ICard[];
  setCards: Dispatch<SetStateAction<ICard[]>>;
}) {
  return (
    <>
      {(displayForm["column"] || displayForm["card"]) && (
        <div className="form-container">
          <div
            className="close"
            onClick={() => {
              setDisplayForm({ column: false, card: false });
            }}
          >
            Close
          </div>
          {displayForm["column"] && (
            <ColumnForm columns={columns} setColumns={setColumns} />
          )}

          {displayForm["card"] && (
            <CardForm cards={cards} setCards={setCards} columns={columns} />
          )}
        </div>
      )}
    </>
  );
}
