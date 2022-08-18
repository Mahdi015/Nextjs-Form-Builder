import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <footer className="flex justify-end fixed inset-x-0 bottom-0">
        <h1 className="group cursor-default tracking-widest text-md font-light text-gray-300 mr-8 mb-2">
          {" "}
          Created by{" "}
          <a
            href="https://mahdiferiani.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="transition-all duration-200 scale-100 ease-in transform grou-hover:scale-105 group-hover:font-bold cursor-pointer "
          >
            Mahdi
          </a>
        </h1>
      </footer>
    </>
  );
}

export default MyApp;
