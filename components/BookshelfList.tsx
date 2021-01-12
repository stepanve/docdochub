import React from "react";
import { BookshelfFormat, BookshelfStateFormat } from "../modules/bookshlef";
import {
  MyBookshelfFormat,
  MyBookshelfStateFormat,
} from "../modules/my-bookshlef";

export type Props = {
  bookshelfs: BookshelfStateFormat | MyBookshelfStateFormat;
};

const BookshelfList = (props: Props) => {
  return (
    <div className="flex flex-wrap mx-auto justify-start">
      {props.bookshelfs.map(
        (bookshelf: BookshelfFormat | MyBookshelfFormat) => {
          return (
            <a
              href={`bookshelfs/${bookshelf.id}`}
              key={bookshelf.id}
              className="mt-3 p-6 max-w-sm mx-3 bg-white rounded-xl shadow-md flex items-center space-x-4"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12"
                  src={bookshelf.photoURL || ``}
                  alt="ChitChat Logo"
                />
              </div>
              <div>
                <div className="text-xl font-medium text-black">
                  {bookshelf.title}
                </div>
                <p className="text-gray-500">{bookshelf.userName} </p>
              </div>
            </a>
          );
        }
      )}
    </div>
  );
};

export default BookshelfList;
