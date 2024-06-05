import { Suspense } from "react";
import "./App.css";
import Website from "./pages/Website";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Services from "./pages/Services/Services";
import Becomepro from "./pages/Becomepro/Becomepro";
import Register from "./pages/Register/Register";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceDetail from "./pages/ServiceDetail/ServiceDetail";
import LoginPage from "./pages/login/login";
import ClientInterface from './pages/ClientInterface/ClientInterface'; 
import ProInterface from './pages/ProInterface/ProInterface'; 
import AdminInterface from './pages/AdminInterface/AdminInterface'; 
import Page404 from "./pages/Page404/Page404";
import AddService from './pages/addservice/addservice';
import { jwtDecode } from "jwt-decode";
import Servicesbysubcat from "./pages/Services/Servicesbysubcat";
import Category from "./pages/Category/Category";
import Dashlayout from "./pages/ProInterface/Dashlayout";
import Servicebyuserid from "./pages/Services/Servicebyuserid";
import UpdateService from "./pages/updateservice/Updateservice";
import Reclamations from "../src/components/Reclamations/ReclamationsAdmin"; 
import Listeservices from "../src/pages/Listeservices/Listeservices"
import ClientdachLayout from "./pages/ClientInterface/ClientdachLayout";
import Categorie from "./pages/Categorie/Categorie";
import ClientProfile from "./pages/ClientInterface/ClientProfile";
import ProDemandePage from "./pages/DemandePage/ProDemandePage";
import ClientDemandePage from "./pages/DemandePage/ClientDemandePage";
import AddReclamation from "./components/AddReclamation/AddReclamation";
import MessageContainer from "./components/Messages/MessageContainer";

function App() {
  const queryClient = new QueryClient();
  const ProtectedRoute = ({ element, requiredRole, redirectTo }) => {
    const token = localStorage.getItem('token');
    const userRole = token ? jwtDecode(token).role : null;
  
    if (userRole === requiredRole) {
      return element;
    } else {
      return <Navigate to={redirectTo} replace />;
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
     
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Website/>} />
          <Route path="/services" element={<Category/>} />
          <Route path="/service"  >
             <Route index element={<Services/>} />
             <Route path=":serviceId" element={<ServiceDetail />} />
          </Route>
          <Route path="/register"  element={<Register/>}/>
          <Route path="/pro" element={<Becomepro/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/services/subcategory/:subcategoryId" element={<Servicesbysubcat/>} />
          </Route>
          
          <Route path="/404" element={<Page404 />} />

          
<Route element={<ClientdachLayout/>}>
          <Route
        path="/client-interface"
        element={
          <ProtectedRoute
            element={<ClientInterface />}
            requiredRole="client"
            redirectTo="/404"
          />
        }
      />
      <Route path="/allservices" element={<Category/>} />
          <Route path="/servicecat"  >
             <Route index element={<Services/>} />
             <Route path=":serviceId" element={<ServiceDetail />} />
          </Route>
          <Route path="/allservices/subcategory/:subcategoryId" element={<Servicesbysubcat/>} />
          <Route path="/ClientProfile" element={<ClientProfile/>} />
          <Route path="client-interface/demande" element={<ClientDemandePage/>} />
          <Route path="/client-interface/reclamation" element={<AddReclamation/>} />
        <Route path="client/chat/:chatRoomId"  element={<MessageContainer/>} />

 </Route> 

<Route path="/allservices" element={<Category/>} />

<Route path="/allservices/subcategory/:subcategoryId" element={<Servicesbysubcat/>} />


<Route  element={<Dashlayout/>}>
<Route path="/pro-interface" element={<ProInterface />} />

 <Route
  path="/pro-interface"
  element={
    <ProtectedRoute
      element={<ProInterface />}
      requiredRole="pro"
      redirectTo="/404" 
    />}>
   </Route> 
   <Route path="/pro-interface/Ajouter-Service" element={<AddService />} />
   <Route path="/pro/service/Modifier-Service/:serviceId" element={<UpdateService/>} />
   <Route path="/pro/service"  >
             <Route index element={<Servicebyuserid/>} />
             <Route path=":serviceId" element={<ServiceDetail />} />
                    
   </Route>
   <Route path="/pro-interface/reclamation" element={<AddReclamation/>} />
   <Route path="/pro-interface/Demande"   element={<ProDemandePage/>} />
   <Route path="/pro-interface/Profile" element={<ClientProfile/>} />
   <Route path="pro/chat/:chatRoomId"  element={<MessageContainer/>} />
</Route>


<Route>
  <Route
        path="/admin-interface"
        element={
          <ProtectedRoute
            element={<AdminInterface />}
            requiredRole="admin"
            redirectTo="/404"    
          />
        }
      /> 
<Route
        path="/admin-interface" element={<AdminInterface /> }
      /><Route path="/admin-interface/reclamations" element={<Reclamations/>} />
<Route path="/admin-interface/listeservices" element={<Listeservices/>} />
<Route path="/admin-interface/Categorie" element={<Categorie/>} />

</Route>

          <Route path="*" element={<Navigate to="/404" />} />
  
      </Routes>
    </Suspense>
  </BrowserRouter>
  <ToastContainer />
  <ReactQueryDevtools initialIsOpen={false} />
 
  </QueryClientProvider>
  );
}





export default App;
