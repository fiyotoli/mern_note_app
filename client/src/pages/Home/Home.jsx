import React, { useEffect, useState } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import emptyStateImage from "../../assets/emptyStateImage.jpg"; // Import your local image

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  useEffect(() => {
    if (currentUser === null || !currentUser) {
      navigate("/login");
    } else {
      setUserInfo(currentUser?.rest);
      getAllNotes();
    }
  }, [currentUser, navigate]);

  // Get all notes
  const getAllNotes = async () => {
    try {
      const res = await axios.get("https://api-note-app.vercel.app/api/note/all", {
        withCredentials: true,
      });

      if (res.data.success === false) {
        console.log(res.data);
        return;
      }

      setAllNotes(res.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const res = await axios.delete(
        "https://api-note-app.vercel.app/api/note/delete/" + noteId,
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
    } catch (error) {
      toast(error.message);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const res = await axios.get("https://api-note-app.vercel.app/api/note/search", {
        params: { query },
        withCredentials: true,
      });

      if (res.data.success === false) {
        console.log(res.data.message);
        toast.error(res.data.message);
        return;
      }

      setIsSearch(true);
      setAllNotes(res.data.notes);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {
      const res = await axios.put(
        "https://api-note-app.vercel.app/api/note/update-note-pinned/" + noteId,
        { isPinned: !noteData.isPinned },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        console.log(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mt-4">
        {allNotes.length > 0 ? (
          <div className="row g-4">
            {allNotes.map((note) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={note._id}>
                <NoteCard
                  title={note.title}
                  date={note.createdAt}
                  content={note.content}
                  tags={note.tags}
                  isPinned={note.isPinned}
                  onEdit={() => handleEdit(note)}
                  onDelete={() => deleteNote(note)}
                  onPinNote={() => updateIsPinned(note)}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={
              isSearch
                ? emptyStateImage // Use the imported image for search
                : emptyStateImage // Use the same or different imported image for no notes
            }
            message={
              isSearch
                ? "Oops! No Notes found matching your search"
                : `Ready to capture your ideas? Click the 'Add' button to start noting down your thoughts, inspiration, and reminders. Let's get started!`
            }
          />
        )}
      </div>

      <button
        className="btn btn-primary rounded-circle text-white position-fixed bottom-0 end-0 m-3"
        style={{ width: "60px", height: "60px" }}
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-white" style={{ fontSize: "32px" }} />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: "2",
          },
          content: {
            borderRadius: "10px",
            padding: "20px",
            maxWidth: "600px",
            margin: "auto",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          },
        }}
        contentLabel=""
      >
        <div className="modal-header"></div>
        <div className="modal-body">
          <AddEditNotes
            onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
            noteData={openAddEditModal.data}
            type={openAddEditModal.type}
            getAllNotes={getAllNotes}
          />
        </div>
      </Modal>
    </>
  );
};

export default Home;
