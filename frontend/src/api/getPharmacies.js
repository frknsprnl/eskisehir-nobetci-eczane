import axios from "axios";

export const getPharmacies = async () => {
  const myResponse = axios("https://eskisehirnobetcieczane.herokuapp.com/")
    .then((res) => {
      const data = res.data;
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  return myResponse;
};
