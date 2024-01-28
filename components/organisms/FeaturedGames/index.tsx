import { useEffect, useState, useCallback } from "react";
import GameItems from "@/components/molecules/GameItems";
import React from "react";
import { getFeaturedGames } from "@/services/player";
import { GameItemTypes } from "@/services/data-types";

export default function FeaturedGames() {
  const [gameList, setGameList] = useState([]);

  const getFeaturedGame = useCallback(async () => {
    const data = await getFeaturedGames();
    setGameList(data);
  }, [getFeaturedGames]);

  useEffect(() => {
    getFeaturedGame();
  }, []);

  return (
    <section className="featured-game pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          Our Featured
          <br /> Games This Year
        </h2>
        <div
          className="d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4"
          data-aos="fade-up"
        >
          {gameList.map((item: GameItemTypes) => (
            <GameItems
              key={item._id}
              id={item._id}
              title={item.name}
              category={item.category.name}
              thumbnail={`https://bwa-storegg.adaptable.app/uploads/${item.thumbnail}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
