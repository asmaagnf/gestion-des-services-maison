import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { MdLocationPin } from 'react-icons/md';
import { FaRegClock, FaStar } from "react-icons/fa";
import { getService } from '../../utils/api';
import Map from '../../components/Map';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { sliderSettings } from "../../utils/common";
import CustomModal from '../../components/CustomModal/CustomModal'; 
import './ServiceDetail.css';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { toast } from 'react-toastify';
import CommentSection from './CommentSection'; // Adjust the import path as necessary
import StarRating from './StarRating'; // Adjust the import path as necessary

const ServiceDetail = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["serv", id], () => getService(id));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [adresse, setAdresse] = useState('');
  const [taille, setTaille] = useState('petit'); // Default to 'petit'
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  const [canComment, setCanComment] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/comments/service/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const checkDemandeStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const response = await axios.get(`http://localhost:3001/api/demande/client-demandes/${userId}`);
        const userDemandes = response.data.demandes;
        const userServiceDemande = userDemandes.find(demande => demande.ServiceId === parseInt(id));

        if (userServiceDemande && userServiceDemande.status === 'complété') {
          setCanComment(true);
        }
      } catch (error) {
        console.error('Error checking demande status:', error);
      }
    };

    fetchComments();
    checkDemandeStatus();
  }, [id]);

  const handleCreateDemande = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Vous devez être connecté');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const response = await axios.post('http://localhost:3001/api/demande/create-demande', {
        description,
        adresse,
        taille,
        ServiceId: id,
        userId,
      });
      if (response.status === 201) {
        setDescription('');
        setAdresse('');
        setTaille('petit');
        setIsModalOpen(false);
    
         toast.success('Demande envoyée avec succès !');
        }
      } catch (error) {
        console.error('Error creating demande:', error);
        toast.error('Une erreur est survenue. Veuillez réessayer.');
      }
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmitComment = async () => {
   try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Vous devez être connecté');
        return;
      }
      if (!canComment) {
        toast.error("Vous ne pouvez ajouter un commentaire que lorsque la prestation est terminée.");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const response = await axios.post(
        'http://localhost:3001/api/comments/create',
        {
          text: commentText,
          rating,
          ServiceId: id,
          UserId: userId,
        },
      );

      setComments([...comments, response.data]);
      setCommentText('');
      setRating(0);
      toast.success('Comment submitted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to submit comment.');
    }
  };

  const calculateAverageRating = () => {
    if (comments.length === 0) return 0;
    const totalRating = comments.reduce((acc, comment) => acc + comment.rating, 0);
    return (totalRating / comments.length).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the service details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth service-container">
        {/* image */}
        <img src={`http://localhost:3001/${data?.image}`} alt="service image" />
        <div className="flexCenter service-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
            </div>
             {/*Rating */}
        <div className="average-rating">
          <FaStar size={20} color="#FFD700" />
          <span> {calculateAverageRating()} </span>
        </div>
            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>
            {/* yearsofexperience */}
            <div className='flexStart' style={{ gap: "1rem" }}>
              <FaRegClock size={25} />
              <span>{data?.yearsOfExperience} ans d'expérience</span>
            </div>
            {/* address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.location}
              </span>
            </div>

            {/* button de demande */}
            <button className="button" onClick={() => setIsModalOpen(true)}>
              Demander le service
            </button>
          </div>
                
          {/* Create Demande Modal */}
          <CustomModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Créer une Demande"
          >
            <div>
              <label>
              Détails de la tâche :<br/>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description de la demande"
                  rows="4"
                /><br/>
              </label>
              <label>
              Adresse où le service sera effectué :<br/>
                <input
                  type="text"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  placeholder="Adresse"
                /><br/>
              </label>
              <label>
              Quelle est la taille de votre tâche ?<br/>
                <select
                  value={taille}
                  onChange={(e) => setTaille(e.target.value)}
                >
                  <option value="petit">petit</option>
                  <option value="moyen">moyen</option>
                  <option value="grand">grand</option>
                </select><br/>
              </label>
              <button className="button" onClick={handleCreateDemande}>Envoyer</button>
            </div>
          </CustomModal>

          {/* right side */}
          <div className="map">
            <Map address={data?.location} />
          </div>
        </div>
      </div>
      <div className="carousel-container">
        {data?.ServiceImages && (
          <Swiper {...sliderSettings}>
            <SlideNextButton />
            {data.ServiceImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={`http://localhost:3001/${image.imageUrl}`} alt={`Service Image`} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Comments Section */}
      {canComment && (
        <div style={{ marginBottom: '20px' }}>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>
      )}
      <CommentSection
        comments={comments}
        comment={commentText}
        handleCommentChange={handleCommentChange}
        handleSubmitComment={handleSubmitComment}
      />
   
    </div>
  );
};

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};

export default ServiceDetail;