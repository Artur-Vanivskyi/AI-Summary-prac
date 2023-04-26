import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

function Demo() {
  const initialState = {
    url: "",
    summary: "",
  };
  const [article, setArticle] = useState(initialState);
  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("article")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSumbit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  };

  const handleChange = (e) => {
    setArticle({
      ...article,
      url: e.target.value,
    });
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSumbit}
        >
          <img
            src={linkIcon}
            alt="linkcion"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={handleChange}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↲
          </button>
        </form>


        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {allArticles.map((article, index) => {
                
            })}

        </div>



      </div>
    </section>
  );
}

export default Demo;
