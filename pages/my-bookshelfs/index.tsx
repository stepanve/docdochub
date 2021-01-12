import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookshelfList from "../../components/BookshelfList";
import FloatActionButton from "../../components/FloatActionButton";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import { startLoading, stopLoading } from "../../modules/isLoading";
import { addMyBookshelf, listBookshelf } from "../../modules/my-bookshlef";
import { RootState } from "../../store";

const IndexPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [titleInput, setInputTitle] = useState<string>("");

  const auth = useSelector((state: RootState) => state.auth);

  const bookshlef = useSelector((state: RootState) => state.myBookshelf);

  const dispatch = useDispatch();

  const fetchBookshelf: Function = async (userId: string) =>
    dispatch(await listBookshelf(userId));

  const handlePositiveBtnClick = async () => {
    if (auth.authUser) {
      dispatch(await addMyBookshelf(titleInput, auth.authUser));
      setShowModal(false);
      fetchBookshelf(auth.authUser.id);
    }
  };

  useEffect(() => {
    dispatch(startLoading());
    if (auth.authUser) {
      fetchBookshelf(auth.authUser.id);
    }
    dispatch(stopLoading());
  }, [auth.authUser]);

  return (
    <Layout title="ようこそ、DocDocHubへ">
      <h1 className="text-5xl text-center text-gray-700 bg-primary dark:text-gray-100">
        自分の本棚
      </h1>

      <BookshelfList bookshelfs={bookshlef}></BookshelfList>

      <FloatActionButton onClick={() => setShowModal(true)} />
      <Modal
        title="本棚を作成する"
        showModal={showModal}
        setShowModal={() => setShowModal(false)}
        handlePositiveBtnClick={handlePositiveBtnClick}
      >
        <div className="relative p-6 flex-auto">
          <form
            className="text-gray-600 text-lg leading-relaxed"
            style={{ width: "400px" }}
          >
            <div className="mb-4">
              <label
                className="block text-gray-500 text-sm font-bold mb-2"
                htmlFor="title"
              >
                本棚名
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                placeholder="最近買った本棚"
                type="text"
                name="title"
                onChange={(e) => setInputTitle(e.target.value)}
                value={titleInput}
              />
            </div>
          </form>
        </div>
      </Modal>
    </Layout>
  );
};

export default IndexPage;
