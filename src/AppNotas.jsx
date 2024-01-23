import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

export const AppNotas = () => {
  const [notes, setNotes] = useState([]);
  const [tile, setTitle] = useState("");
  const [text, setText] = useState("");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const offCanvas = () => {
    setShowOffcanvas(!showOffcanvas);
    setTitle("");
    setText("");
  };

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/notes/");
      setNotes(response.data);
    } catch (error) {
      console.error("Error al obtener las notas:", error);
    }
  };

  const addNote = async () => {
    if (tile.length <= 0 || text <= 0) {
      alert("El título y el texto son requeridos");
      setTitle("");
      setText("");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/notes/", {
        tile,
        text,
      });
      setNotes([...notes, response.data]);
      setTitle("");
      setText("");
    } catch (error) {
      console.error("Error al agregar la nota:", error);
    }
  };

  const onHandleIdEdit = async (id = "") => {
    setId(id);
    setShowOffcanvas(!showOffcanvas);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/notes/${id}`);

      setTitle(response.data.tile);
      setText(response.data.text);
      
    } catch (error) {
      console.error("Error al obtener las notas:", error);
    }
  };
  const onEdit = async() => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/v1/notes/${id}/`, {
        tile,
        text
      });
      fetchNotes()
      setShowOffcanvas(!showOffcanvas);
      setTitle("");
      setText("");
    } catch (error) {
      console.error("Error al editar la nota:", error);
    }
  }

  return (
    <div>
      <div
        className={`offcanvas ${showOffcanvas ? "show" : ""}`}
        data-bs-scroll="true"
        tabindex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Editar la nota
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={offCanvas}
          ></button>
        </div>
        <div class="offcanvas-body">
          <div>
            <div>
              <input
                class="form-control mb-3"
                placeholder="Ingrese el título"
                type="text"
                id="title"
                value={tile}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                class="form-control "
                type="textarea"
                placeholder="Ingresa la descripción"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div class="m-10 text-center">
              <button class="btn btn-primary " onClick={onEdit}>
                Editar Nota
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 class="text-center">Notes Pro App</h1>

      <div class="container text-center">
        <div class="row justify-content-between">
          <div class="col-4">
            <h2>Notas</h2>
            <div class="card" style={{ width: "24rem" }}>
              {notes.map((note) => (
                <ul class="list-group list-group-flush" key={note.id}>
                  <li class="list-group-item">
                    <h5 class="card-title">{note.tile}</h5>
                    <p class="card-text">{note.text}</p>
                    <div class="container text-end">
                      <button
                        type="button"
                        class="btn btn-success justify-content m-2"
                        onClick={(noteId) => onHandleIdEdit(note.id)}
                      >
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={(noteId) => onHandleIdEdit(note.id)}
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasWithBothOptions"
                        aria-controls="offcanvasWithBothOptions"
                      >
                        <i class="bi bi-trash3"></i>
                      </button>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <div class="col-5">
            <h2>Ingresar más notas</h2>
            <div>
              <input
                class="form-control mb-3"
                placeholder="Ingrese el título"
                type="text"
                id="title"
                value={tile}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                class="form-control "
                type="textarea"
                placeholder="Ingresa la descripción"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div class="m-10">
              <button class="btn btn-primary " onClick={addNote}>
                <i className="bi bi-plus"></i>Agregar Nota
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
