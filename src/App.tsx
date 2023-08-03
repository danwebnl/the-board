import { useState, useEffect } from "react";
import "App.css";
import { IColumn, ICard } from "utils/interfaces";
import { Button, Card, FormsContainer } from "components";

function App() {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);

  const [displayForm, setDisplayForm] = useState<{
    column: boolean;
    card: boolean;
  }>({ column: false, card: false });

  useEffect(() => {
    if (columns.length === 0 && cards.length === 0) {
      const storedColumns = localStorage.getItem("columns");
      if (storedColumns !== null) {
        setColumns(JSON.parse(storedColumns));
      }

      const storedCards = localStorage.getItem("cards");
      if (storedCards !== null) {
        setCards(JSON.parse(storedCards));
      }
    } else {
      localStorage.setItem("columns", JSON.stringify(columns));
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  }, [columns, cards]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>The Board</h1>
      </header>

      <div className="menu-container">
        <Button
          label="Add New Column"
          primary
          onClick={() => {
            setDisplayForm({ column: true, card: false });
          }}
        />
        <Button
          label="Add New Card"
          primary
          onClick={() => {
            setDisplayForm({ column: false, card: true });
          }}
        />
      </div>

      <FormsContainer
        displayForm={displayForm}
        setDisplayForm={setDisplayForm}
        columns={columns}
        setColumns={setColumns}
        cards={cards}
        setCards={setCards}
      />

      <div className="columns-container">
        {columns.map(({ id: columnId, label }: IColumn) => (
          <div key={`column-${columnId}`} className="column">
            <div>
              <h2>{label}</h2>
              <ul>
                {cards
                  .filter((item) => item.columnId === columnId)
                  .sort((a, b) => a.id - b.id)
                  .map((card) => (
                    <li key={`column-${columnId}-card-${card.id}`}>
                      <Card
                        card={card}
                        columns={columns}
                        cards={cards}
                        setCards={setCards}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {columns.length > 0 && (
        <div className="remove-data-container">
          <Button
            label="Remove All Data"
            small
            onClick={() => {
              setColumns([]);
              setCards([]);
              localStorage.removeItem("columns");
              localStorage.removeItem("cards");
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
