import * as React from "react";
import "./App.css";
import { getPharmacies } from "./api/getPharmacies";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import docSVG from "./assets/doc.gif";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faPhone);
library.add(faLocationDot);

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  (async () => {
    const newData = await getPharmacies();
    setData(newData);
  })();

  useEffect(() => {
    // console.log(data);
    if (data.length !== 0) {
      setisLoading(false);
    }
  }, [data]);

  const formatAddress = (address) => {
    return address
      .split(/ |\.|\,/g)
      .map((element) => {
        return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
      })
      .join(" ");
  };

  return (
    <div className="py-16 md:pb-8 md:pt-6 px-4 md:px-20">
      <header className="pb-6 text-center flex justify-center">
        <h1 className="text-3xl font-bold w-80 py-2 select-none ">
          Eskişehir Nöbetçi Eczaneler
        </h1>
      </header>
      {isLoading ? (
        <div className="loading-wrapper">
          <img src={docSVG} alt="" width={100} className="loading-img" />
          <span>Nöbetçi eczaneler aranıyor...</span>
        </div>
      ) : (
        <div className="">
          <div className="top-3 right-5 absolute">
            <span className="">{`Son güncelleme: ` + data.lastUpdated}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {data.length !== 0 &&
              data.pharmacies.map((index, key) => {
                return (
                  <div
                    className="flex flex-col p-3 w-96 h-64 card cursor-default
                    hover:translate-y-2  hover:[box-shadow:0_0px_0_0_#F8F8FF]
                    hover:border-b-[0px]
                    transition-all duration-500
                    rounded-lg"
                    key={key}
                  >
                    <span className="text-xl font-semibold py-1 text-center">
                      {index.name}
                    </span>
                    <div>
                      <span className="text-white font-semibold">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="pr-3"
                          fixedWidth
                        />
                      </span>

                      <span>{index.phone}</span>
                    </div>
                    <div className="flex py-1 h-52 overflow-y-hidden">
                      <span className="text-white font-semibold">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="pr-3"
                          fixedWidth
                        />
                      </span>
                      <address className="not-italic">
                        {formatAddress(data.pharmacies[key].address)}
                      </address>
                    </div>
                    <div className="mt-1 py-1.5 text-center bg-transparent rounded-full shadow shadow-slate-600">
                      <span className="font-semibold">{index.time + " "}</span>
                      <span className="font-semibold">tarihinde açık.</span>
                    </div>
                    <div className="h-full flex justify-between px-4 md:px-8 py-1 items-center">
                      <a
                        href={`http://maps.google.com/maps?q=${encodeURIComponent(
                          index.address
                        )}`}
                        target="_blank"
                        className="text-center flex justify-center items-center w-32 shadow-md shadow-gray-800 py-2 rounded-full text-white bg-slate-700 hover:bg-gray-800"
                      >
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="pr-3"
                        />
                        Konum
                      </a>

                      <a
                        href={`tel:${index.phone}`}
                        className="text-center flex justify-center items-center w-32 shadow-md shadow-gray-800 py-2 rounded-full text-white bg-slate-700 hover:bg-gray-800"
                      >
                        <FontAwesomeIcon icon={faPhone} className="pr-2" />
                        Telefon et
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
