import './App.css'
import List from './List'
import contactsData from '../preson.json';
import { useDispatch } from "react-redux"
import { insertData } from "../app/contactsSlice"
import { useEffect } from 'react';
function App() {
  let dispatch = useDispatch()
  //מוציאים את התוכן של הג'ייסון ומכניסות לרידקס
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contactsData && contactsData.contacts) {
          let arr = contactsData.contacts;
          dispatch(insertData(arr));
        } else {
          console.warn("contactsData.contacts is undefined or empty");
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <List />
    </>
  )
}

export default App
