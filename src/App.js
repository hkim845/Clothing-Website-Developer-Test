import "./App.css";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import Product from "./components/product-page";
import { ShopContextProvider } from "./components/shop-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMinutesDifference } from "./Util";

const url = "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com";
const RATE_LIMIT_MINUTES = 12;

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState("");

  useEffect(() => {
    if (data) {
      localStorage.setItem('data', JSON.stringify(data))
      localStorage.setItem('dataFetchedAt', new Date().toISOString())
    }
  }, [data]);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      
      try{
      let data = JSON.parse(localStorage.getItem('data'));
      const dataFetchedAt = localStorage.getItem('dataFetchedAt');
      const currentTime = new Date().toISOString();
      const minutesElapsed = getMinutesDifference(currentTime, dataFetchedAt);

      if (!data || minutesElapsed > RATE_LIMIT_MINUTES) {
        const response = await fetch(`${url}/live/product`);
        data = await response.json();
      }
      setData(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
    };
    getProduct();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! Something went wrong.</div>;
  }

  return (
    <div className="App">
      <ShopContextProvider>
        <Navbar data={data}/>
        <Product data={data} />
      </ShopContextProvider>
    </div>
  );
}

export default App;
