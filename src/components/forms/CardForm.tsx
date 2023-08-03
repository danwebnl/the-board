import { useState, Dispatch, SetStateAction, FormEvent } from "react";
import { Button } from "components";
import { ICard, IColumn } from "utils/interfaces";
import { Category } from "utils/category";

export default function CardForm({
  cards,
  setCards,
  columns,
  card,
  setDisplayAction,
}: {
  cards: ICard[];
  setCards: Dispatch<SetStateAction<ICard[]>>;
  columns: IColumn[];
  card?: ICard;
  setDisplayAction?: Dispatch<
    SetStateAction<{
      edit: boolean;
      move: boolean;
    }>
  >;
}) {
  const [state, setState] = useState<ICard>({
    id: card?.id || 0,
    task: card?.task || "",
    columnId: card?.columnId || 0,
    categories: card?.categories || [],
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    if (event.target.type === "checkbox") {
      const target = event.target as HTMLInputElement;
      if (target.checked) {
        setState({
          ...state,
          categories: [...state.categories, event.target.name],
        });
      } else {
        const categories = state.categories;
        var index = categories.indexOf(event.target.name);
        if (index !== -1) {
          categories.splice(index, 1);
        }
        setState({
          ...state,
          categories: [...categories],
        });
      }
    } else {
      const value =
        event.target.name === "columnId"
          ? Number(event.target.value)
          : event.target.value;
      setState({
        ...state,
        [event.target.name]: value,
      });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { task, columnId } = state;
    if (task === "" || columnId === 0) return;
    const id = card?.id || cards.length + 1;

    if (card) {
      const updatedList = cards.filter((card: ICard) => card.id !== state.id);
      setCards([...updatedList, { ...state }]);
      setDisplayAction && setDisplayAction({ move: false, edit: false });
    } else {
      setCards([...cards, { ...state, id }]);
    }

    // reset form
    setState({
      id: 0,
      task: "",
      columnId: 0,
      categories: [],
    });
  }

  const { task, columnId, categories } = state;

  return (
    <>
      <h2>{card ? "Edit Card" : "Add New Card"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span className="fieldName">Task&#42;:</span>
          <input type="text" name="task" value={task} onChange={handleChange} />
        </label>
        <label>
          <span className="fieldName">Column&#42;:</span>
          {columns.length === 0 ? (
            <div>please add at least one Column first</div>
          ) : (
            <select name="columnId" onChange={handleChange} value={columnId}>
              <option key={0} value={0}></option>
              {columns.map(({ id, label }: IColumn) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          )}
        </label>
        <label>
          <span className="fieldName">Categories:</span>
          <ul>
            {Object.entries(Category).map(([key, value]) => (
              <li key={key}>
                <input
                  type="checkbox"
                  name={key}
                  onChange={handleChange}
                  checked={categories.indexOf(key) !== -1 ? true : false}
                />
                {value}
              </li>
            ))}
          </ul>
        </label>
        <Button type="submit" label="Submit" />
        {card && (
          <Button
            type="button"
            label="Close"
            small
            onClick={() =>
              setDisplayAction && setDisplayAction({ move: false, edit: false })
            }
          />
        )}
        <div className="note">&#42; mandatory fields</div>
      </form>
    </>
  );
}
