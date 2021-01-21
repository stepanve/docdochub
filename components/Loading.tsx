import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import LoadingStyles from "./Loading.module.css";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const Loading = () => {
  const loading = useSelector((state: RootState) => state.loading);

  return (
    <>
      {loading.isLoading && (
        <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
          <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
            <FontAwesomeIcon
              icon={faCircleNotch}
              className={LoadingStyles.spinner}
            />
          </span>
        </div>
      )}
    </>
  );
};

export default Loading;
