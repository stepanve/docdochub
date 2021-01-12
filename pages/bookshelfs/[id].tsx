import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import BookshelfDetail from "../../components/BookshelfDetail";
import YAML from "yaml";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Modal from "../../components/Modal";
import FloatActionButton from "../../components/FloatActionButton";
import axios from "axios";
import { Book } from "../../interfaces";
import { updateMyBookshelf } from "../../modules/my-bookshlef";
import { getBook } from "../../modules/books";

const BooksPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [urlInput, setInputUrl] = useState<string>("");

  const [books, setBooks] = useState<Book[]>([]);

  const bookshelfBooks = useSelector((state: RootState) => state.book);

  const auth = useSelector((state: RootState) => state.auth);

  const { id } = useRouter().query;

  const dispatch = useDispatch();

  const fetchBooks: Function = async (id: string) =>
    dispatch(await getBook(id));

  const patchBooks: Function = async (id: string, content: string) =>
    dispatch(await updateMyBookshelf(id, content));

  useEffect(() => {
    if (id !== undefined) {
      fetchBooks(id);
    }
  }, [id]);

  useEffect(() => {
    if (bookshelfBooks.id) {
      const data = YAML.parse(bookshelfBooks.content!);
      setBooks(data);
    }
  }, [bookshelfBooks]);

  const handlePositiveBtnClick = async () => {
    if (auth.authUser) {
      const newBook = await getBookProduct(urlInput);
      // 初回はnullになる
      const newBooks = books[0] === null ? [newBook] : [...books, newBook];
      const content = YAML.stringify(newBooks);
      patchBooks(id, content);
      setBooks(newBooks);
      setShowModal(false);
    }
  };

  const getBookProduct = async (url: string): Promise<Book> => {
    const { data } = await axios.post(`/api/products`, { url });
    const book: Book = {
      id: data.asin,
      title: data.title,
      url: url,
    };
    return book;
  };

  const handleDeleteClick = async (bookId: string) => {
    if (auth.authUser) {
      const newBooks = books.filter((v) => v.id !== bookId);
      const content = YAML.stringify(newBooks);
      patchBooks(id, content);
      setBooks(newBooks);
      setShowModal(false);
    }
  };

  const isOwner = bookshelfBooks.userId === auth.authUser?.id;

  return (
    <Layout title={bookshelfBooks.title || `本棚`}>
      <h1 className="text-5xl text-center text-gray-700 bg-primary dark:text-gray-100">
        {bookshelfBooks.title || `本棚`}
      </h1>
      {books[0] !== null ? (
        <BookshelfDetail
          books={books}
          handleDeleteClick={handleDeleteClick}
          isOwner={isOwner}
        />
      ) : (
        <p className="text-xl text-center mt-5">
          現在、登録されている本は存在しません。
        </p>
      )}

      {isOwner && (
        <>
          <FloatActionButton onClick={() => setShowModal(true)} />
          <Modal
            title="本を登録する"
            showModal={showModal}
            setShowModal={() => setShowModal(false)}
            handlePositiveBtnClick={handlePositiveBtnClick}
          >
            <div className="relative p-6 flex-auto">
              <form className="text-gray-600 text-lg leading-relaxed w-96">
                <div className="mb-4">
                  <label
                    className="block text-gray-500 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    登録するアマゾンのURL
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    placeholder="URL"
                    type="text"
                    name="title"
                    onChange={(e) => setInputUrl(e.target.value)}
                    value={urlInput}
                  />
                </div>
              </form>
            </div>
          </Modal>
        </>
      )}
    </Layout>
  );
};

export default BooksPage;
