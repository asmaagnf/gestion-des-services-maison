import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import SearchBar from "../SearchBar/SearchBar";
const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            >
              Découvrez <br />
                 Plus approprié
                 <br /> services à domicile
            </motion.h1>
          </div>
          <div className="flexColStart secondaryText flexhero-des">
            <span>Trouvez des professionnels de confiance pour tous vos projets de maison.</span>
            <br />
            <span>Laissez-nous vous mettre en contact avec des professionnels locaux </span>
            <span>proposant des travaux de rénovation domiciliaire dans votre région.</span>
          </div>

          <SearchBar/>

          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={8800} end={9000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Meilleurs services</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={1950} end={2000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Client satisfait</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={100} /> <span>+</span>
              </span>
              <span className="secondaryText">Professionnels</span>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            className="image-container"
          >
            <img src="./hero-image.png" alt="houses" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
