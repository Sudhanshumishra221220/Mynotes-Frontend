import React, {useEffect, useState } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 8;

    useEffect(()=>{

      const fetchData = async ()=>{
        const response  = await fetch('https://notes-app-eh26.onrender.com');
         
           const data = await response.json();
           setNotes(data);
          
      };


      fetchData();

    },[notes]);  


    const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
  const paginatePrev = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  
  const paginateNext = () => {
    setCurrentPage((prevPage) => (prevPage * notesPerPage < notes.length ? prevPage + 1 : prevPage));
  };


  const addNote = async (newNote) => {
      
    try {
      
      const response = await fetch('https://notes-app-eh26.onrender.com/create', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(newNote),  
      });

     
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        navigate("/");

      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  }

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`https://notes-app-eh26.onrender.com/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Successfully deleted ${id}`);
        navigate("/");
      } else {
        console.log('Failed to delete the note. ');
      }
    } catch (error) {
      console.error('Error while deleting the note:', error);
    }
  };
  
  const updateNote = async(id, updatedTitle,updatedContent)=>{
   
         console.log(id,updatedTitle,updatedContent);
    try {
      const response = await fetch('https://notes-app-eh26.onrender.com/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,         
          title: updatedTitle,
          content: updatedContent,
        }),
      });
  
      if (response.ok) {
        console.log('Successfully updated the note');
      } else {
        console.log('Failed to update the note');
      }
    } catch (error) {
      console.error('Error while updating the note:', error);
    }
  

  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {currentNotes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={updateNote}
          />
        );
      })}
      <div className="pagination">
        <button onClick={paginatePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={paginateNext} disabled={currentPage * notesPerPage >= notes.length}>
          Next
        </button>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
