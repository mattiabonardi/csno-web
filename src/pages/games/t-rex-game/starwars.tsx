import { useEffect, useState } from "react";
import TRexGame from "../../../components/games/TRexGame";

const TRexGamePage: React.FC = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return <>{domLoaded && <TRexGame mode="starwars"></TRexGame>}</>;
};

export default TRexGamePage;
