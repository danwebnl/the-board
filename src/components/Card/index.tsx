import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { ICard, IColumn } from "utils/interfaces";
import "./styles.css";
import { categoryColors, Category } from "utils/category";
import { Button } from "components";
import { CardForm } from "components/forms";

export default function Card({
  card,
  columns,
  cards,
  setCards,
}: {
  card: ICard;
  columns: IColumn[];
  cards: ICard[];
  setCards: Dispatch<SetStateAction<ICard[]>>;
}) {
  const { id: cardId, columnId, task, categories } = card;

  const [displayAction, setDisplayAction] = useState<{
    edit: boolean;
    move: boolean;
  }>({
    edit: false,
    move: false,
  });

  const [newColumnId, setNewColumnId] = useState<number>(columnId);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = Number(event.target.value);
    setNewColumnId(value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newColumnId === 0) return;

    const updatedList = cards.filter((card: ICard) => card.id !== cardId);
    setCards([...updatedList, { ...card, columnId: newColumnId }]);
  }

  return (
    <div className="card">
      <div className="task">{task}</div>
      {categories.length > 0 && (
        <ul className="categories-list">
          {categories.map((category: string) => (
            <li
              key={`card-${cardId}-category-${category}`}
              className="category"
              style={{
                backgroundColor: categoryColors[Category[category]],
              }}
            >
              {Category[category]}
            </li>
          ))}
        </ul>
      )}
      <div className="actions-container ">
        <Button
          label="Move Card"
          onClick={() => setDisplayAction({ move: true, edit: false })}
          small
        />
        <Button
          label="Edit Card"
          onClick={() => setDisplayAction({ move: false, edit: true })}
          small
        />
      </div>

      {displayAction["move"] && (
        <form onSubmit={handleSubmit}>
          <select name="columnId" onChange={handleChange} value={newColumnId}>
            <option key={0} value={0}></option>
            {columns.map(({ id, label }: IColumn) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          <Button type="submit" label="Submit" small />
          <Button
            type="button"
            label="Close"
            small
            onClick={() => setDisplayAction({ move: false, edit: false })}
          />
        </form>
      )}

      {displayAction["edit"] && (
        <CardForm
          cards={cards}
          setCards={setCards}
          columns={columns}
          card={card}
          setDisplayAction={setDisplayAction}
        />
      )}
    </div>
  );
}
