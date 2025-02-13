import './App.css'
import List from './List'

import contactsData from '../preson.json';
import { useDispatch } from "react-redux"
import { insertData } from "../app/contactsSlice"
import { useEffect } from 'react';
// import Panel from './Panel';
function App() {
  let dispatch = useDispatch()
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
      {/* <Panel  /> */}
    </>
  )
}

export default App
