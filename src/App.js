import {useState, useEffect, useRef} from "react";
import Map, { Marker,Popup, NavigationControl} from 'react-map-gl';
import { shoppingCenters, hospitals, parks, transports, schools  } from "./constants/outings";
import hospital from "./constants/data/hospitals_icon.png"
import shop from "./constants/data/shop.png"
import school from "./constants/data/school.png"
import park from "./constants/data/park.png"
import transport from "./constants/data/transport.png"

import health_icon from "./constants/data/hospital_toggle.png"
import school_icon from "./constants/data/school_toggle.png"
import transport_icon from "./constants/data/bus.png"
import park_icon from "./constants/data/bus_toggle.png"
import shop_icon from "./constants/data/shop_toggle.png"
import "./App.css"

function App() {
  const [viewState, setViewState] = useState({
    longitude: -81.20848627355008,
    latitude: 28.64988053614343,
    zoom: 11
  });

  const mapRef = useRef()

  const [selectedShop, setSelectedShop] = useState(null);
  const [currShop, setCurrShop] = useState(null)

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [currSchool, setCurrSchool] = useState(null)

  const [selectedPark, setSelectedPark] = useState(null);
  const [currPark, setCurrPark] = useState(null)

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [currHospital, setCurrHospital] = useState(null)

  const [selectedTransport, setSelectedTransport] = useState(null);
  const [currTransport, setCurrTransport] = useState(null)

  const handleShopClick = (index) =>{
   setSelectedShop(index)
  };
  const handleHospitalClick = (index) =>{
   setSelectedHospital(index)
  };
  const handleSchoolClick = (index) =>{
   setSelectedSchool(index)
  };
  const handleParkClick = (index) =>{
   setSelectedPark(index)
  };
  const handleTransportClick = (index) =>{
   setSelectedTransport(index)
  };

  useEffect(() => {
    
    if (selectedSchool !== null) {
      setCurrSchool(selectedSchool)
    }
    if (selectedShop !== null) {
      setCurrShop(selectedShop)
    }
    if (selectedPark !== null) {
      setCurrPark(selectedPark)
    }
    if (selectedHospital !== null) {
      setCurrHospital(selectedHospital)
    }
    if (selectedTransport !== null) {
      setCurrTransport(selectedTransport)
    }
  }, [selectedShop, selectedHospital, selectedPark, selectedSchool, selectedTransport]);

  const [showShops, setShowShops] = useState(false);
  const [showHospitals, setShowHospitals] = useState(false);
  const [showSchools, setShowSchools] = useState(false);
  const [showParks, setShowParks] = useState(false);
  const [showTransports, setShowTransports] = useState(false);

  const toggleShop = () => {
    setShowShops((prev) => !prev);
    setSelectedShop(null)
  };
  
  const toggleSchool = () => {
    setShowSchools((prev) => !prev);
    setSelectedSchool(null)
  };
  
  const toggleHospital = () => {
    setShowHospitals((prev) => !prev);
    setSelectedHospital(null)
  };
  
  const togglePark = () => {
    setShowParks((prev) => !prev);
    setSelectedPark(null)
  };
  
  const toggleTransport = () => {
    setShowTransports((prev) => !prev);
    setSelectedTransport(null)
  };
  


  return (
    <div className="map-container relative">
      <Map
      {...viewState}
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1IjoiaGl0b3JjbGljayIsImEiOiJjbG11c3BtejIwY3E3MnJvYjR3bHE5bWU5In0.Noal26seh1sIWqI2Pzji7w"
        onMove={event => setViewState(event.viewState)}
        style={{width: "100vw", height: "90vh"}}
        mapStyle="mapbox://styles/hitorclick/clmustfa805lz01p97kbn4uwn"
        onLoad={()=> {
          mapRef.current.flyTo({ center: [-81.20848627355008, 28.64988053614343], zoom: 12, duration:3000 })
        }}
        boxZoom={false}
        scrollZoom={false}
        // cursor=
      >
        {showShops && shoppingCenters.features.map((feature, index)=>(
          <>
          <Marker
          key={index}
          longitude={feature.geometry.coordinates[0]}
          latitude={feature.geometry.coordinates[1]}
          onClick={()=>{
            handleShopClick(() => index)
            console.log("selected marker " + selectedShop, "index " + index)}}
          >
            <div className="iconContainer">
              <img className="icon" src={shop} alt="shop here" />
            </div>
          </Marker>
          {currShop === index && 
            <Popup
              longitude={feature.geometry.coordinates[0]}
              latitude={feature.geometry.coordinates[1]}
              key={feature.properties.name}>
              <div>
                <h2>{feature.properties.name}</h2>
              </div>
            </Popup>
            }
          </>
        ))}
        {showHospitals && hospitals.features.map((feature, index)=>(
          <>
          <Marker
          key={index}
          longitude={feature.geometry.coordinates[0]}
          latitude={feature.geometry.coordinates[1]}
          onClick={()=>{
            handleHospitalClick(() => index)
          }}
          >
            <div className="iconContainer">
              <img className="icon" src={hospital} alt="hospital here" />
            </div>
          </Marker>
          {currHospital === index && 
            <Popup
              longitude={feature.geometry.coordinates[0]}
              latitude={feature.geometry.coordinates[1]}
              key={feature.properties.name}>
              <div>
                <h2>{feature.properties.name}</h2>
              </div>
            </Popup>
            }
          </>
        ))}
        {showSchools && schools.features.map((feature, index)=>(
          <>
          <Marker
          key={index}
          longitude={feature.geometry.coordinates[0]}
          latitude={feature.geometry.coordinates[1]}
          onClick={()=>{
            handleSchoolClick(() => index)
          }}
          >
            <div className="iconContainer">
              <img className="icon" src={school} alt="school here" />
            </div>
          </Marker>
          {currSchool === index && 
            <Popup
              longitude={feature.geometry.coordinates[0]}
              latitude={feature.geometry.coordinates[1]}
              key={index}>
              <div>
                <h2>{feature.properties.name}</h2>
              </div>
            </Popup>
            }
          </>
        ))}
        { showParks && parks.features.map((feature, index)=>(
          <>
          <Marker
          key={index}
          longitude={feature.geometry.coordinates[0]}
          latitude={feature.geometry.coordinates[1]}
          onClick={()=>{
            handleParkClick(() => index)
          }}
          >
            <div className="iconContainer">
              <img className="icon" src={park} alt="school here" />
            </div>
          </Marker>
          {currPark === index && 
            <Popup
              longitude={feature.geometry.coordinates[0]}
              latitude={feature.geometry.coordinates[1]}
              key={feature.properties.name}>
              <div>
                <h2>{feature.properties.name}</h2>
              </div>
            </Popup>
            }
          </>
        ))}
        {showTransports && transports.features.map((feature, index)=>(
          <>
          <Marker
          key={index}
          longitude={feature.geometry.coordinates[0]}
          latitude={feature.geometry.coordinates[1]}
          onClick={()=>{
            handleTransportClick(() => index)
          }}
          >
            <div className="iconContainer">
              <img className="icon" src={transport} alt="school here" />
            </div>
          </Marker>
          {currTransport === index && 
            <Popup
              longitude={feature.geometry.coordinates[0]}
              latitude={feature.geometry.coordinates[1]}
              key={feature.properties.name}>
              <div>
                <h2>{feature.properties.name}</h2>
              </div>
            </Popup>
            }
          </>
        ))}

        <NavigationControl/>
      </Map>

      
      <div className="px-5 py-8 rouded-md  absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-5 items-center">
        <div onClick={toggleShop} title="Shops" className={`${showShops ?  "bg-gray-400 transition-all duration-500":"bg-white"} cursor-pointer w-14 h-14 text-center overflow-hidden rounded-full`}>
          <img className="p-3.5 object-contain w-full" src={shop_icon} alt="toggle shops icon" />
        </div>
        <div onClick={toggleHospital} title="Hospitals" className={`${showHospitals ?  "bg-gray-400 transition-all duration-500":"bg-white"} cursor-pointer w-14 h-14 text-center overflow-hidden rounded-full`}>
          <img className="p-3.5 object-contain w-full" src={health_icon} alt="toggle hospitals icon" />
        </div>
        <div onClick={togglePark} title="Parks" className={`${showParks ?  "bg-gray-400 transition-all duration-500":"bg-white"} cursor-pointer w-14 h-14 text-center overflow-hidden rounded-full`}>
          <img className="p-3 object-contain w-full" src={park_icon} alt="toggle parks icon" />
        </div>
        <div onClick={toggleSchool} title="Schools" className={`${showSchools ?  "bg-gray-400 transition-all duration-500":"bg-white"} cursor-pointer w-14 h-14 text-center overflow-hidden rounded-full`}>
          <img className="p-2.5 object-contain w-full" src={school_icon} alt="toggle school icon" />
        </div>
        <div onClick={toggleTransport} title="Transport" className={`${showTransports ?  "bg-gray-400 transition-all duration-500":"bg-white"} cursor-pointer w-14 h-14 text-center overflow-hidden rounded-full`}>
          <img className="p-2.5 object-contain w-full" src={transport_icon} alt="toggle transport icon" />
        </div>

      </div>


      {/* modal */}
      <article className={`${showHospitals || showParks || showSchools || showTransports || showParks || showShops ? "hidden" : " border-white text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-8 py-5 text-center bg-slate-700 bg-opacity-70" }`}>
            <p className="text-lg">Welcome to</p>
            <h1 className="text-4xl font-semibold">Oviedo, Florida</h1>
      </article>
    </div>
  );
}
export default App;
