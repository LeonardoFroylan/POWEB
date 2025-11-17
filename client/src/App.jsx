import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App(){
  return(
<AuthProvider>
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<h1> Pagina de inicio</h1>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage /> }></Route>
        <Route path="/tasks" element={<h1> Pagina de Tareas</h1>}></Route>
        <Route path="/add-task" element={<h1> Nueva Tarea</h1>}></Route>
        <Route path="/tasks/:id" element={<h1> Actualizar Tarea</h1>}></Route>
    </Routes>
  </BrowserRouter>
</AuthProvider>
  );
}
export default App;