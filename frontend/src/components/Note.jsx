import React,{useState} from "react";

function Note(props) {
  const [expanded, setExpanded] = useState(false);
  const [isEditing,setEditing] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [editTitle,setEditTitle] = useState("");
  const [editContent,setEditContent] = useState("");

  function handleClick() {
    props.onDelete(props.id);
  }

  function handleCopy(){
    navigator.clipboard.writeText(props.content)
    .then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => {
        setCopySuccess(""); // Clear the message after 2 seconds
      }, 1000);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });

  }

  function handleEditTitle(e){
    setEditTitle(e.target.value);

  }
  function handleEditContent(e){
    setEditContent(e.target.value);
  }


  function handleEdit(){
    if (isEditing) {
      props.onEdit(props.id, editTitle, editContent);
    }
    else{
      setEditTitle(props.title);
      setEditContent(props.content);
    }
    setEditing(!isEditing);
  }


  return (
    <div className="note">
     {(isEditing)?(
        <div className="notecontents">
          
        <input
          name="title"
          onChange={handleEditTitle}
          value={editTitle}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleEditContent}
          value={editContent}
          placeholder="Take a note..."
        />
          </div>
        
      ):(
        <div className="notecontent">
      <h1>{props.title}</h1>
      <p  style={{ 
        display: '-webkit-box', 
        '-webkit-line-clamp': expanded ? 'none' : '2', 
        '-webkit-box-orient': 'vertical',
        overflow: expanded ? 'visible' : 'hidden',
      }
     }
      >{props.content}
      
      </p>
      </div>
      )
      }
    <div className="notesbutton">
    {copySuccess && <span style={{ color: "green" }}>{copySuccess}</span>}
    <button onClick={handleClick}>X</button>
     <button onClick={handleEdit}>{(isEditing)?("Save"):("Edit")}</button>
      <button onClick={handleCopy}>Copy</button>
     
       {!expanded && <button onClick={() => setExpanded(true)}>More</button>}
      {expanded && <button onClick={() => setExpanded(false)}>Less</button>}
    </div>
    </div>
  );
}

export default Note;
